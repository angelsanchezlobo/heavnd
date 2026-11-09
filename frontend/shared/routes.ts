/**
 * Páginas públicas de heavnd.com e idiomas con prefijo. Fuente única para el prerender (nuxt.config.ts)
 * y para el sitemap (server/routes/sitemap.xml.ts), así no se desincronizan.
 * Mantener los idiomas en sintonía con LOCALES de app/utils/i18n.ts.
 */
export const SITE = 'https://heavnd.com'
export const PAGES = ['/', '/choosd', '/meald', '/togethrd'] as const
export const SITE_LOCALES = ['es', 'en', 'ca'] as const
/** El español va sin prefijo. */
export const PREFIXED_LOCALES = ['en', 'ca'] as const

export function prefixedPath(path: string, code: (typeof SITE_LOCALES)[number]) {
  if (code === 'es') return path
  return path === '/' ? `/${code}` : `/${code}${path}`
}

/** Todas las URLs públicas: cada página en cada idioma. */
export const ALL_ROUTES = PAGES.flatMap(path => SITE_LOCALES.map(code => prefixedPath(path, code)))
