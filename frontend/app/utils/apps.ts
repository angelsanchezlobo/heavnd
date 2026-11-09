/**
 * Las apps que presenta la landing. El glifo es el mismo path del favicon de cada app, para que el
 * icono sea idéntico al que el usuario ve luego en la pestaña o en su pantalla de inicio.
 * Los textos viven en locales: apps.<id> (historia), workshop.<id> (hoja de ruta).
 */
export interface HeavndApp {
  id: 'choosd' | 'meald' | 'togethrd' | 'simplfd'
  name: string
  url: string
  /** Clases del color de acento (token de main.css), ya resueltas para que Tailwind las detecte. */
  accent: { bg: string, text: string, tint: string, border: string }
  glyph: string
  /** Fondo y color de la inicial del icono, fijos: los del favicon de la app. */
  icon: { bg: string, fill: string }
  steps: string[]
  facts: string[]
  roadmap: { next: string[], exploring: string[] }
  /** Página propia (/choosd, /meald, /togethrd, /simplfd): textos en product.<id>. */
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
    id: 'choosd',
    name: 'Choosd',
    url: 'https://choosd.heavnd.com',
    accent: { bg: 'bg-choosd', text: 'text-choosd', tint: 'bg-choosd/15', border: 'border-choosd' },
    glyph: 'M21.9 11.6A7.2 7.2 0 1 0 21.9 20.4L19.2 18.3A3.8 3.8 0 1 1 19.2 13.7Z',
    icon: { bg: '#3d4bdb', fill: 'text-[#ffffff]' },
    steps: ['save', 'organize', 'tournament', 'budget'],
    facts: ['ways', 'states', 'champion'],
    roadmap: { next: ['priceWatch'], exploring: ['priceHistory', 'ai'] },
    page: {
      signupUrl: 'https://choosd.heavnd.com/register',
      loginUrl: 'https://choosd.heavnd.com/login',
      cases: ['sneakers', 'moving', 'couple', 'gifts'],
      features: ['save', 'forYou', 'tournament', 'compare', 'opinions', 'target', 'budget', 'gallery', 'share', 'giftList', 'purchases', 'followUp', 'shareResult', 'fromTogethrd', 'everywhere'],
      faq: ['rename', 'free', 'install', 'stores', 'affiliate', 'learning', 'friends', 'data', 'languages'],
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
    icon: { bg: '#111114', fill: 'text-meald' },
    steps: ['recipes', 'products', 'week', 'shopping'],
    facts: ['leftovers', 'perKg', 'prep'],
    roadmap: { next: ['prices'], exploring: ['quality', 'ai'] },
    page: {
      signupUrl: 'https://meald.heavnd.com/register',
      loginUrl: 'https://meald.heavnd.com/login',
      cases: ['family', 'mealPrep', 'saving', 'socialRecipes'],
      features: ['recipes', 'import', 'products', 'ingredients', 'week', 'suggestions', 'taste', 'leftovers', 'templates', 'shopping', 'pantry', 'cook', 'print', 'everywhere'],
      faq: ['free', 'install', 'supermarkets', 'tiktok', 'learning', 'data', 'languages'],
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
    icon: { bg: '#2a1d24', fill: 'text-[#f6c9d3]' },
    steps: ['save', 'types', 'plan', 'done'],
    facts: ['types', 'link', 'photos'],
    roadmap: { next: ['push'], exploring: ['weather'] },
    page: {
      signupUrl: 'https://togethrd.heavnd.com/register',
      loginUrl: 'https://togethrd.heavnd.com/login',
      cases: ['couple', 'tiktok', 'trip', 'memory'],
      features: ['save', 'bulk', 'surprise', 'swipe', 'plans', 'discover', 'experiences', 'friends', 'hours', 'surprisePlan', 'tiebreak', 'memory', 'yearly', 'reminders', 'map', 'types', 'wishlist', 'trips', 'share', 'publicLink', 'review', 'photos', 'everywhere'],
      faq: ['free', 'install', 'share', 'public', 'recipes', 'data', 'languages'],
      // Pro preparado (product.togethrd.freemium) pero sin activar: hoy Togethrd es gratis del todo.
      pro: false,
      freemium: {
        free: ['core', 'yours', 'members', 'photos'],
        pro: ['all', 'next', 'support'],
      },
    },
  },
  {
    id: 'simplfd',
    name: 'Simplfd',
    url: 'https://simplfd.heavnd.com',
    accent: { bg: 'bg-simplfd', text: 'text-simplfd', tint: 'bg-simplfd/15', border: 'border-simplfd' },
    glyph: 'M9 9h14v3.3H12.3v2.05H23V23H9v-3.3h10.7v-2.05H9z',
    icon: { bg: '#0e5a57', fill: 'text-[#bfe8df]' },
    steps: ['section', 'add', 'split', 'settle'],
    facts: ['bank', 'cents', 'once'],
    roadmap: { next: ['recurring', 'export'], exploring: ['bank', 'currency'] },
    page: {
      signupUrl: 'https://simplfd.heavnd.com/register',
      loginUrl: 'https://simplfd.heavnd.com/login',
      cases: ['flat', 'couple', 'trip', 'personal'],
      features: ['sections', 'quick', 'budget', 'spaces', 'split', 'balances', 'mine', 'rules', 'import', 'people', 'roles', 'everywhere'],
      faq: ['free', 'bank', 'install', 'share', 'privacy', 'data', 'languages'],
      // Gratis del todo, sin plan Pro preparado.
      pro: false,
      freemium: { free: [], pro: [] },
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
