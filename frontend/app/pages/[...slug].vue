<template>
  <SubPage :page="page" />
</template>

<script setup lang="ts">
import { findPage } from '#shared/routes'

// Subpáginas (casos de uso, guías, plantillas): la ruta de cada idioma está en SITE_PAGES y el contenido
// en SUBPAGES con el mismo id. Cualquier otra ruta es un 404 de verdad.
const match = findPage(useRoute().path)
const found = match && SUBPAGES[match.page.id]
if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })
}
const page = found
const app = APPS.find(a => a.id === page.app)!
const copy = () => page.copy[locale.value]

usePageSeo({
  id: page.id,
  title: () => copy().title,
  ogTitle: () => copy().ogTitle,
  description: () => copy().description,
  image: page.image,
  ogType: 'article',
  breadcrumb: () => [{ name: app.name, id: app.id }, { name: copy().short, id: page.id }],
  // La página trata de la app; su WebApplication completa está en la página de la app.
  webPage: () => ({ about: { '@id': appEntityId(app) }, datePublished: page.datePublished, dateModified: page.dateModified }),
  jsonLd: () => {
    const url = pageUrl(page.id)!
    const nodes: Record<string, unknown>[] = [faqNode(page.id, copy().faq)]
    // Guías y plantillas, además, como Article con fechas y autor.
    if (page.kind !== 'feature') {
      nodes.push({
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: copy().h1,
        description: copy().description,
        inLanguage: locale.value,
        datePublished: page.datePublished,
        dateModified: page.dateModified,
        image: ogImageUrl(page.image),
        author: { '@id': LD_IDS.organization },
        publisher: { '@id': LD_IDS.organization },
        mainEntityOfPage: { '@id': `${url}#webpage` },
        about: { '@id': appEntityId(app) },
        ...(copy().download
          ? { associatedMedia: { '@type': 'MediaObject', name: copy().h1, contentUrl: absoluteUrl(copy().download!.href), encodingFormat: 'application/pdf', isAccessibleForFree: true } }
          : {}),
      })
    }
    return nodes
  },
})
</script>
