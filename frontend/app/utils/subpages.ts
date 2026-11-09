import { choosdChristmas } from '~/content/choosd-christmas'
import { mealdWeeklyMenu } from '~/content/meald-weekly-menu'
import { templateWeeklyMenu } from '~/content/template-weekly-menu'
import type { HeavndApp } from '~/utils/apps'
import type { Subpage } from '~/content/types'

/** Subpáginas por id (el mismo que en SITE_PAGES de shared/routes.ts). */
export const SUBPAGES: Record<string, Subpage> = Object.fromEntries(
  [choosdChristmas, mealdWeeklyMenu, templateWeeklyMenu].map(page => [page.id, page]),
)

/** Subpáginas de una app, para enlazarlas desde su página (enlazado interno hub → casos de uso). */
export function subpagesOf(app: HeavndApp['id']) {
  return Object.values(SUBPAGES).filter(page => page.app === app)
}
