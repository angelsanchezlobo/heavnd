import type { HeavndApp } from '~/utils/apps'

const SITE = 'https://heavnd.com'

interface PageSeo {
  /** Ruta canónica de la página, empezando por "/". */
  path: string
  /** Título del resultado de búsqueda: primero el problema que resuelve, luego la marca. */
  title: () => string
  /** Título de la tarjeta al compartir: más corto y con la voz de la marca. */
  ogTitle: () => string
  description: () => string
  /** Nombre de la imagen en public/og/ (se genera con scripts/og-images.mjs). */
  image: string
  /** Datos estructurados schema.org de la página. */
  jsonLd?: () => Record<string, unknown>[]
}

/**
 * Metadatos de buscadores y de vista previa al compartir de una página. Se prerenderizan en el HTML,
 * así que los leen también los rastreadores que no ejecutan JavaScript (WhatsApp, Slack, Discord…).
 * El HTML sale en español; al cambiar de idioma en el navegador se traducen título y descripción.
 */
export function usePageSeo(page: PageSeo) {
  const url = `${SITE}${page.path}`
  const image = `${SITE}/og/${page.image}.png`

  useSeoMeta({
    title: page.title,
    description: page.description,
    ogType: 'website',
    ogSiteName: 'Heavnd',
    ogLocale: 'es_ES',
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
    link: [{ rel: 'canonical', href: url }],
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
      description: t(`product.${app.id}.metaDescription`),
      applicationCategory: CATEGORIES[app.id],
      operatingSystem: 'Web',
      inLanguage: ['es', 'en', 'ca'],
      image: absoluteUrl(`/og/${app.id}.png`),
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
      publisher: HEAVND_ORG,
    }],
  })
}
