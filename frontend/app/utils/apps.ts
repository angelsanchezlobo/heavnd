/**
 * Las apps que presenta la landing. El glifo es el mismo path del favicon de cada app, para que el
 * icono de la tarjeta sea idéntico al que el usuario ve luego en la pestaña o en su pantalla de inicio.
 * Los textos viven en locales bajo apps.<id>.
 */
export interface HeavndApp {
  id: 'resolvd' | 'meald'
  name: string
  url: string
  /** Clases del color de acento (token de main.css), ya resueltas para que Tailwind las detecte. */
  accent: { bg: string, text: string }
  glyph: string
  features: string[]
}

export const APPS: HeavndApp[] = [
  {
    id: 'resolvd',
    name: 'Resolvd',
    url: 'https://resolvd.heavnd.com',
    accent: { bg: 'bg-resolvd', text: 'text-resolvd' },
    glyph: 'M9 23V9h7.5a4.5 4.5 0 0 1 1.2 8.84L22.5 23h-3.6l-4.3-5H12.4v5zm3.4-8h4a1.8 1.8 0 0 0 0-3.6h-4z',
    features: ['save', 'tournament', 'budget'],
  },
  {
    id: 'meald',
    name: 'Meald',
    url: 'https://meald.heavnd.com',
    accent: { bg: 'bg-meald', text: 'text-meald' },
    glyph: 'M8 23V9h3.2l4.8 7 4.8-7H24v14h-3.3v-8.6L16.9 20h-1.8l-3.8-5.6V23z',
    features: ['recipes', 'plan', 'shopping'],
  },
]

/** La H de la marca, con el mismo trazo que las iniciales de las apps. */
export const HEAVND_GLYPH = 'M9 9h3.3v5.4h7.4V9H23v14h-3.3v-5.6h-7.4V23H9z'
