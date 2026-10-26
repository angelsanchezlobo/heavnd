import type { Messages } from './es'

const ca: Messages = {
  nav: {
    apps: 'Apps',
    principles: 'Com estan fetes',
    skip: 'Salta al contingut',
  },
  theme: {
    SYSTEM: 'Sistema',
    LIGHT: 'Clar',
    DARK: 'Fosc',
    change: 'Tema: {theme}. Canvia',
  },
  language: 'Idioma',
  hero: {
    eyebrow: 'Aplicacions web pròpies',
    titleStart: 'Apps petites per a les decisions de',
    titleEnd: 'cada dia.',
    lead: 'Heavnd reuneix aplicacions que fan una cosa i la fan bé. Què comprar. Què menjar. Sense soroll.',
    cta: 'Mira les apps',
    count: '{count} app en marxa | {count} apps en marxa',
  },
  apps: {
    eyebrow: 'Les apps',
    title: 'Una per a cada decisió.',
    open: 'Obre {name}',
    soonTitle: 'La següent, de camí.',
    soonText: 'Quan hi hagi una altra decisió que mereixi la seva pròpia app, apareixerà aquí.',
    resolvd: {
      tagline: 'Decideix què comprar.',
      description: 'Reuneix els productes que penses comprar, compara’ls i tria sense passar-te del pressupost.',
      features: {
        save: 'Desa des de qualsevol botiga: enllaç, bookmarklet o Comparteix',
        tournament: 'Torneig «què prefereixes?» fins a quedar-te’n amb un',
        budget: 'Projectes amb pressupost i el que et queda disponible',
      },
    },
    meald: {
      tagline: 'Planifica què menjar.',
      description: 'Les teves receptes, el teu pla setmanal i la teva llista de la compra, amb productes reals del súper i els seus preus.',
      features: {
        recipes: 'Receptes a mà o importades des d’una URL',
        plan: 'Pla setmanal amb sobres: cuina un cop, menja’n dos',
        shopping: 'Llista de la compra amb quantitats sumades i cost',
      },
    },
  },
  mock: {
    resolvdQuestion: 'Què prefereixes?',
    resolvdA: 'Cadira Nova',
    resolvdB: 'Cadira Ergo',
    resolvdRound: 'Semifinal',
    resolvdBudget: 'Disponible',
    mealdWeek: 'Aquesta setmana',
    mealdTotal: 'Compra estimada',
    meals: {
      mon: 'Llenties',
      tue: 'Sobres',
      wed: 'Pasta al pesto',
      thu: 'Sobres',
      fri: 'Pizza casolana',
    },
  },
  principles: {
    eyebrow: 'Com estan fetes',
    title: 'Poques peces, ben encaixades.',
    focus: {
      title: 'Una cosa, ben feta',
      text: 'Cada app resol un problema concret. Res de suites que ho fan tot a mitges.',
    },
    independent: {
      title: 'Independents',
      text: 'Cada app té el seu propi compte i les seves dades. Fas servir només la que necessites.',
    },
    installable: {
      title: 'Instal·lables',
      text: 'S’afegeixen a la pantalla d’inici i reben enllaços des de Comparteix a Android.',
    },
    yours: {
      title: 'A la teva manera',
      text: 'En castellà, anglès o català. Tema clar, fosc o el del sistema. La teva moneda.',
    },
  },
  footer: {
    tagline: 'Apps petites per a decisions de cada dia.',
    rights: '© {year} Heavnd',
  },
}

export default ca
