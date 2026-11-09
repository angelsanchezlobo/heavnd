/**
 * Enlace a una app con su origen en la landing (?ref=heavnd-<página>), para poder medir cuántos
 * registros llegan desde cada página. El parámetro lo ignoran las apps; queda en sus logs y analítica.
 */
export function withRef(url: string, source: string) {
  const target = new URL(url)
  target.searchParams.set('ref', `heavnd-${source}`)
  return target.toString()
}
