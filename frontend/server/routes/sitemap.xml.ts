import { execFileSync } from 'node:child_process'
import { SITE, pageLocales, pagePath, SITE_PAGES, type SitePage } from '../../shared/routes'

/**
 * Fecha (YYYY-MM-DD) del último commit que tocó los ficheros de la página. Es lo que Google quiere en
 * lastmod: cuándo cambió el contenido, no cuándo se hizo el build. Sin git o sin historia (checkout
 * superficial), se omite lastmod en vez de dar una fecha falsa.
 */
function lastModified(page: SitePage): string | undefined {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...page.sources], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined
  }
  catch {
    return undefined
  }
}

// Sitemap generado en el prerender a partir de shared/routes.ts: cada página en cada idioma en que existe,
// con sus alternativas hreflang (las mismas que declara la página en su <head>).
export default defineEventHandler((event) => {
  const urls = SITE_PAGES.flatMap((page) => {
    const locales = pageLocales(page)
    const lastmod = lastModified(page)
    const xDefault = pagePath(page, locales[0]!)!
    const alternates = [
      ...locales.map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE}${pagePath(page, code)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${xDefault}"/>`,
    ]
    return locales.map(code => [
      '  <url>',
      `    <loc>${SITE}${pagePath(page, code)}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      ...alternates,
      '  </url>',
    ].join('\n'))
  })

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
})
