import type { HeavndApp } from '~/utils/apps'
import { SITE } from '#shared/routes'

type JsonLd = Record<string, unknown>

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
  /**
   * Nodos schema.org propios de la página. Se publican en un único @graph junto a la organización,
   * el sitio y la propia página (WebPage), que se enlazan entre sí por @id.
   */
  jsonLd?: () => JsonLd[]
}

/** Imagen OG de una página en un idioma: la española sin sufijo, las demás con "-en" / "-ca". */
export function ogImageUrl(image: string, code: Locale = locale.value) {
  return `${SITE}/og/${image}${code === DEFAULT_LOCALE ? '' : `-${code}`}.png`
}

export function absoluteUrl(path: string) {
  return `${SITE}${path}`
}

/** Identificadores estables de los nodos compartidos del @graph. */
export const LD_IDS = {
  organization: `${SITE}/#organization`,
  website: `${SITE}/#website`,
  logo: `${SITE}/#logo`,
}

/** Heavnd como organización: la misma en todas las páginas, con su logo (lo pide Google para el panel de marca). */
function organizationNode(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': LD_IDS.organization,
    name: 'Heavnd',
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', '@id': LD_IDS.logo, url: `${SITE}/icon-512.png`, contentUrl: `${SITE}/icon-512.png`, width: 512, height: 512, caption: 'Heavnd' },
    image: { '@id': LD_IDS.logo },
    description: t('seo.home.description'),
  }
}

function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': LD_IDS.website,
    name: 'Heavnd',
    url: `${SITE}/`,
    inLanguage: [...LOCALES],
    publisher: { '@id': LD_IDS.organization },
  }
}

/** Directivas para buscadores: imagen grande en resultados y Discover, fragmentos sin límite. */
const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

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
    robots: ROBOTS,
    ogType: 'website',
    ogSiteName: 'Heavnd',
    ogLocale: () => OG_LOCALES[locale.value],
    ogLocaleAlternate: () => LOCALES.filter(code => code !== locale.value).map(code => OG_LOCALES[code]),
    ogTitle: page.ogTitle,
    ogDescription: page.description,
    ogUrl: url,
    ogImage: image,
    ogImageSecureUrl: image,
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

  const graph = (): JsonLd => ({
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${url()}#webpage`,
        url: url(),
        name: page.title(),
        description: page.description(),
        inLanguage: locale.value,
        isPartOf: { '@id': LD_IDS.website },
        publisher: { '@id': LD_IDS.organization },
        primaryImageOfPage: { '@type': 'ImageObject', url: image(), width: 1200, height: 630 },
        ...(page.path === '/' ? { about: { '@id': LD_IDS.organization } } : { breadcrumb: { '@id': `${url()}#breadcrumb` } }),
      },
      ...(page.jsonLd?.() ?? []),
    ],
  })

  useHead({
    link: () => [
      { rel: 'canonical', href: url() },
      ...LOCALES.map(code => ({ rel: 'alternate' as const, hreflang: code, href: absoluteUrl(localePath(page.path, code)) })),
      { rel: 'alternate' as const, hreflang: 'x-default', href: absoluteUrl(page.path) },
    ],
    script: [{ type: 'application/ld+json', innerHTML: () => JSON.stringify(graph()) }],
  })
}

/** Categoría de schema.org que Google reconoce para cada app. */
const CATEGORIES: Record<HeavndApp['id'], string> = {
  choosd: 'ShoppingApplication',
  meald: 'LifestyleApplication',
  togethrd: 'LifestyleApplication',
}

/** SEO de la página de presentación de una app (heavnd.com/<id>). */
export function useAppPageSeo(app: HeavndApp) {
  const pageUrl = () => absoluteUrl(localePath(`/${app.id}`))

  usePageSeo({
    path: `/${app.id}`,
    title: () => t(`product.${app.id}.seoTitle`),
    ogTitle: () => t(`product.${app.id}.metaTitle`),
    description: () => t(`product.${app.id}.metaDescription`),
    image: app.id,
    jsonLd: () => [
      {
        '@type': 'WebApplication',
        '@id': `${app.url}/#app`,
        name: app.name,
        alternateName: t(`product.${app.id}.metaTitle`),
        url: app.url,
        mainEntityOfPage: { '@id': `${pageUrl()}#webpage` },
        description: t(`product.${app.id}.metaDescription`),
        abstract: t(`product.${app.id}.headline`),
        applicationCategory: CATEGORIES[app.id],
        operatingSystem: 'Web, Android, iOS',
        browserRequirements: 'Requires JavaScript. Works in any modern browser.',
        inLanguage: [...LOCALES],
        isAccessibleForFree: true,
        image: ogImageUrl(app.id),
        screenshot: ogImageUrl(app.id),
        featureList: app.page.features.map(f => t(`product.${app.id}.features.${f}.title`)),
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: app.page.signupUrl },
        publisher: { '@id': LD_IDS.organization },
        creator: { '@id': LD_IDS.organization },
        isPartOf: { '@id': LD_IDS.website },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl()}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Heavnd', item: absoluteUrl(localePath('/')) },
          { '@type': 'ListItem', position: 2, name: app.name, item: pageUrl() },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl()}#faq`,
        url: pageUrl(),
        inLanguage: locale.value,
        isPartOf: { '@id': `${pageUrl()}#webpage` },
        mainEntity: app.page.faq.map(q => ({
          '@type': 'Question',
          name: t(`product.${app.id}.faq.${q}.q`),
          acceptedAnswer: { '@type': 'Answer', text: t(`product.${app.id}.faq.${q}.a`) },
        })),
      },
    ],
  })
}

/** Lista de las apps para la portada: cada una enlaza a su página en el idioma actual. */
export function appsItemList(apps: HeavndApp[]): JsonLd {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(localePath('/'))}#apps`,
    name: t('apps.title'),
    numberOfItems: apps.length,
    itemListElement: apps.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(localePath(`/${app.id}`)),
      name: `${app.name} — ${t(`apps.${app.id}.tagline`)}`,
    })),
  }
}
