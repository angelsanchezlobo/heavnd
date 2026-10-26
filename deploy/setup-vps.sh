#!/usr/bin/env bash
# Preparación del VPS para la landing de Heavnd. La ejecuta el workflow de GitHub Actions en cada
# despliegue, así que es idempotente y rápida cuando ya está todo instalado.
# Solo es estática: nginx + certificado, sin base de datos ni servicio.
#
# Variables opcionales:
#   DEPLOY_USER  usuario con el que GitHub Actions hace rsync (por defecto: root)
#   DOMAIN       por defecto heavnd.com (www.$DOMAIN redirige a él)
set -euo pipefail

DEPLOY_USER="${DEPLOY_USER:-root}"
DOMAIN="${DOMAIN:-heavnd.com}"
HERE="$(cd "$(dirname "$0")" && pwd)"

[[ $EUID -eq 0 ]] || { echo "Ejecuta como root"; exit 1; }

echo "==> Paquetes"
if ! command -v nginx >/dev/null || ! command -v rsync >/dev/null; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq rsync nginx >/dev/null
fi

echo "==> Directorios"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 755 /srv/heavnd /srv/heavnd/web

echo "==> Nginx ($DOMAIN, www.$DOMAIN)"
SITE=/etc/nginx/sites-available/heavnd
LIVE=/etc/letsencrypt/live/$DOMAIN

write_site() {
  sed "s/heavnd\.com/$DOMAIN/g" "$HERE/nginx-heavnd.conf" > "$SITE"
  if [[ -f $LIVE/fullchain.pem ]]; then
    sed -i "s|# __TLS__|listen 443 ssl; listen [::]:443 ssl; ssl_certificate $LIVE/fullchain.pem; ssl_certificate_key $LIVE/privkey.pem;|" "$SITE"
  fi
  ln -sf "$SITE" /etc/nginx/sites-enabled/heavnd
  nginx -t
  systemctl reload nginx
}

# Primero solo HTTP, para que Let's Encrypt pueda validar los dos nombres en el puerto 80.
install -d -m 755 /var/www/letsencrypt
write_site

# Un certificado para heavnd.com y www (Cloudflare en Full strict lo exige en ambos). --cert-name fija
# la ruta en live/$DOMAIN; --expand añade www si el certificado ya existía solo con la raíz.
if command -v certbot >/dev/null; then
  if certbot certonly --webroot -w /var/www/letsencrypt --cert-name "$DOMAIN" -d "$DOMAIN" -d "www.$DOMAIN" \
      --non-interactive --agree-tos --register-unsafely-without-email --keep-until-expiring --expand \
      >/tmp/heavnd-certbot.log 2>&1; then
    echo "    TLS: certificado en $LIVE"
    install -d /etc/letsencrypt/renewal-hooks/deploy
    printf '#!/bin/sh\nsystemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
    chmod 755 /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
  else
    echo "::warning::certbot no ha podido emitir el certificado para $DOMAIN y www.$DOMAIN:"
    tail -n 15 /tmp/heavnd-certbot.log
  fi
else
  echo "::warning::certbot no está instalado; $DOMAIN queda solo en HTTP"
fi
write_site

echo "==> VPS preparado"
