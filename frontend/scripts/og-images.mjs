// Genera las imágenes Open Graph (1200×630) de la portada y de cada app en public/og/.
// No forma parte del build: se ejecuta a mano cuando cambia un texto o un color, y las PNG se suben al repo.
//
//   node scripts/og-images.mjs
//
// Necesita Playwright con Chromium instalado en la máquina (no es dependencia del proyecto).
// Colores y glifos copiados de assets/css/main.css y utils/apps.ts: si cambian allí, cambian aquí.
// highlight = subrayado del título cuando el acento es oscuro (si no, el acento al 70 %).
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fontDir = resolve(root, 'node_modules/@fontsource-variable/fraunces/files')
const font = name => pathToFileURL(resolve(fontDir, name)).href
// Ilustraciones del panel derecho (cuadradas, sin texto), una por tarjeta: scripts/og-art/<file>.webp.
// Van en data URI porque Chromium no carga imágenes file:// en una página creada con setContent.
const art = file => `data:image/webp;base64,${readFileSync(resolve(root, 'scripts/og-art', `${file}.webp`)).toString('base64')}`

const INK = '#111114'
const PAPER = '#f6f5f2'
const MUTED = '#6b6b73'
const BRAND = '#b7a6ff'
// Tinta de los glifos de los iconos (favicons de las apps y de Heavnd).
const ICON_INK = '#141019'

const APPS = {
  choosd: { name: 'Choosd', accent: '#3d4bdb', highlight: '#c5cbf6', icon: { bg: '#93a9fc', fill: ICON_INK }, glyph: 'M25.75 14.3A9.9 9.9 0 1 0 15.3 25.88V14.3ZM15.8 25.9V23.5C15.8 20.6 18.1 18.3 21.5 18.3H25.63A9.9 9.9 0 0 1 15.8 25.9Z' },
  meald: { name: 'Meald', accent: '#9bd36b', icon: { bg: '#c1e5bc', fill: ICON_INK }, glyph: 'M5.7 6.6A10 8.7 0 0 1 15.7 15.3V25.4H5.7ZM26.3 6.6A10 8.7 0 0 0 16.3 15.3V25.4H26.3Z' },
  simplfd: { name: 'Simplfd', accent: '#0e5a57', highlight: '#bfe8df', icon: { bg: '#85cece', fill: ICON_INK }, glyph: 'M13.6 6.2H26C26 11.5 23.5 15.17 18.5 15.17H15.82V16.55L13.6 16.4A5.1 5.1 0 0 1 8.5 11.3A5.1 5.1 0 0 1 13.6 6.2ZM6.27 16.95H16.18V15.55H18.8A5.15 5.15 0 0 1 18.8 25.85H6.27Z' },
  togethrd: { name: 'Togethrd', accent: '#9b3a51', highlight: '#f0c6d1', icon: { bg: '#fbbdd0', fill: ICON_INK }, glyph: 'M4.95 6.65H11.82A3.76 4 0 0 1 15.58 10.65V25.35H10.59V14.05A5.64 7.4 0 0 1 4.95 6.65ZM27.05 6.65H20.18A3.76 4 0 0 0 16.42 10.65V25.35H21.41V14.05A5.64 7.4 0 0 0 27.05 6.65Z' },
}
const HEAVND_GLYPH = 'M6.9 6.75A8.5 8.5 0 0 1 15.4 15.25V25.25H6.9ZM25.1 6.75A9.25 9.25 0 0 0 25.1 25.25Z'

// Una tarjeta por página y por idioma: public/og/<file>.png en español y <file>-en.png / <file>-ca.png.
// Los textos son los de hero y tagline de cada locale, en versión corta para la tarjeta.
const CARDS = [
  {
    file: 'heavnd',
    label: 'Heavnd · heavnd.com',
    glyph: HEAVND_GLYPH,
    icon: { bg: '#a988f9', fill: ICON_INK },
    accent: BRAND,
    copy: {
      es: { title: 'Para lo que decides <em>cada semana.</em>', text: 'Apps pequeñas para decidir qué comprar, qué comer y qué hacer.' },
      en: { title: 'For what you decide <em>every week.</em>', text: 'Small apps to decide what to buy, what to eat and what to do.' },
      ca: { title: 'Per al que decideixes <em>cada setmana.</em>', text: 'Apps petites per decidir què comprar, què menjar i què fer.' },
    },
  },
  {
    file: 'choosd',
    label: 'Choosd · heavnd.com',
    ...APPS.choosd,
    copy: {
      es: { title: 'Decide <em>qué comprar.</em>', text: 'Guarda productos de cualquier tienda, compáralos y elige sin pasarte del presupuesto.' },
      en: { title: 'Decide <em>what to buy.</em>', text: 'Save products from any shop, compare them and choose without going over budget.' },
      ca: { title: 'Decideix <em>què comprar.</em>', text: 'Desa productes de qualsevol botiga, compara’ls i tria sense passar-te del pressupost.' },
    },
  },
  {
    file: 'meald',
    label: 'Meald · heavnd.com',
    ...APPS.meald,
    copy: {
      es: { title: 'Planifica <em>qué comer.</em>', text: 'Tus recetas, tu plan semanal y tu lista de la compra con precios reales del súper.' },
      en: { title: 'Plan <em>what to eat.</em>', text: 'Your recipes, your weekly plan and your shopping list with real supermarket prices.' },
      ca: { title: 'Planifica <em>què menjar.</em>', text: 'Les teves receptes, el teu pla setmanal i la llista de la compra amb preus reals del súper.' },
    },
  },
  {
    file: 'togethrd',
    label: 'Togethrd · heavnd.com',
    ...APPS.togethrd,
    copy: {
      es: { title: 'Recuerda <em>qué hacer.</em>', text: 'Guarda restaurantes, planes y viajes, y no se os olvide ninguno.' },
      en: { title: 'Remember <em>what to do.</em>', text: 'Save restaurants, plans and trips, and never forget one.' },
      ca: { title: 'Recorda <em>què fer.</em>', text: 'Desa restaurants, plans i viatges, i que no se us n’oblidi cap.' },
    },
  },
  {
    file: 'simplfd',
    label: 'Simplfd · heavnd.com',
    ...APPS.simplfd,
    copy: {
      es: { title: 'Ordena <em>tu dinero.</em>', text: 'Tus gastos y los compartidos con el piso, la pareja o un viaje, sin conectar el banco.' },
      en: { title: 'Sort out <em>your money.</em>', text: 'Your spending and what you share with flatmates, a partner or a trip, without linking your bank.' },
      ca: { title: 'Endreça <em>els teus diners.</em>', text: 'Les teves despeses i les compartides amb el pis, la parella o un viatge, sense connectar el banc.' },
    },
  },
]

// El icono de cada app con los colores de su favicon (apps.ts → icon).
const icon = (glyph, { bg, fill }, size) =>
  `<svg viewBox="0 0 32 32" width="${size}" height="${size}"><rect width="32" height="32" rx="8" fill="${bg}"/><path d="${glyph}" fill="${fill}"/></svg>`

function html(card) {
  const side = `<div class="panel"><img src="${art(card.file)}" alt=""></div>`
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: Fraunces; src: url(${font('fraunces-latin-opsz-normal.woff2')}) format('woff2'); font-weight: 100 900; }
    @font-face { font-family: Fraunces; font-style: italic; src: url(${font('fraunces-latin-opsz-italic.woff2')}) format('woff2'); font-weight: 100 900; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; background: ${PAPER}; color: ${INK}; font-family: ui-sans-serif, system-ui, sans-serif;
      display: grid; grid-template-columns: 1fr 440px; gap: 56px; align-items: center; padding: 64px 72px; position: relative; }
    .label { display: flex; align-items: center; gap: 14px; font: 500 20px ui-monospace, Menlo, monospace; letter-spacing: .14em; text-transform: uppercase; color: ${MUTED}; }
    h1 { margin-top: 40px; font: 500 84px/0.98 Fraunces, serif; letter-spacing: -0.02em; }
    h1 em { font-style: italic; background: linear-gradient(transparent 68%, ${card.highlight ?? `${card.accent}b3`} 68%, ${card.highlight ?? `${card.accent}b3`} 88%, transparent 88%); }
    p { margin-top: 28px; font-size: 28px; line-height: 1.35; color: ${MUTED}; }
    /* Mismo lenguaje que la ilustración: contorno de tinta y sombra dura corta. */
    .panel { width: 440px; height: 440px; border: 4px solid ${INK}; border-radius: 36px; box-shadow: 10px 10px 0 ${INK}; overflow: hidden; }
    .panel img { width: 100%; height: 100%; object-fit: cover; }
    .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; background: ${card.accent}; }
  </style></head><body>
    <div>
      <div class="label">${icon(card.glyph, card.icon ?? { bg: INK, fill: card.accent }, 40)}${card.label}</div>
      <h1>${card.title}</h1>
      <p>${card.text}</p>
    </div>
    ${side}
    <div class="bar"></div>
  </body></html>`
}

const out = resolve(root, 'public/og')
mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const card of CARDS) {
  for (const [code, copy] of Object.entries(card.copy)) {
    const name = code === 'es' ? card.file : `${card.file}-${code}`
    await page.setContent(html({ ...card, ...copy }), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: resolve(out, `${name}.png`) })
    console.log(`public/og/${name}.png`)
  }
}
await browser.close()
