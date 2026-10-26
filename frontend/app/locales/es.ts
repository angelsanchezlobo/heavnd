/**
 * Textos en español, el idioma de referencia: en.ts y ca.ts tienen que tener exactamente las mismas
 * claves (lo comprueba el tipo Messages). "uno | varios" se elige según params.count en t().
 */
const es = {
  nav: {
    apps: 'Las apps',
    manifesto: 'Manifiesto',
    workshop: 'En el taller',
    skip: 'Saltar al contenido',
  },
  theme: {
    SYSTEM: 'Sistema',
    LIGHT: 'Claro',
    DARK: 'Oscuro',
    change: 'Tema: {theme}. Cambiar',
  },
  language: 'Idioma',
  masthead: {
    edition: 'Edición {year}',
    collection: 'Colección de aplicaciones web',
  },
  hero: {
    titleStart: 'Para lo que decides',
    titleEm: 'cada semana.',
    lede: 'Heavnd es una colección de aplicaciones web pequeñas. Cada una se ocupa de una decisión que se repite —qué comprar, qué comer— y la deja resuelta.',
    cta: 'Conocer las apps',
    secondary: 'Qué viene después',
    indexTitle: 'En esta página',
    nameTitle: 'Sobre el nombre',
    nameText: 'Resolvd, Meald. La -d final es la del participio: la decisión, ya tomada.',
  },
  apps: {
    title: 'Las apps',
    intro: 'Dos, por ahora. Cada una se ocupa de una sola cosa y llega hasta el final con ella.',
    label: 'App {n}',
    problem: 'El problema',
    how: 'Cómo funciona',
    open: 'Abrir {name}',
    resolvd: {
      tagline: 'Decide qué comprar.',
      problem: 'Quieres comprar algo y acabas con diez pestañas abiertas, capturas en el carrete y enlaces en un chat contigo mismo. Cuando toca decidir, ya no sabes cuánto costaba cada cosa ni cuánto te queda.',
      quote: 'Lo que no se compara, se compra por impulso.',
      steps: {
        save: { title: 'Guarda', text: 'Pega el enlace de cualquier tienda, usa el bookmarklet, Compartir en Android o el Atajo de iOS. La imagen, el nombre y el precio se leen solos.' },
        organize: { title: 'Ordena', text: 'Categorías con plantillas y proyectos con presupuesto. Cada producto con precio objetivo, notas, etiquetas y estado.' },
        tournament: { title: 'Elimina', text: 'El torneo «¿qué prefieres?» enfrenta tus opciones de dos en dos hasta que queda una. Con cuadro, camino del campeón e historial.' },
        budget: { title: 'Cuadra', text: 'Comprado, favoritos y disponible frente al presupuesto, siempre a la vista antes de pagar.' },
      },
      facts: {
        ways: { value: '4', label: 'formas de guardar un producto' },
        states: { value: '4', label: 'estados: considerando, favorito, descartado y comprado' },
        champion: { value: '1', label: 'campeón por torneo' },
      },
    },
    meald: {
      tagline: 'Planifica qué comer.',
      problem: 'Cada semana, la misma pregunta. Las recetas están repartidas por diez webs, la lista de la compra en un papel y nadie sabe cuánto cuesta de verdad una semana de comida.',
      quote: 'Cocina una vez, come dos.',
      steps: {
        recipes: { title: 'Recetas', text: 'A mano o importadas desde la URL de cualquier web de recetas. Raciones escalables y coste por ración.' },
        products: { title: 'Productos reales', text: '«Tomate» es tu ingrediente; «Tomate pera 1 kg, Mercadona» es el producto, con su precio, dado de alta desde la URL del súper.' },
        week: { title: 'La semana', text: 'Plan por comidas del día con sobras, semanas tipo y avisos: recetas largas entre semana, repeticiones, sobras que llegan tarde.' },
        shopping: { title: 'La compra', text: 'Lista generada del plan: cantidades sumadas, envases y coste por supermercado. Se marca lo comprado y se comparte.' },
      },
      facts: {
        leftovers: { value: '2×', label: 'comidas por cada vez que cocinas, con las sobras' },
        perKg: { value: '€/kg', label: 'para sugerir el producto más barato si no eliges uno' },
        prep: { value: '0', label: 'fechas en la semana genérica de meal prep' },
      },
    },
  },
  mock: {
    resolvdQuestion: '¿Qué prefieres?',
    resolvdA: 'Silla Nova',
    resolvdB: 'Silla Ergo',
    resolvdRound: 'Semifinal',
    resolvdBudget: 'Disponible',
    saveUrl: 'tienda.com/silla-nova',
    saveRead: 'Leído de la tienda',
    saveTarget: 'Objetivo',
    saveState: 'Favorito',
    saveTag: 'despacho',
    mealdWeek: 'Esta semana',
    mealdTotal: 'Compra estimada',
    meals: {
      mon: 'Lentejas',
      tue: 'Sobras',
      wed: 'Pasta al pesto',
      thu: 'Sobras',
      fri: 'Pizza casera',
    },
    shoppingTitle: 'Lista de la compra',
    shoppingStore: 'Mercadona',
    shoppingItems: {
      tomato: 'Tomate pera',
      lentils: 'Lentejas pardinas',
      pasta: 'Espaguetis',
      basil: 'Albahaca fresca',
    },
    shoppingTotal: 'Total',
  },
  manifesto: {
    title: 'Manifiesto',
    intro: 'Cinco reglas que cumplen todas las apps de Heavnd. Las de ahora y las que vengan.',
    rules: {
      one: { title: 'Una decisión por app.', text: 'Si una app empieza a hacer de todo, se parte en dos. Lo pequeño se entiende, se mantiene y se termina.' },
      phone: { title: 'Donde surge la decisión.', text: 'Guardar desde la tienda, compartir desde Android, instalar en la pantalla de inicio. Las decisiones no esperan a que estés en el ordenador.' },
      home: { title: 'Cada una, su casa.', text: 'Cuentas y datos separados por app. Usar una no te apunta a las demás.' },
      short: { title: 'Frases cortas.', text: 'Sin pantallas de bienvenida eternas ni textos de relleno. Si algo necesita explicación, tiene su ayuda.' },
      own: { title: 'Infraestructura propia.', text: 'Servidor propio, una base de datos por app y despliegue automático en cada cambio. Nada de piezas prestadas.' },
    },
  },
  workshop: {
    title: 'En el taller',
    intro: 'Lo que viene. Sin fechas: sale cuando está bien hecho.',
    next: 'En camino',
    exploring: 'Explorando',
    resolvd: {
      gallery: 'Galería de fotos por producto',
      compare: 'Comparativa lado a lado',
      priceWatch: 'Vigilancia de precio',
      afterPurchase: 'Seguimiento después de comprar',
      social: 'Listas compartidas con otras personas',
      ai: 'Ayuda con IA para decidir',
    },
    meald: {
      prices: 'Actualizar precios desde la URL del súper',
      pantry: 'Despensa: lo que ya tienes en casa',
      quality: 'Calidad con Open Food Facts: Nutri-Score y NOVA',
    },
    thirdTitle: 'Una tercera app',
    thirdText: 'Hay ideas en la mesa. Cuando una esté a la altura de las otras dos, aparecerá aquí.',
  },
  colophon: {
    title: 'Colofón',
    text: 'Heavnd está hecho con Nuxt y Spring Boot, guarda los datos en PostgreSQL y se sirve desde un servidor propio. Los titulares están compuestos en Fraunces; el texto, en la fuente de tu sistema.',
    languages: 'En español, English y català.',
    rights: '© {year} Heavnd',
    top: 'Volver arriba',
  },
}

type Stringify<T> = { [K in keyof T]: T[K] extends string ? string : Stringify<T[K]> }
export type Messages = Stringify<typeof es>

export default es
