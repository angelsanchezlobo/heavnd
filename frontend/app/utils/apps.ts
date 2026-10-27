/**
 * Las apps que presenta la landing. El glifo es el mismo path del favicon de cada app, para que el
 * icono sea idéntico al que el usuario ve luego en la pestaña o en su pantalla de inicio.
 * Los textos viven en locales: apps.<id> (historia), workshop.<id> (hoja de ruta).
 */
export interface HeavndApp {
  id: 'resolvd' | 'meald' | 'togethrd'
  name: string
  url: string
  /** Clases del color de acento (token de main.css), ya resueltas para que Tailwind las detecte. */
  accent: { bg: string, text: string, tint: string, border: string }
  glyph: string
  steps: string[]
  facts: string[]
  roadmap: { next: string[], exploring: string[] }
  /** Página propia (/resolvd, /meald, /togethrd): textos en product.<id>. */
  page: {
    signupUrl: string
    loginUrl: string
    /** Situaciones reales en las que la app ayuda. */
    cases: string[]
    /** Todo lo que hace, agrupado en tarjetas. */
    features: string[]
    faq: string[]
    /**
     * Con pro, la sección de precio enseña Gratis y Pro (product.freemium para lo común y
     * product.<id>.freemium.free/pro para las filas de cada app); sin él, gratis del todo (product.pricing).
     * Las filas pueden estar preparadas en locales antes de activar pro.
     */
    pro: boolean
    freemium: { free: string[], pro: string[] }
  }
}

export const APPS: HeavndApp[] = [
  {
    id: 'resolvd',
    name: 'Resolvd',
    url: 'https://resolvd.heavnd.com',
    accent: { bg: 'bg-resolvd', text: 'text-resolvd', tint: 'bg-resolvd/15', border: 'border-resolvd' },
    glyph: 'M9 23V9h7.5a4.5 4.5 0 0 1 1.2 8.84L22.5 23h-3.6l-4.3-5H12.4v5zm3.4-8h4a1.8 1.8 0 0 0 0-3.6h-4z',
    steps: ['save', 'organize', 'tournament', 'budget'],
    facts: ['ways', 'states', 'champion'],
    roadmap: { next: ['priceWatch'], exploring: ['priceHistory', 'ai'] },
    page: {
      signupUrl: 'https://resolvd.heavnd.com/register',
      loginUrl: 'https://resolvd.heavnd.com/login',
      cases: ['sneakers', 'moving', 'couple', 'gifts'],
      features: ['save', 'tournament', 'compare', 'opinions', 'target', 'budget', 'gallery', 'share', 'giftList', 'purchases', 'everywhere'],
      faq: ['free', 'install', 'stores', 'friends', 'data', 'languages'],
      pro: true,
      freemium: {
        free: ['core', 'projects', 'members', 'giftLists', 'photos', 'history'],
        pro: ['all', 'next', 'support'],
      },
    },
  },
  {
    id: 'meald',
    name: 'Meald',
    url: 'https://meald.heavnd.com',
    accent: { bg: 'bg-meald', text: 'text-meald', tint: 'bg-meald/15', border: 'border-meald' },
    glyph: 'M8 23V9h3.2l4.8 7 4.8-7H24v14h-3.3v-8.6L16.9 20h-1.8l-3.8-5.6V23z',
    steps: ['recipes', 'products', 'week', 'shopping'],
    facts: ['leftovers', 'perKg', 'prep'],
    roadmap: { next: ['prices', 'pantry'], exploring: ['quality', 'ai'] },
    page: {
      signupUrl: 'https://meald.heavnd.com/register',
      loginUrl: 'https://meald.heavnd.com/login',
      cases: ['family', 'mealPrep', 'saving', 'socialRecipes'],
      features: ['recipes', 'import', 'products', 'week', 'leftovers', 'templates', 'shopping', 'cook', 'print', 'everywhere'],
      faq: ['free', 'install', 'supermarkets', 'tiktok', 'data', 'languages'],
      // Pro preparado (product.meald.freemium) pero sin activar: hoy Meald es gratis del todo.
      pro: false,
      freemium: {
        free: ['core', 'yours', 'household', 'ai', 'photos'],
        pro: ['prices', 'cheapest', 'ai', 'all', 'support'],
      },
    },
  },
  {
    id: 'togethrd',
    name: 'Togethrd',
    url: 'https://togethrd.heavnd.com',
    accent: { bg: 'bg-togethrd', text: 'text-togethrd', tint: 'bg-togethrd/15', border: 'border-togethrd' },
    glyph: 'M8.5 9h15v3.4h-5.8V23h-3.4V12.4H8.5z',
    steps: ['save', 'types', 'trips', 'done'],
    facts: ['types', 'link', 'photos'],
    roadmap: { next: ['planner', 'memory'], exploring: ['reminders', 'resolvd'] },
    page: {
      signupUrl: 'https://togethrd.heavnd.com/register',
      loginUrl: 'https://togethrd.heavnd.com/login',
      cases: ['couple', 'tiktok', 'trip', 'memory'],
      features: ['save', 'bulk', 'types', 'wishlist', 'trips', 'share', 'publicLink', 'review', 'photos', 'everywhere'],
      faq: ['free', 'install', 'share', 'recipes', 'data', 'languages'],
      // Pro preparado (product.togethrd.freemium) pero sin activar: hoy Togethrd es gratis del todo.
      pro: false,
      freemium: {
        free: ['core', 'yours', 'members', 'photos'],
        pro: ['all', 'next', 'support'],
      },
    },
  },
]

/** La H de la marca, con el mismo trazo que las iniciales de las apps. */
export const HEAVND_GLYPH = 'M9 9h3.3v5.4h7.4V9H23v14h-3.3v-5.6h-7.4V23H9z'

/** Secciones de la portada, en orden: alimentan su índice. */
export const SECTIONS = [
  { id: 'apps', key: 'nav.apps' },
  { id: 'manifesto', key: 'nav.manifesto' },
  { id: 'workshop', key: 'nav.workshop' },
] as const
