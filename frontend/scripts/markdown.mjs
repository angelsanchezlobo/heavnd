// Versión Markdown de cada página prerenderizada, para agentes y crawlers de IA (Markdown for Agents).
// Corre después de `nuxt generate` (npm run build): por cada .output/public/**/index.html escribe un
// index.md al lado. nginx lo sirve en la misma URL cuando la petición trae `Accept: text/markdown`;
// sin esa cabecera, se sirve el HTML de siempre.
//
// Solo convierte <main> (sin cabecera, pie ni navegación) y quita lo decorativo (aria-hidden: maquetas,
// iconos). Delante, frontmatter con título, descripción, URL canónica e idioma; detrás, el JSON-LD.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const SITE = 'https://heavnd.com'
const root = resolve(fileURLToPath(new URL('..', import.meta.url)), '.output/public')

const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' })
turndown.use(gfm)
turndown.remove(['script', 'style', 'svg', 'button', 'noscript', 'template'])
// Lo decorativo para lectores de pantalla también lo es para un agente. Como regla propia (y no con
// remove) porque las reglas propias van antes que las de listas: un <li aria-hidden> también se quita.
turndown.addRule('ariaHidden', {
  filter: node => node.getAttribute?.('aria-hidden') === 'true',
  replacement: () => '',
})
// Enlaces internos absolutos: el Markdown se lee fuera de la página.
turndown.addRule('absoluteLinks', {
  filter: node => node.nodeName === 'A' && node.getAttribute('href'),
  replacement(content, node) {
    // Enlaces-tarjeta (varios bloques dentro): texto en una línea y el enlace como párrafo propio.
    const block = /\n/.test(content.trim())
    const text = content.trim().replace(/\s*\n+\s*/g, ' · ')
    if (!text) return ''
    let href = node.getAttribute('href')
    if (href.startsWith('#')) return text
    if (href.startsWith('/')) href = SITE + href
    return block ? `\n\n[${text}](${href})\n\n` : `[${text}](${href})`
  },
})
// Navegación (migas, índice, «sigue leyendo»): en una línea, sin numerar.
turndown.addRule('nav', {
  filter: 'nav',
  replacement: content => `\n\n${content.split('\n').map(line => line.replace(/^\s*(\d+\.|-)\s+/, '').trim()).filter(Boolean).join(' · ')}\n\n`,
})
// Las preguntas (<details>) se leen como pregunta en negrita y respuesta.
turndown.addRule('summary', {
  filter: 'summary',
  replacement: content => `\n\n**${content.trim().replace(/^#+\s*/, '')}**\n\n`,
})

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const attr = (html, re) => decode(html.match(re)?.[1] ?? '')
const yaml = s => JSON.stringify(s)

function convert(html) {
  const title = attr(html, /<title>([^<]*)<\/title>/)
  const description = attr(html, /<meta name="description" content="([^"]*)"/)
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/)
  const lang = attr(html, /<html[^>]*\slang="([^"]*)"/)
  const main = html.match(/<main id="main">([\s\S]*)<\/main>/)?.[1]
  if (!main) return undefined
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1].trim())

  // Sin los comentarios de hidratación de Vue (<!--[-->). Elementos en línea pegados (<span>a</span><span>b</span>) se leerían juntos: «2026 editionA collection».
  const spaced = main.replace(/<!--[\s\S]*?-->/g, '').replace(/<\/(span|a|time)>(?=<(span|a|time)\b)/g, '</$1> ')
  const body = turndown.turndown(spaced).replace(/\n{3,}/g, '\n\n').trim()
  return [
    '---',
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    `url: ${yaml(canonical)}`,
    `lang: ${yaml(lang)}`,
    '---',
    '',
    body,
    ...(jsonLd.length ? ['', '```json', ...jsonLd, '```'] : []),
    '',
  ].join('\n')
}

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (name === '_nuxt') continue
    if (statSync(path).isDirectory()) yield* pages(path)
    else if (name === 'index.html') yield path
  }
}

let count = 0
for (const file of pages(root)) {
  const markdown = convert(readFileSync(file, 'utf8'))
  if (!markdown) continue
  writeFileSync(file.replace(/\.html$/, '.md'), markdown)
  count++
}
console.log(`Markdown: ${count} páginas (${relative(process.cwd(), root)}/**/index.md)`)
