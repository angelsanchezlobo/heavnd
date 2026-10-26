import { computed, ref } from 'vue'
import ca from '~/locales/ca'
import en from '~/locales/en'
import es, { type Messages } from '~/locales/es'

/**
 * Traducción mínima propia en lugar de @nuxtjs/i18n, igual que en las apps: una sola página sin rutas
 * por idioma, un diccionario por idioma y una función t() reactiva.
 * El HTML se prerenderiza en español; el idioma guardado o el del navegador se aplica al montar
 * (restoreLocale), para que la hidratación encuentre el mismo texto que trae el HTML.
 */
export const LOCALES = ['es', 'en', 'ca'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_NAMES: Record<Locale, string> = { es: 'Español', en: 'English', ca: 'Català' }

const MESSAGES: Record<Locale, Messages> = { es, en, ca }
const INTL_TAGS: Record<Locale, string> = { es: 'es-ES', en: 'en-GB', ca: 'ca-ES' }
const STORAGE_KEY = 'heavnd-locale'

function detect(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // sin almacenamiento: idioma del navegador
  }
  const browser = (navigator.languages?.[0] ?? navigator.language ?? 'es').slice(0, 2).toLowerCase()
  return isLocale(browser) ? browser : 'es'
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export const locale = ref<Locale>('es')
export const intlTag = computed(() => INTL_TAGS[locale.value])

export function restoreLocale() {
  locale.value = detect()
}

export function setLocale(value: Locale) {
  locale.value = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // no se recuerda en este navegador, pero se aplica igual
  }
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
