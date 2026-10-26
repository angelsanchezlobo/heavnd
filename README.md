# Heavnd

Landing de la marca en [heavnd.com](https://heavnd.com): qué es Heavnd y acceso a cada app
([Resolvd](https://resolvd.heavnd.com), [Meald](https://meald.heavnd.com)).

Nuxt 4 + Tailwind 4, prerenderizada con `nuxt generate`. Sin backend: nginx sirve los estáticos.
Tokens de diseño e i18n (es/en/ca) copiados de las apps.

## Desarrollo

```sh
cd frontend
npm install
npm run dev
```

## Añadir una app

Una entrada en `frontend/app/utils/apps.ts` (nombre, URL, acento y glifo del favicon), su token de color
en `assets/css/main.css` y sus textos en `locales/*.ts` bajo `apps.<id>`.

## Despliegue

Cada push a `main` lanza `.github/workflows/deploy.yml`: typecheck y build, `deploy/setup-vps.sh`
(nginx, vhost para `heavnd.com` y `www`, certificado Let's Encrypt), rsync a `/srv/heavnd/web` y
comprobación por HTTPS contra el origen.

Secrets: `DEPLOY_SSH_KEY`, `VPS_USER`, `VPS_HOST`. En Cloudflare, registros `heavnd.com` y
`www.heavnd.com` apuntando al VPS con proxy.
