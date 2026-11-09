import type { HeavndApp } from '~/utils/apps'
import type { Locale } from '~/utils/i18n'

/**
 * Subpáginas de heavnd.com: casos de uso de una app, guías y plantillas descargables. Una por fichero
 * (app/content/<id>.ts) con el texto de los tres idiomas; su ruta en cada idioma está en SITE_PAGES
 * (shared/routes.ts) con el mismo id. Las pinta components/SubPage.vue.
 */
export interface ContentBlock {
  h2: string
  paragraphs?: string[]
  list?: string[]
  /** Pasos numerados. */
  steps?: { title: string, text: string }[]
  /** Tabla: primera fila de cabecera. */
  table?: { head: string[], rows: string[][] }
}

export interface SubpageCopy {
  /** <title>: lo que se busca primero, la marca al final. ≤ 60 caracteres. */
  title: string
  /** Título de la tarjeta al compartir. */
  ogTitle: string
  /** Meta description. ≤ 155 caracteres. */
  description: string
  /** Nombre corto para las migas y los enlaces relacionados. */
  short: string
  h1: string
  lede: string
  /** Respuesta directa arriba de todo: lo que citan buscadores e IA. */
  answer: string
  blocks: ContentBlock[]
  faq: { q: string, a: string }[]
  cta: { title: string, text: string, button: string }
  /** Solo en plantillas: fichero en public/ y textos del botón. */
  download?: { href: string, button: string, note: string }
}

export interface Subpage {
  id: string
  /** feature: caso de uso de una app; guide: guía; template: plantilla descargable. */
  kind: 'feature' | 'guide' | 'template'
  app: HeavndApp['id']
  /** Imagen OG (public/og/<image>[-en|-ca].png). */
  image: string
  datePublished: string
  dateModified: string
  /** Ids de SITE_PAGES a los que enlaza al final. */
  related: string[]
  copy: Record<Locale, SubpageCopy>
}
