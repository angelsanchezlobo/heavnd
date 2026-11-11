#!/usr/bin/env bash
# Instala las copias de seguridad en el VPS. Se ejecuta a mano una vez (y de nuevo tras cambiar los
# scripts); no forma parte del despliegue. El temporizador solo se activa si ya existe la configuración.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
[[ $EUID -eq 0 ]] || { echo "Ejecuta como root"; exit 1; }

if ! command -v restic >/dev/null || ! command -v age >/dev/null; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq restic age >/dev/null
fi

install -m 755 "$HERE/heavnd-backup.sh" "$HERE/heavnd-restore.sh" /usr/local/sbin/
install -m 644 "$HERE/heavnd-backup.service" "$HERE/heavnd-backup.timer" /etc/systemd/system/
install -d -o root -g root -m 755 /etc/heavnd
systemctl daemon-reload

if [[ -f /etc/heavnd/backup.env ]]; then
  chmod 600 /etc/heavnd/backup.env
  systemctl enable --now heavnd-backup.timer
  echo "Temporizador activo. Próxima copia:"
  systemctl list-timers heavnd-backup.timer --no-pager | sed -n '2p'
  echo "Para hacer una ahora: systemctl start heavnd-backup.service && journalctl -u heavnd-backup -n 30"
else
  install -m 600 "$HERE/backup.env.example" /etc/heavnd/backup.env.example
  echo "Falta /etc/heavnd/backup.env. Copia /etc/heavnd/backup.env.example, rellénalo y vuelve a ejecutar."
fi
