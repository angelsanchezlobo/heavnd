/** Formateadores que siguen al idioma elegido: se recalculan solos al cambiar locale. */
export function money(amount: number): string {
  return new Intl.NumberFormat(intlTag.value, { style: 'currency', currency: 'EUR' }).format(amount)
}

/** Nombre corto del día de la semana; 0 = lunes. Usa una semana fija para no depender de la fecha actual. */
export function weekdayShort(index: number): string {
  const monday = Date.UTC(2026, 9, 26)
  return new Intl.DateTimeFormat(intlTag.value, { weekday: 'short', timeZone: 'UTC' })
    .format(new Date(monday + index * 86_400_000))
}
