# Heavnd

Landing de la marca en [heavnd.com](https://heavnd.com): qué es Heavnd y acceso a cada app
([Resolvd](https://resolvd.heavnd.com), [Meald](https://meald.heavnd.com), [Togethrd](https://togethrd.heavnd.com)).

Nuxt 4 + Tailwind 4, prerenderizada con `nuxt generate`. Sin backend: nginx sirve los estáticos.
Tokens de diseño e i18n (es/en/ca) copiados de las apps.

## Desarrollo

```sh
cd frontend
npm install
npm run dev
```

## Añadir una app

Una entrada en `frontend/app/utils/apps.ts` (nombre, URL, acento, glifo del favicon y contenido de su página), su
token de color en `assets/css/main.css`, sus textos en `locales/*.ts` (`apps.<id>`, `product.<id>`, `workshop.<id>` y
los del mock), sus dos pantallas de ejemplo en `AppMocks.vue`, la página `pages/<id>.vue` y la ruta en
`nitro.prerender.routes` de `nuxt.config.ts`.

Precio: con `page.pro: false` la página dice "Gratis. Todo." (`product.pricing`). Con `true` enseña Gratis y Pro:
lo común en `product.freemium` y las filas de cada app en `product.<id>.freemium.free/pro`, en el orden de
`page.freemium`. Las filas de Meald están preparadas pero sin activar.

## Despliegue

Cada push a `main` lanza `.github/workflows/deploy.yml`: typecheck y build, `deploy/setup-vps.sh`
(nginx, vhost para `heavnd.com` y `www`, certificado Let's Encrypt), rsync a `/srv/heavnd/web` y
comprobación por HTTPS contra el origen.

Secrets: `DEPLOY_SSH_KEY`, `VPS_USER`, `VPS_HOST`. En Cloudflare, registros `heavnd.com` y
`www.heavnd.com` apuntando al VPS con proxy.
