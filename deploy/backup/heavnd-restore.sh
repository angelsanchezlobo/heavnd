#!/usr/bin/env bash
# Restaura una copia hecha con heavnd-backup.sh. Pensado para ejecutarse en una máquina de prueba o en
# un VPS nuevo; en el de producción nunca pisa nada sin que se le pida con --replace.
#
#   heavnd-restore.sh list                         copias disponibles
#   heavnd-restore.sh db <base> [--snapshot ID] [--replace]
#        Restaura el volcado en la base "<base>_restore" (se crea; si existe, se borra antes).
#        Con --replace restaura sobre "<base>" directamente: PARA la app antes y úsalo solo en un
#        desastre. Necesita la clave privada age: AGE_IDENTITY=/ruta/a/clave.txt
#   heavnd-restore.sh uploads <destino> [--snapshot ID]
#        Deja las carpetas de fotos bajo <destino> (p. ej. /tmp/fotos); a / las devuelve a su sitio.
#
# Configuración: la misma /etc/heavnd/backup.env.
set -euo pipefail
umask 077

CONFIG="${HEAVND_BACKUP_CONFIG:-/etc/heavnd/backup.env}"
[[ -r $CONFIG ]] || { echo "Falta $CONFIG" >&2; exit 1; }
set -a
# shellcheck disable=SC1090
. "$CONFIG"
set +a
STAGING="${STAGING:-/var/backups/heavnd}"
PG_SUPERUSER="${PG_SUPERUSER:-postgres}"

as_postgres() {
  if [[ $(id -un) == "$PG_SUPERUSER" ]]; then "$@"; else runuser -u "$PG_SUPERUSER" -- "$@"; fi
}

cmd="${1:-}"; shift || true
snapshot=latest
replace=0
args=()
while [[ $# -gt 0 ]]; do
  case $1 in
    --snapshot) snapshot="$2"; shift 2 ;;
    --replace) replace=1; shift ;;
    *) args+=("$1"); shift ;;
  esac
done

case $cmd in
  list)
    restic snapshots --host heavnd
    ;;

  db)
    db="${args[0]:?Indica la base de datos (resolvd, meald, togethrd, simplfd)}"
    [[ $db =~ ^[a-z_][a-z0-9_]*$ ]] || { echo "Nombre de base de datos no válido" >&2; exit 1; }
    : "${AGE_IDENTITY:?AGE_IDENTITY sin definir: ruta a la clave privada age}"
    [[ -r $AGE_IDENTITY ]] || { echo "No se puede leer $AGE_IDENTITY" >&2; exit 1; }
    work="$(mktemp -d)"
    trap 'rm -rf "$work"' EXIT
    restic restore "$snapshot" --host heavnd --target "$work" --include "$STAGING/db/$db.dump.age" >/dev/null
    file="$work$STAGING/db/$db.dump.age"
    [[ -s $file ]] || { echo "La copia '$snapshot' no contiene $db" >&2; exit 1; }
    age -d -i "$AGE_IDENTITY" -o "$work/$db.dump" "$file"
    chmod 755 "$work"; chmod 644 "$work/$db.dump"

    if [[ $replace -eq 1 ]]; then
      target="$db"
      echo "==> Restaurando SOBRE '$target' (se sustituye su contenido)"
      as_postgres pg_restore --clean --if-exists --no-owner --role="$db" --exit-on-error \
        --single-transaction -d "$target" "$work/$db.dump"
    else
      target="${db}_restore"
      echo "==> Restaurando en '$target'"
      as_postgres dropdb --if-exists "$target"
      owner="$(as_postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$db'")"
      if [[ $owner == 1 ]]; then
        as_postgres createdb -O "$db" "$target"
        as_postgres pg_restore --no-owner --role="$db" --exit-on-error -d "$target" "$work/$db.dump"
      else
        as_postgres createdb "$target"
        as_postgres pg_restore --no-owner --exit-on-error -d "$target" "$work/$db.dump"
      fi
    fi
    echo "==> Comprobación"
    as_postgres psql -d "$target" -tAc \
      "SELECT 'tablas: ' || count(*) FROM information_schema.tables WHERE table_schema = 'public'"
    as_postgres psql -d "$target" -tAc \
      "SELECT 'última migración: ' || version FROM flyway_schema_history ORDER BY installed_rank DESC LIMIT 1" \
      2>/dev/null || true
    ;;

  uploads)
    dest="${args[0]:?Indica el directorio de destino}"
    # "latest" tiene que ser la última copia completa: las db-only de antes de desplegar no llevan fotos.
    restic restore "$snapshot" --host heavnd --tag full --target "$dest" --exclude "$STAGING"
    echo "==> Fotos restauradas bajo $dest"
    ;;

  *)
    sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'
    exit 1
    ;;
esac
