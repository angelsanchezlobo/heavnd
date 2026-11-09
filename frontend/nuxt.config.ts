import tailwindcss from '@tailwindcss/vite'
import { ALL_ROUTES, PREFIXED_LOCALES } from './shared/routes'

// A diferencia de las apps, la landing se prerenderiza (ssr + nuxt generate): el HTML ya trae el
// contenido, así que buscadores y vistas previas de enlaces lo leen sin ejecutar JavaScript.
// No hay backend: nginx sirve .output/public tal cual.
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['@fortawesome/fontawesome-svg-core/styles.css', '~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      // Título, descripción, Open Graph y canónica los pone cada página con usePageSeo.
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f6f5f2' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
      // Aplica el tema antes de que se pinte nada, para que no haya destello claro en modo oscuro.
      script: [{
        tagPosition: 'head',
        innerHTML: `try{var t=localStorage.getItem('heavnd-theme');if(t==='DARK'||(t!=='LIGHT'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');document.querySelector('meta[name="theme-color"]').setAttribute('content','#101012')}}catch(e){}`,
      }],
    },
  },
  // Cada página existe en español sin prefijo y en /en y /ca (mismo componente; el idioma lo fija el
  // middleware locale.global según la URL). Mantener los prefijos en sintonía con LOCALES de utils/i18n.ts.
  hooks: {
    'pages:extend'(pages) {
      for (const page of [...pages]) {
        for (const code of PREFIXED_LOCALES) {
          pages.push({ ...page, name: `${page.name}-${code}`, path: `/${code}${page.path === '/' ? '' : page.path}` })
        }
      }
    },
  },
  // Cada app tiene su página; se generan como HTML estático igual que la portada, en los tres idiomas.
  // El sitemap también se prerenderiza (server/routes/sitemap.xml.ts) a partir de la misma lista.
  // concurrency 1: el idioma es estado del módulo (utils/i18n.ts) y dos páginas a la vez se lo pisarían.
  nitro: {
    prerender: {
      concurrency: 1,
      routes: [...ALL_ROUTES, '/sitemap.xml'],
    },
  },
  typescript: {
    strict: true,
  },
})
