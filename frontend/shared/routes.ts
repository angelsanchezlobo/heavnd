/**
 * Páginas públicas de heavnd.com. Fuente única para el prerender (nuxt.config.ts), el sitemap
 * (server/routes/sitemap.xml.ts), hreflang y el selector de idioma.
 *
 * Cada página tiene su ruta en cada idioma, sin prefijo: el español va tal cual y en/ca llevan /en o /ca
 * delante (prefixedPath). Las páginas de las apps usan la misma ruta en los tres idiomas; las subpáginas
 * (casos de uso, guías, plantillas) llevan el slug traducido. Una página puede no existir en algún idioma.
 *
 * `sources`: ficheros (relativos a frontend/) cuyo último commit da el lastmod del sitemap.
 * Mantener los idiomas en sintonía con LOCALES de app/utils/i18n.ts.
 */
export const SITE = 'https://heavnd.com'
export const SITE_LOCALES = ['es', 'en', 'ca'] as const
export type SiteLocale = (typeof SITE_LOCALES)[number]
/** El español va sin prefijo para conservar las URLs que ya estaban compartidas e indexadas. */
export const PREFIXED_LOCALES = ['en', 'ca'] as const

export interface SitePage {
  id: string
  paths: Partial<Record<SiteLocale, string>>
  sources: string[]
}

const everywhere = (path: string) => ({ es: path, en: path, ca: path })
const APP_SOURCES = ['app/locales', 'app/components', 'app/utils/apps.ts']

export const SITE_PAGES: SitePage[] = [
  { id: 'home', paths: everywhere('/'), sources: ['app/pages/index.vue', ...APP_SOURCES] },
  { id: 'choosd', paths: everywhere('/choosd'), sources: APP_SOURCES },
  { id: 'meald', paths: everywhere('/meald'), sources: APP_SOURCES },
  { id: 'togethrd', paths: everywhere('/togethrd'), sources: APP_SOURCES },
  // Subpáginas: su contenido está en app/content/<id>.ts.
  {
    id: 'choosd-christmas',
    paths: { es: '/choosd/lista-de-regalos-navidad', en: '/choosd/christmas-gift-list', ca: '/choosd/llista-de-regals-de-nadal' },
    sources: ['app/content/choosd-christmas.ts'],
  },
  {
    id: 'meald-weekly-menu',
    paths: { es: '/meald/menu-semanal', en: '/meald/weekly-meal-planner', ca: '/meald/menu-setmanal' },
    sources: ['app/content/meald-weekly-menu.ts'],
  },
  {
    id: 'template-weekly-menu',
    paths: { es: '/plantillas/menu-semanal', en: '/templates/weekly-meal-plan', ca: '/plantilles/menu-setmanal' },
    sources: ['app/content/template-weekly-menu.ts', 'scripts/templates.mjs'],
  },
]

export function prefixedPath(path: string, code: SiteLocale) {
  if (code === 'es') return path
  return path === '/' ? `/${code}` : `/${code}${path}`
}

export function sitePage(id: string): SitePage {
  const page = SITE_PAGES.find(p => p.id === id)
  if (!page) throw new Error(`Página desconocida: ${id}`)
  return page
}

/** Idiomas en los que existe la página, en el orden de SITE_LOCALES. */
export function pageLocales(page: SitePage): SiteLocale[] {
  return SITE_LOCALES.filter(code => page.paths[code] !== undefined)
}

/** URL relativa de la página en un idioma (con prefijo), o undefined si no existe en él. */
export function pagePath(page: SitePage, code: SiteLocale): string | undefined {
  const path = page.paths[code]
  return path === undefined ? undefined : prefixedPath(path, code)
}

/** Página e idioma de una URL relativa ("/en/meald/weekly-meal-planner"), sin barra final. */
export function findPage(path: string): { page: SitePage, locale: SiteLocale } | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path
  for (const page of SITE_PAGES) {
    for (const code of pageLocales(page)) {
      if (pagePath(page, code) === clean) return { page, locale: code }
    }
  }
  return undefined
}

/** Todas las URLs públicas: cada página en cada idioma en que existe. */
export const ALL_ROUTES = SITE_PAGES.flatMap(page => pageLocales(page).map(code => pagePath(page, code)!))
