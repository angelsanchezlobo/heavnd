// Genera las imágenes Open Graph (1200×630) de la portada y de cada app en public/og/.
// No forma parte del build: se ejecuta a mano cuando cambia un texto o un color, y las PNG se suben al repo.
//
//   node scripts/og-images.mjs
//
// Necesita Playwright con Chromium instalado en la máquina (no es dependencia del proyecto).
// Colores y glifos copiados de assets/css/main.css y utils/apps.ts: si cambian allí, cambian aquí.
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fontDir = resolve(root, 'node_modules/@fontsource-variable/fraunces/files')
const font = name => pathToFileURL(resolve(fontDir, name)).href

const INK = '#111114'
const PAPER = '#f6f5f2'
const MUTED = '#6b6b73'
const BRAND = '#b7a6ff'

const APPS = {
  resolvd: { name: 'Resolvd', accent: '#f5c542', glyph: 'M9 23V9h7.5a4.5 4.5 0 0 1 1.2 8.84L22.5 23h-3.6l-4.3-5H12.4v5zm3.4-8h4a1.8 1.8 0 0 0 0-3.6h-4z' },
  meald: { name: 'Meald', accent: '#9bd36b', glyph: 'M8 23V9h3.2l4.8 7 4.8-7H24v14h-3.3v-8.6L16.9 20h-1.8l-3.8-5.6V23z' },
  togethrd: { name: 'Togethrd', accent: '#e597a9', glyph: 'M8.5 9h15v3.4h-5.8V23h-3.4V12.4H8.5z' },
}
const HEAVND_GLYPH = 'M9 9h3.3v5.4h7.4V9H23v14h-3.3v-5.6h-7.4V23H9z'

const CARDS = [
  {
    file: 'heavnd',
    label: 'Heavnd · heavnd.com',
    glyph: HEAVND_GLYPH,
    accent: BRAND,
    title: 'Para lo que decides <em>cada semana.</em>',
    text: 'Apps pequeñas para decidir qué comprar, qué comer y qué hacer.',
    apps: Object.values(APPS),
  },
  { file: 'resolvd', label: 'Resolvd · heavnd.com', ...APPS.resolvd, title: 'Decide <em>qué comprar.</em>', text: 'Guarda productos de cualquier tienda, compáralos y elige sin pasarte del presupuesto.' },
  { file: 'meald', label: 'Meald · heavnd.com', ...APPS.meald, title: 'Planifica <em>qué comer.</em>', text: 'Tus recetas, tu plan semanal y tu lista de la compra con precios reales del súper.' },
  { file: 'togethrd', label: 'Togethrd · heavnd.com', ...APPS.togethrd, title: 'Recuerda <em>qué hacer.</em>', text: 'Guarda restaurantes, planes y viajes, y no se os olvide ninguno.' },
]

const icon = (glyph, accent, size) =>
  `<svg viewBox="0 0 32 32" width="${size}" height="${size}"><rect width="32" height="32" rx="8" fill="${INK}"/><path d="${glyph}" fill="${accent}"/></svg>`

function html(card) {
  const side = card.apps
    ? `<div class="stack">${card.apps.map(a => `<div class="row" style="background:${a.accent}26">${icon(a.glyph, a.accent, 64)}<span>${a.name}</span></div>`).join('')}</div>`
    : `<div class="panel" style="background:${card.accent}33">${icon(card.glyph, card.accent, 220)}</div>`
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: Fraunces; src: url(${font('fraunces-latin-opsz-normal.woff2')}) format('woff2'); font-weight: 100 900; }
    @font-face { font-family: Fraunces; font-style: italic; src: url(${font('fraunces-latin-opsz-italic.woff2')}) format('woff2'); font-weight: 100 900; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; background: ${PAPER}; color: ${INK}; font-family: ui-sans-serif, system-ui, sans-serif;
      display: grid; grid-template-columns: 1fr 380px; gap: 56px; padding: 64px 72px; position: relative; }
    .label { display: flex; align-items: center; gap: 14px; font: 500 20px ui-monospace, Menlo, monospace; letter-spacing: .14em; text-transform: uppercase; color: ${MUTED}; }
    h1 { margin-top: 44px; font: 500 92px/0.98 Fraunces, serif; letter-spacing: -0.02em; }
    h1 em { font-style: italic; background: linear-gradient(transparent 68%, ${card.accent}b3 68%, ${card.accent}b3 88%, transparent 88%); }
    p { margin-top: 32px; font-size: 30px; line-height: 1.35; color: ${MUTED}; max-width: 640px; }
    .panel { border-radius: 40px; display: grid; place-items: center; }
    .stack { display: flex; flex-direction: column; justify-content: center; gap: 18px; }
    .row { display: flex; align-items: center; gap: 22px; border-radius: 28px; padding: 22px 26px; font: 500 44px Fraunces, serif; }
    .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; background: ${card.accent}; }
  </style></head><body>
    <div>
      <div class="label">${icon(card.glyph, card.accent, 40)}${card.label}</div>
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
  await page.setContent(html(card), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: resolve(out, `${card.file}.png`) })
  console.log(`public/og/${card.file}.png`)
}
await browser.close()
