import { computed, ref } from 'vue'
import ca from '~/locales/ca'
import en from '~/locales/en'
import es, { type Messages } from '~/locales/es'

/**
 * Traducción mínima propia en lugar de @nuxtjs/i18n: un diccionario por idioma y una función t() reactiva.
 * A diferencia de las apps, en la landing el idioma va en la URL (/ en español, /en/… y /ca/…) y cada
 * versión se prerenderiza: así cada idioma tiene su propia URL indexable y lo que ve un buscador
 * coincide con lo que declara la página. Nunca se elige por el idioma del navegador, que en
 * Googlebot es inglés y haría que indexara en inglés las URLs en español.
 * El middleware locale.global fija el idioma según la ruta antes de renderizar, en servidor y cliente.
 */
export const LOCALES = ['es', 'en', 'ca'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_NAMES: Record<Locale, string> = { es: 'Español', en: 'English', ca: 'Català' }

const MESSAGES: Record<Locale, Messages> = { es, en, ca }
const INTL_TAGS: Record<Locale, string> = { es: 'es-ES', en: 'en-GB', ca: 'ca-ES' }
/** Formato de og:locale (guion bajo en lugar de guion). */
export const OG_LOCALES: Record<Locale, string> = { es: 'es_ES', en: 'en_GB', ca: 'ca_ES' }
/** El español va sin prefijo para conservar las URLs que ya estaban compartidas e indexadas. */
export const DEFAULT_LOCALE: Locale = 'es'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export const locale = ref<Locale>('es')
export const intlTag = computed(() => INTL_TAGS[locale.value])

/** Idioma de una ruta: "/en/meald" → en, "/meald" → es. */
export function localeFromPath(path: string): Locale {
  const prefix = path.split('/')[1]
  return isLocale(prefix) && prefix !== DEFAULT_LOCALE ? prefix : DEFAULT_LOCALE
}

/** Ruta sin el prefijo de idioma: "/en/meald" → "/meald", "/en" → "/". */
export function stripLocale(path: string): string {
  const prefix = path.split('/')[1]
  if (!isLocale(prefix) || prefix === DEFAULT_LOCALE) return path
  return path.slice(prefix.length + 1) || '/'
}

/** Ruta en un idioma: localePath('/meald', 'en') → "/en/meald"; sin idioma, el actual. */
export function localePath(path: string, code: Locale = locale.value): string {
  if (code === DEFAULT_LOCALE) return path
  return path === '/' ? `/${code}` : `/${code}${path}`
}

function lookup(messages: Messages, key: string): string | undefined {
  let node: unknown = messages
  for (const part of key.split('.')) {
    if (node == null || typeof node !== 'object') return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return typeof node === 'string' ? node : undefined
}

/**
 * t('apps.count', { count: 2 }) → "2 apps".
 * - {nombre} se sustituye por params.nombre.
 * - "singular | plural" elige según params.count (1 → singular).
 * Si falta en el idioma actual, usa el español; si tampoco existe, devuelve la clave para que se note.
 */
export function t(key: string, params: Record<string, string | number> = {}): string {
  let text = lookup(MESSAGES[locale.value], key) ?? lookup(es, key) ?? key
  if (text.includes(' | ') && 'count' in params) {
    const [one, other] = text.split(' | ')
    text = Number(params.count) === 1 ? one! : other!
  }
  return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match))
}
