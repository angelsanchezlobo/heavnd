import tailwindcss from '@tailwindcss/vite'

// A diferencia de las apps, la landing se prerenderiza (ssr + nuxt generate): el HTML ya trae el
// contenido, así que buscadores y vistas previas de enlaces lo leen sin ejecutar JavaScript.
// No hay backend: nginx sirve .output/public tal cual.
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Heavnd — Apps pequeñas para decisiones de cada día',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Heavnd reúne aplicaciones web que hacen una cosa y la hacen bien: Resolvd para decidir qué comprar y Meald para planificar qué comer.' },
        { name: 'theme-color', content: '#f6f5f2' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Heavnd' },
        { property: 'og:title', content: 'Heavnd' },
        { property: 'og:description', content: 'Apps pequeñas para decisiones de cada día. Qué comprar. Qué comer.' },
        { property: 'og:url', content: 'https://heavnd.com/' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      // Aplica el tema antes de que se pinte nada, para que no haya destello claro en modo oscuro.
      script: [{
        tagPosition: 'head',
        innerHTML: `try{var t=localStorage.getItem('heavnd-theme');if(t==='DARK'||(t!=='LIGHT'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');document.querySelector('meta[name="theme-color"]').setAttribute('content','#101012')}}catch(e){}`,
      }],
    },
  },
  // Cada app tiene su página; se generan como HTML estático igual que la portada.
  nitro: {
    prerender: { routes: ['/', '/resolvd', '/meald', '/togethrd'] },
  },
  typescript: {
    strict: true,
  },
})
