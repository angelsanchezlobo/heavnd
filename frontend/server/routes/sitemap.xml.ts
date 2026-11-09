import { PAGES, SITE, SITE_LOCALES, prefixedPath } from '../../shared/routes'

// Sitemap generado en el prerender a partir de shared/routes.ts: cada página en sus tres idiomas,
// con sus alternativas hreflang (las mismas que declara cada página en su <head>).
export default defineEventHandler((event) => {
  const alternates = (path: string) => [
    ...SITE_LOCALES.map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE}${prefixedPath(path, code)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${path}"/>`,
  ].join('\n')

  const urls = PAGES.flatMap(path => SITE_LOCALES.map(code => [
    '  <url>',
    `    <loc>${SITE}${prefixedPath(path, code)}</loc>`,
    alternates(path),
    '  </url>',
  ].join('\n')))

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
})
