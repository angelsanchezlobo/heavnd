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
  /** Fondo y color del glifo del icono, fijos: los del favicon de la app. */
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
    accent: { bg: 'bg-choosd-strong', text: 'text-choosd-strong', tint: 'bg-choosd/40 dark:bg-choosd/15', border: 'border-choosd-strong' },
    glyph: 'M25.75 14.3A9.9 9.9 0 1 0 15.3 25.88V14.3ZM15.8 25.9V23.5C15.8 20.6 18.1 18.3 21.5 18.3H25.63A9.9 9.9 0 0 1 15.8 25.9Z',
    icon: { bg: '#93a9fc', fill: 'text-[#141019]' },
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
    accent: { bg: 'bg-meald-strong', text: 'text-meald-strong', tint: 'bg-meald/40 dark:bg-meald/15', border: 'border-meald-strong' },
    glyph: 'M5.7 6.6A10 8.7 0 0 1 15.7 15.3V25.4H5.7ZM26.3 6.6A10 8.7 0 0 0 16.3 15.3V25.4H26.3Z',
    icon: { bg: '#c1e5bc', fill: 'text-[#141019]' },
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
    accent: { bg: 'bg-togethrd-strong', text: 'text-togethrd-strong', tint: 'bg-togethrd/40 dark:bg-togethrd/15', border: 'border-togethrd-strong' },
    glyph: 'M4.95 6.65H11.82A3.76 4 0 0 1 15.58 10.65V25.35H10.59V14.05A5.64 7.4 0 0 1 4.95 6.65ZM27.05 6.65H20.18A3.76 4 0 0 0 16.42 10.65V25.35H21.41V14.05A5.64 7.4 0 0 0 27.05 6.65Z',
    icon: { bg: '#fbbdd0', fill: 'text-[#141019]' },
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
    accent: { bg: 'bg-simplfd-strong', text: 'text-simplfd-strong', tint: 'bg-simplfd/40 dark:bg-simplfd/15', border: 'border-simplfd-strong' },
    glyph: 'M13.6 6.2H26C26 11.5 23.5 15.17 18.5 15.17H15.82V16.55L13.6 16.4A5.1 5.1 0 0 1 8.5 11.3A5.1 5.1 0 0 1 13.6 6.2ZM6.27 16.95H16.18V15.55H18.8A5.15 5.15 0 0 1 18.8 25.85H6.27Z',
    icon: { bg: '#85cece', fill: 'text-[#141019]' },
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

/** El glifo de la marca, en el mismo lenguaje que los de las apps. */
export const HEAVND_GLYPH = 'M6.9 6.75A8.5 8.5 0 0 1 15.4 15.25V25.25H6.9ZM25.1 6.75A9.25 9.25 0 0 0 25.1 25.25Z'

