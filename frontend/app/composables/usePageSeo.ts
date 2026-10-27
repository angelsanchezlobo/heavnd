import type { HeavndApp } from '~/utils/apps'

const SITE = 'https://heavnd.com'

interface PageSeo {
  /** Ruta de la página en español, empezando por "/"; las de los otros idiomas llevan su prefijo. */
  path: string
  /** Título del resultado de búsqueda: primero el problema que resuelve, luego la marca. */
  title: () => string
  /** Título de la tarjeta al compartir: más corto y con la voz de la marca. */
  ogTitle: () => string
  description: () => string
  /** Nombre de la imagen en public/og/ sin idioma (se genera con scripts/og-images.mjs). */
  image: string
  /** Datos estructurados schema.org de la página. */
  jsonLd?: () => Record<string, unknown>[]
}

/** Imagen OG de una página en un idioma: la española sin sufijo, las demás con "-en" / "-ca". */
export function ogImageUrl(image: string, code: Locale = locale.value) {
  return `${SITE}/og/${image}${code === DEFAULT_LOCALE ? '' : `-${code}`}.png`
}

/**
 * Metadatos de buscadores y de vista previa al compartir de una página. Se prerenderizan en el HTML,
 * así que los leen también los rastreadores que no ejecutan JavaScript (WhatsApp, Slack, Discord…).
 * Cada idioma tiene su URL: la canónica apunta a sí misma y hreflang enlaza las tres versiones.
 * Son funciones porque el idioma puede cambiar sin desmontar la página.
 */
export function usePageSeo(page: PageSeo) {
  const url = () => absoluteUrl(localePath(page.path))
  const image = () => ogImageUrl(page.image)

  useSeoMeta({
    title: page.title,
    description: page.description,
    ogType: 'website',
    ogSiteName: 'Heavnd',
    ogLocale: () => OG_LOCALES[locale.value],
    ogLocaleAlternate: () => LOCALES.filter(code => code !== locale.value).map(code => OG_LOCALES[code]),
    ogTitle: page.ogTitle,
    ogDescription: page.description,
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogImageAlt: page.ogTitle,
    twitterCard: 'summary_large_image',
    twitterTitle: page.ogTitle,
    twitterDescription: page.description,
    twitterImage: image,
    twitterImageAlt: page.ogTitle,
  })

  useHead({
    link: () => [
      { rel: 'canonical', href: url() },
      ...LOCALES.map(code => ({ rel: 'alternate' as const, hreflang: code, href: absoluteUrl(localePath(page.path, code)) })),
      { rel: 'alternate' as const, hreflang: 'x-default', href: absoluteUrl(page.path) },
    ],
    script: page.jsonLd
      ? [{ type: 'application/ld+json', innerHTML: () => JSON.stringify(page.jsonLd!()) }]
      : [],
  })
}

/** Heavnd como organización, para referenciarla desde las páginas de cada app. */
export const HEAVND_ORG = { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Heavnd', url: `${SITE}/` }

export function absoluteUrl(path: string) {
  return `${SITE}${path}`
}

/** Categoría de schema.org que Google reconoce para cada app. */
const CATEGORIES: Record<HeavndApp['id'], string> = {
  resolvd: 'ShoppingApplication',
  meald: 'LifestyleApplication',
  togethrd: 'LifestyleApplication',
}

/** SEO de la página de presentación de una app (heavnd.com/<id>). */
export function useAppPageSeo(app: HeavndApp) {
  usePageSeo({
    path: `/${app.id}`,
    title: () => t(`product.${app.id}.seoTitle`),
    ogTitle: () => t(`product.${app.id}.metaTitle`),
    description: () => t(`product.${app.id}.metaDescription`),
    image: app.id,
    jsonLd: () => [{
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: app.name,
      url: app.url,
      mainEntityOfPage: absoluteUrl(localePath(`/${app.id}`)),
      description: t(`product.${app.id}.metaDescription`),
      applicationCategory: CATEGORIES[app.id],
      operatingSystem: 'Web',
      inLanguage: [...LOCALES],
      image: ogImageUrl(app.id),
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
      publisher: HEAVND_ORG,
    }],
  })
}
