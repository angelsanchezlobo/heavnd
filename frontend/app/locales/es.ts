/**
 * Textos en español, el idioma de referencia: en.ts y ca.ts tienen que tener exactamente las mismas
 * claves (lo comprueba el tipo Messages). "uno | varios" se elige según params.count en t().
 */
const es = {
  nav: {
    apps: 'Apps',
    principles: 'Cómo están hechas',
    skip: 'Saltar al contenido',
  },
  theme: {
    SYSTEM: 'Sistema',
    LIGHT: 'Claro',
    DARK: 'Oscuro',
    change: 'Tema: {theme}. Cambiar',
  },
  language: 'Idioma',
  hero: {
    eyebrow: 'Aplicaciones web propias',
    titleStart: 'Apps pequeñas para las decisiones de',
    titleEnd: 'cada día.',
    lead: 'Heavnd reúne aplicaciones que hacen una cosa y la hacen bien. Qué comprar. Qué comer. Sin ruido.',
    cta: 'Ver las apps',
    count: '{count} app en marcha | {count} apps en marcha',
  },
  apps: {
    eyebrow: 'Las apps',
    title: 'Una para cada decisión.',
    open: 'Abrir {name}',
    soonTitle: 'La siguiente, en camino.',
    soonText: 'Cuando haya otra decisión que merezca su propia app, aparecerá aquí.',
    resolvd: {
      tagline: 'Decide qué comprar.',
      description: 'Reúne los productos que estás pensando comprar, compáralos y elige sin pasarte del presupuesto.',
      features: {
        save: 'Guarda desde cualquier tienda: enlace, bookmarklet o Compartir',
        tournament: 'Torneo «¿qué prefieres?» hasta quedarte con uno',
        budget: 'Proyectos con presupuesto y lo que te queda disponible',
      },
    },
    meald: {
      tagline: 'Planifica qué comer.',
      description: 'Tus recetas, tu plan semanal y tu lista de la compra, con productos reales del súper y sus precios.',
      features: {
        recipes: 'Recetas a mano o importadas desde una URL',
        plan: 'Plan semanal con sobras: cocina una vez, come dos',
        shopping: 'Lista de la compra con cantidades sumadas y coste',
      },
    },
  },
  mock: {
    resolvdQuestion: '¿Qué prefieres?',
    resolvdA: 'Silla Nova',
    resolvdB: 'Silla Ergo',
    resolvdRound: 'Semifinal',
    resolvdBudget: 'Disponible',
    mealdWeek: 'Esta semana',
    mealdTotal: 'Compra estimada',
    meals: {
      mon: 'Lentejas',
      tue: 'Sobras',
      wed: 'Pasta al pesto',
      thu: 'Sobras',
      fri: 'Pizza casera',
    },
  },
  principles: {
    eyebrow: 'Cómo están hechas',
    title: 'Pocas piezas, bien encajadas.',
    focus: {
      title: 'Una cosa, bien hecha',
      text: 'Cada app resuelve un problema concreto. Nada de suites que lo hacen todo a medias.',
    },
    independent: {
      title: 'Independientes',
      text: 'Cada app tiene su propia cuenta y sus datos. Usas solo la que necesitas.',
    },
    installable: {
      title: 'Instalables',
      text: 'Se añaden a la pantalla de inicio y reciben enlaces desde Compartir en Android.',
    },
    yours: {
      title: 'A tu manera',
      text: 'En español, inglés o catalán. Tema claro, oscuro o el del sistema. Tu moneda.',
    },
  },
  footer: {
    tagline: 'Apps pequeñas para decisiones de cada día.',
    rights: '© {year} Heavnd',
  },
}

type Stringify<T> = { [K in keyof T]: T[K] extends string ? string : Stringify<T[K]> }
export type Messages = Stringify<typeof es>

export default es
