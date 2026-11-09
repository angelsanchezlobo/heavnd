// Genera las plantillas descargables en PDF (public/descargas/). Como og-images.mjs, no forma parte del
// build: se ejecuta a mano cuando cambia el diseño o un texto, y los PDF se suben al repo.
//
//   node scripts/templates.mjs
//
// Necesita Playwright con Chromium instalado en la máquina (no es dependencia del proyecto).
// Los nombres de fichero tienen que coincidir con download.href de app/content/template-weekly-menu.ts.
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fontDir = resolve(root, 'node_modules/@fontsource-variable/fraunces/files')
// En data URI: Chromium no carga ficheros file:// en una página creada con setContent.
const font = name => `data:font/woff2;base64,${readFileSync(resolve(fontDir, name)).toString('base64')}`
const out = resolve(root, 'public/descargas')

const MENU = {
  es: {
    file: 'plantilla-menu-semanal.pdf',
    title: 'Menú semanal',
    week: 'Semana del',
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    meals: ['Desayuno', 'Comida', 'Merienda', 'Cena'],
    shopping: 'Lista de la compra',
    notes: 'Notas y sobras',
    footer: 'Hazlo online gratis y que la lista se rellene sola: heavnd.com/meald',
  },
  en: {
    file: 'weekly-meal-plan-template.pdf',
    title: 'Weekly meal plan',
    week: 'Week of',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    meals: ['Breakfast', 'Lunch', 'Snack', 'Dinner'],
    shopping: 'Shopping list',
    notes: 'Notes and leftovers',
    footer: 'Do it online for free and let the list fill itself: heavnd.com/en/meald',
  },
  ca: {
    file: 'plantilla-menu-setmanal.pdf',
    title: 'Menú setmanal',
    week: 'Setmana del',
    days: ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'],
    meals: ['Esmorzar', 'Dinar', 'Berenar', 'Sopar'],
    shopping: 'Llista de la compra',
    notes: 'Notes i sobres',
    footer: 'Fes-ho en línia gratis i que la llista s’ompli sola: heavnd.com/ca/meald',
  },
}

const INK = '#111114'
const MEALD = '#9bd36b'

function html(m) {
  const head = `<th></th>${m.days.map(d => `<th>${d}</th>`).join('')}`
  const rows = m.meals.map(meal => `<tr><th class="meal">${meal}</th>${m.days.map(() => '<td></td>').join('')}</tr>`).join('')
  const lines = n => Array.from({ length: n }, () => '<div class="line"><span class="box"></span></div>').join('')
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: Fraunces; src: url(${font('fraunces-latin-opsz-normal.woff2')}) format('woff2'); font-weight: 100 900; }
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; width: 297mm; height: 210mm; padding: 11mm 12mm 9mm; font: 9.5pt/1.3 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: ${INK}; display: flex; flex-direction: column; }
    header { display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1.5pt solid ${INK}; padding-bottom: 3mm; }
    h1 { font: 500 26pt/1 Fraunces, Georgia, serif; margin: 0; letter-spacing: -0.02em; }
    h1 span { display: inline-block; width: 9mm; height: 2.4mm; background: ${MEALD}; border-radius: 2mm; margin-left: 3mm; vertical-align: middle; }
    .week { font-size: 10pt; color: #555; }
    .week b { display: inline-block; width: 45mm; border-bottom: 0.6pt solid #999; margin-left: 2mm; }
    main { flex: 1; display: grid; grid-template-columns: 1fr 58mm; gap: 6mm; margin-top: 5mm; min-height: 0; }
    table { width: 100%; height: 100%; border-collapse: collapse; table-layout: fixed; }
    thead th { font-weight: 600; font-size: 9pt; text-align: left; padding: 0 2mm 2mm; text-transform: uppercase; letter-spacing: 0.06em; }
    th.meal { width: 20mm; text-align: left; font-weight: 600; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.06em; vertical-align: top; padding: 2mm 2mm 0 0; }
    thead th:first-child { width: 20mm; }
    td { border: 0.6pt solid #bbb; }
    aside { display: flex; flex-direction: column; gap: 5mm; min-height: 0; }
    aside section { border: 0.6pt solid #bbb; border-radius: 3mm; padding: 3mm 4mm; }
    aside section.list { flex: 1; }
    aside h2 { font: 500 13pt/1 Fraunces, Georgia, serif; margin: 0 0 2mm; }
    .line { height: 6.6mm; border-bottom: 0.5pt solid #ccc; display: flex; align-items: center; }
    .box { width: 3mm; height: 3mm; border: 0.6pt solid #888; border-radius: 0.6mm; }
    footer { margin-top: 4mm; font-size: 8pt; color: #666; display: flex; justify-content: space-between; }
  </style></head><body>
    <header><h1>${m.title}<span></span></h1><p class="week">${m.week}<b>&nbsp;</b></p></header>
    <main>
      <table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>
      <aside>
        <section class="list"><h2>${m.shopping}</h2>${lines(16)}</section>
        <section><h2>${m.notes}</h2>${lines(4).replaceAll('<span class="box"></span>', '')}</section>
      </aside>
    </main>
    <footer><span>Meald · Heavnd</span><span>${m.footer}</span></footer>
  </body></html>`
}

mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage()
for (const m of Object.values(MENU)) {
  await page.setContent(html(m), { waitUntil: 'networkidle' })
  await page.pdf({ path: resolve(out, m.file), format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true })
  console.log(`public/descargas/${m.file}`)
}
await browser.close()
