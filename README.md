# Heavnd

Landing de la marca en [heavnd.com](https://heavnd.com): qué es Heavnd y acceso a cada app
([Choosd](https://choosd.heavnd.com), [Meald](https://meald.heavnd.com), [Togethrd](https://togethrd.heavnd.com),
[Simplfd](https://simplfd.heavnd.com)).

Nuxt 4 + Tailwind 4, prerenderizada con `nuxt generate`. Sin backend: nginx sirve los estáticos.
Tokens de diseño e i18n (es/en/ca) copiados de las apps.

## Desarrollo

```sh
cd frontend
npm install
npm run dev
```

## Añadir una app

Una entrada en `frontend/app/utils/apps.ts` (nombre, URL, acento, glifo y colores del favicon y contenido de su
página), su token de color en `assets/css/main.css` (con su `on-*` y su versión para oscuro si el acento es oscuro), sus textos en `locales/*.ts` (`apps.<id>`, `product.<id>`, `workshop.<id>` y
los del mock), sus dos pantallas de ejemplo en `AppMocks.vue`, la página `pages/<id>.vue` y la ruta en
`SITE_PAGES` de `shared/routes.ts` (de ahí salen el prerender y el sitemap), su categoría en `CATEGORIES` de
`composables/usePageSeo.ts` y su imagen Open Graph con `scripts/og-images.mjs`.

Precio: con `page.pro: false` la página dice "Gratis. Todo." (`product.pricing`). Con `true` enseña Gratis y Pro:
lo común en `product.freemium` y las filas de cada app en `product.<id>.freemium.free/pro`, en el orden de
`page.freemium`. Las filas de Meald están preparadas pero sin activar.

## Subpáginas (casos de uso, guías, plantillas)

Una por fichero en `frontend/app/content/<id>.ts` con el texto de es/en/ca (tipo en `content/types.ts`), registrada
en `utils/subpages.ts` y con su ruta en cada idioma (slug traducido) en `SITE_PAGES` de `shared/routes.ts`, con el
mismo id. La pinta `components/SubPage.vue` desde la ruta comodín `pages/[...slug].vue`; la página de su app la enlaza
sola. Las plantillas en PDF se generan con `node scripts/templates.mjs` en `public/descargas/`.

## SEO

Todo va en el HTML prerenderizado. Cada página llama a `usePageSeo` (o `useAppPageSeo` en las de cada app): título,
descripción, `robots`, Open Graph y Twitter, canónica, `hreflang` de los tres idiomas y un único `@graph` de schema.org
(Organization con logo, WebSite, WebPage y, en las apps, WebApplication, BreadcrumbList y FAQPage con las preguntas de
la página). El sitemap se genera en el build (`server/routes/sitemap.xml.ts`). nginx deja una sola URL por página
(sin barra final ni `index.html`) y la 404 (`error.vue`) es `noindex` y enlaza a las apps.

Markdown for Agents: `npm run build` termina con `scripts/markdown.mjs`, que escribe un `index.md` junto a cada
`index.html` (solo `<main>`, con frontmatter y el JSON-LD al final). nginx lo sirve en la misma URL a las peticiones con
`Accept: text/markdown`, con `Vary: Accept`; sin esa cabecera, el HTML.

Las apps (`*.heavnd.com`) son SPAs privadas y van con `noindex`: lo que se posiciona son estas páginas.

## Contacto y security.txt

Buzones visibles en el pie de todas las páginas: `contact@heavnd.com` (general), `privacy@heavnd.com` (datos
personales y derechos RGPD) y `security@heavnd.com` (avisos de seguridad). Cada página de app tiene además la
pregunta «¿Cómo contacto con vosotros?» (con `contact@` y el alias de la app) y la de datos remite a `privacy@`.

`/.well-known/security.txt` (RFC 9116) se genera en el build (`server/routes/.well-known/security.txt.ts`) con
`Contact`, `Preferred-Languages`, `Canonical` y un `Expires` a 364 días del build: cada despliegue lo renueva. Si
pasa casi un año sin desplegar, hay que relanzar el workflow para que no caduque.

Formulario de contacto en `/contacto` (`/en/contact`, `/ca/contacte`; `app/components/ContactPage.vue`). La web
sigue siendo estática: nginx pasa `POST /api/contact` a la API de Meald (`127.0.0.1:4324`), que manda el mensaje
por Brevo al buzón del tema elegido con Reply-To a quien escribe. `?topic=choosd` (o cualquier tema) lo deja
elegido. Límites, campo trampa y variables: README de meald-app, «Formulario de contacto de heavnd.com». En
desarrollo, `npm run dev` lo pasa a `http://localhost:8080` (Meald en local, con
`CONTACT_ORIGINS=http://localhost:3000`).

Todavía no hay política de privacidad ni aviso legal publicados; `legal@heavnd.com` y `billing@heavnd.com` no se
enseñan en ningún sitio.

## Despliegue

Cada push a `main` lanza `.github/workflows/deploy.yml`: typecheck y build, `deploy/setup-vps.sh`
(nginx, vhost para `heavnd.com` y `www`, certificado Let's Encrypt), rsync a `/srv/heavnd/web` y
comprobación por HTTPS contra el origen.

Secrets: `DEPLOY_SSH_KEY`, `VPS_USER`, `VPS_HOST`. En Cloudflare, registros `heavnd.com` y
`www.heavnd.com` apuntando al VPS con proxy.

Copias de seguridad de las bases de datos y las fotos de las cuatro apps: [`deploy/backup`](deploy/backup/README.md). Se instalan a mano en el VPS; no forman parte del despliegue.
