#!/usr/bin/env bash
# Copia diaria de las bases de datos y de las fotos de las apps de Heavnd.
#
#   1. pg_dump -Fc de cada base de datos, cifrado con age para una clave pública. La clave privada NO
#      está en el VPS: quien entre en el servidor no puede leer las copias de las bases de datos.
#   2. restic sube los volcados cifrados y las carpetas de fotos a un repositorio fuera del VPS
#      (Backblaze B2, S3, Storage Box por SFTP…) y aplica la retención.
#
# Configuración en /etc/heavnd/backup.env (ver backup.env.example). Lo lanza heavnd-backup.timer.
# Uso manual:  sudo heavnd-backup.sh            copia completa
#              sudo heavnd-backup.sh --db-only   solo volcados (antes de un despliegue con migración)
set -euo pipefail
umask 077

CONFIG="${HEAVND_BACKUP_CONFIG:-/etc/heavnd/backup.env}"
[[ -r $CONFIG ]] || { echo "Falta $CONFIG (copia backup.env.example y rellénalo)" >&2; exit 1; }
set -a
# shellcheck disable=SC1090
. "$CONFIG"
set +a

: "${AGE_RECIPIENT:?AGE_RECIPIENT sin definir: la clave pública age (age1…)}"
: "${RESTIC_REPOSITORY:?RESTIC_REPOSITORY sin definir}"
: "${RESTIC_PASSWORD_FILE:?RESTIC_PASSWORD_FILE sin definir}"
DATABASES="${DATABASES:-resolvd meald togethrd simplfd}"
UPLOAD_DIRS="${UPLOAD_DIRS:-/var/lib/resolvd/uploads /var/lib/togethrd/uploads}"
STAGING="${STAGING:-/var/backups/heavnd}"
PG_SUPERUSER="${PG_SUPERUSER:-postgres}"
KEEP_DAILY="${KEEP_DAILY:-7}"
KEEP_WEEKLY="${KEEP_WEEKLY:-4}"
KEEP_MONTHLY="${KEEP_MONTHLY:-6}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-}"

DB_ONLY=0
[[ ${1:-} == --db-only ]] && DB_ONLY=1

ping() {
  [[ -n $HEALTHCHECK_URL ]] || return 0
  curl -fsS -m 10 --retry 3 -o /dev/null "$HEALTHCHECK_URL$1" || true
}
fail() {
  echo "::error::Copia de seguridad fallida en la línea $1" >&2
  ping /fail
}
trap 'fail $LINENO' ERR

as_postgres() {
  if [[ $(id -un) == "$PG_SUPERUSER" ]]; then "$@"; else runuser -u "$PG_SUPERUSER" -- "$@"; fi
}

ping /start
install -d -m 700 "$STAGING/db"

echo "==> Volcados"
# Los de la ejecución anterior se sustituyen: el histórico vive en restic, no en el disco del VPS.
rm -f "$STAGING"/db/*.dump.age "$STAGING"/db/*.tmp
for db in $DATABASES; do
  out="$STAGING/db/$db.dump.age"
  # pipefail: si pg_dump falla, falla la copia entera en lugar de subir un volcado a medias.
  as_postgres pg_dump --format=custom --no-owner --no-acl "$db" | age -r "$AGE_RECIPIENT" -o "$out.tmp"
  mv "$out.tmp" "$out"
  echo "    $db: $(du -h "$out" | cut -f1)"
done

if ! restic cat config >/dev/null 2>&1; then
  echo "==> Repositorio nuevo"
  restic init
fi

echo "==> Subida"
paths=("$STAGING/db")
if [[ $DB_ONLY -eq 0 ]]; then
  for dir in $UPLOAD_DIRS; do
    [[ -d $dir ]] && paths+=("$dir") || echo "    (no existe $dir, se omite)"
  done
fi
tag=full
[[ $DB_ONLY -eq 1 ]] && tag=db-only
restic backup --quiet --tag "$tag" --host heavnd "${paths[@]}"

if [[ $DB_ONLY -eq 0 ]]; then
  echo "==> Retención ($KEEP_DAILY diarias, $KEEP_WEEKLY semanales, $KEEP_MONTHLY mensuales)"
  restic forget --quiet --host heavnd --tag full --prune \
    --keep-daily "$KEEP_DAILY" --keep-weekly "$KEEP_WEEKLY" --keep-monthly "$KEEP_MONTHLY"
  # Las copias sueltas de antes de desplegar: basta con las últimas.
  restic forget --quiet --host heavnd --tag db-only --prune --keep-last 5
fi

echo "==> Hecho"
ping ""
