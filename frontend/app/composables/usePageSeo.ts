import type { HeavndApp } from '~/utils/apps'
import { SITE, pageLocales, pagePath, sitePage } from '#shared/routes'

type JsonLd = Record<string, unknown>

interface PageSeo {
  /** Id de la página en SITE_PAGES (shared/routes.ts): de ahí salen su URL en cada idioma y hreflang. */
  id: string
  /** Título del resultado de búsqueda: primero lo que se busca, luego la marca. */
  title: () => string
  /** Título de la tarjeta al compartir: más corto y con la voz de la marca. */
  ogTitle: () => string
  description: () => string
  /** Nombre de la imagen en public/og/ sin idioma (se genera con scripts/og-images.mjs). */
  image: string
  /** website para la portada y las páginas de app; article para guías y casos de uso. */
  ogType?: 'website' | 'article'
  /** Migas de pan desde la portada, sin incluirla: [{ name, id }] con id de SITE_PAGES. */
  breadcrumb?: () => { name: string, id: string }[]
  /** Propiedades extra del nodo WebPage de la página (about, fechas…). */
  webPage?: () => JsonLd
  /**
   * Nodos schema.org propios de la página. Se publican en un único @graph junto a la organización,
   * el sitio, la propia página (WebPage) y sus migas, que se enlazan entre sí por @id.
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

/** URL absoluta de una página de SITE_PAGES en un idioma (el actual por defecto). */
export function pageUrl(id: string, code: Locale = locale.value) {
  const path = pagePath(sitePage(id), code)
  return path === undefined ? undefined : absoluteUrl(path)
}

/** Ruta relativa de una página en el idioma actual, para NuxtLink. */
export function pageLink(id: string, code: Locale = locale.value) {
  return pagePath(sitePage(id), code)
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
 * Cada idioma tiene su URL: la canónica apunta a sí misma y hreflang enlaza las versiones que existen.
 * Son funciones porque el idioma puede cambiar sin desmontar la página.
 */
export function usePageSeo(page: PageSeo) {
  const site = sitePage(page.id)
  const url = () => pageUrl(page.id)!
  const image = () => ogImageUrl(page.image)
  const locales = pageLocales(site)

  useSeoMeta({
    title: page.title,
    description: page.description,
    robots: ROBOTS,
    ogType: page.ogType ?? 'website',
    ogSiteName: 'Heavnd',
    ogLocale: () => OG_LOCALES[locale.value],
    ogLocaleAlternate: () => locales.filter(code => code !== locale.value).map(code => OG_LOCALES[code]),
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

  const breadcrumbNode = (): JsonLd[] => {
    const trail = page.breadcrumb?.()
    if (!trail?.length) return []
    return [{
      '@type': 'BreadcrumbList',
      '@id': `${url()}#breadcrumb`,
      itemListElement: [{ name: 'Heavnd', id: 'home' }, ...trail].map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: pageUrl(crumb.id),
      })),
    }]
  }

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
        ...(page.id === 'home' ? { about: { '@id': LD_IDS.organization } } : {}),
        ...(page.breadcrumb ? { breadcrumb: { '@id': `${url()}#breadcrumb` } } : {}),
        ...page.webPage?.(),
      },
      ...breadcrumbNode(),
      ...(page.jsonLd?.() ?? []),
    ],
  })

  useHead({
    link: () => [
      { rel: 'canonical', href: url() },
      ...locales.map(code => ({ rel: 'alternate' as const, hreflang: code, href: pageUrl(page.id, code)! })),
      { rel: 'alternate' as const, hreflang: 'x-default', href: pageUrl(page.id, locales[0]!)! },
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

/** @id de la app como entidad (WebApplication), para referenciarla desde sus subpáginas. */
export function appEntityId(app: HeavndApp) {
  return `${app.url}/#app`
}

/** Preguntas frecuentes visibles en la página, como FAQPage. */
export function faqNode(id: string, items: { q: string, a: string }[]): JsonLd {
  const url = pageUrl(id)!
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage: locale.value,
    isPartOf: { '@id': `${url}#webpage` },
    mainEntity: items.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  }
}

/** SEO de la página de presentación de una app (heavnd.com/<id>). */
export function useAppPageSeo(app: HeavndApp) {
  usePageSeo({
    id: app.id,
    title: () => t(`product.${app.id}.seoTitle`),
    ogTitle: () => t(`product.${app.id}.metaTitle`),
    description: () => t(`product.${app.id}.metaDescription`),
    image: app.id,
    breadcrumb: () => [{ name: app.name, id: app.id }],
    jsonLd: () => [
      {
        '@type': 'WebApplication',
        '@id': appEntityId(app),
        name: app.name,
        alternateName: t(`product.${app.id}.metaTitle`),
        url: app.url,
        mainEntityOfPage: { '@id': `${pageUrl(app.id)}#webpage` },
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
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: withRef(app.page.signupUrl, app.id) },
        publisher: { '@id': LD_IDS.organization },
        creator: { '@id': LD_IDS.organization },
        isPartOf: { '@id': LD_IDS.website },
      },
      faqNode(app.id, app.page.faq.map(q => ({ q: t(`product.${app.id}.faq.${q}.q`), a: t(`product.${app.id}.faq.${q}.a`) }))),
    ],
  })
}

/** Lista de las apps para la portada: cada una enlaza a su página en el idioma actual. */
export function appsItemList(apps: HeavndApp[]): JsonLd {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl('home')}#apps`,
    name: t('apps.title'),
    numberOfItems: apps.length,
    itemListElement: apps.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: pageUrl(app.id),
      name: `${app.name} — ${t(`apps.${app.id}.tagline`)}`,
    })),
  }
}
