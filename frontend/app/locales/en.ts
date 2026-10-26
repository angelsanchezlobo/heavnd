import type { Messages } from './es'

const en: Messages = {
  nav: {
    apps: 'Apps',
    principles: 'How they are built',
    skip: 'Skip to content',
  },
  theme: {
    SYSTEM: 'System',
    LIGHT: 'Light',
    DARK: 'Dark',
    change: 'Theme: {theme}. Change',
  },
  language: 'Language',
  hero: {
    eyebrow: 'Independent web apps',
    titleStart: 'Small apps for',
    titleEnd: 'everyday decisions.',
    lead: 'Heavnd brings together apps that do one thing and do it well. What to buy. What to eat. No noise.',
    cta: 'See the apps',
    count: '{count} app live | {count} apps live',
  },
  apps: {
    eyebrow: 'The apps',
    title: 'One for each decision.',
    open: 'Open {name}',
    soonTitle: 'The next one is on its way.',
    soonText: 'When another decision deserves its own app, it will show up here.',
    resolvd: {
      tagline: 'Decide what to buy.',
      description: 'Collect the products you are thinking of buying, compare them and choose without going over budget.',
      features: {
        save: 'Save from any shop: link, bookmarklet or Share',
        tournament: '“Which do you prefer?” tournament until one is left',
        budget: 'Projects with a budget and what you still have available',
      },
    },
    meald: {
      tagline: 'Plan what to eat.',
      description: 'Your recipes, your weekly plan and your shopping list, with real supermarket products and prices.',
      features: {
        recipes: 'Recipes typed in or imported from a URL',
        plan: 'Weekly plan with leftovers: cook once, eat twice',
        shopping: 'Shopping list with summed quantities and cost',
      },
    },
  },
  mock: {
    resolvdQuestion: 'Which do you prefer?',
    resolvdA: 'Nova chair',
    resolvdB: 'Ergo chair',
    resolvdRound: 'Semi-final',
    resolvdBudget: 'Available',
    mealdWeek: 'This week',
    mealdTotal: 'Estimated shop',
    meals: {
      mon: 'Lentils',
      tue: 'Leftovers',
      wed: 'Pesto pasta',
      thu: 'Leftovers',
      fri: 'Homemade pizza',
    },
  },
  principles: {
    eyebrow: 'How they are built',
    title: 'Few pieces, well fitted.',
    focus: {
      title: 'One thing, done well',
      text: 'Each app solves a specific problem. No suites that do everything halfway.',
    },
    independent: {
      title: 'Independent',
      text: 'Each app has its own account and its own data. Use only the one you need.',
    },
    installable: {
      title: 'Installable',
      text: 'Add them to your home screen and send them links with Share on Android.',
    },
    yours: {
      title: 'Your way',
      text: 'In Spanish, English or Catalan. Light, dark or system theme. Your currency.',
    },
  },
  footer: {
    tagline: 'Small apps for everyday decisions.',
    rights: '© {year} Heavnd',
  },
}

export default en
