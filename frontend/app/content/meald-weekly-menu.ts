import type { Subpage } from './types'

// Caso de uso principal de Meald: «menú semanal» / «planificador de comidas». Todo lo que se cuenta es lo
// que hace la app hoy (plan por comidas, sobras, semanas tipo, semana genérica, lista y despensa, PDF).
export const mealdWeeklyMenu: Subpage = {
  id: 'meald-weekly-menu',
  kind: 'feature',
  app: 'meald',
  image: 'meald',
  datePublished: '2026-11-09',
  dateModified: '2026-11-09',
  related: ['template-weekly-menu', 'meald', 'choosd-christmas'],
  copy: {
    es: {
      title: 'Planificador de menú semanal gratis y online | Meald',
      ogTitle: 'Tu menú semanal, hecho en diez minutos',
      description: 'Organiza el menú de la semana con tus recetas, aprovecha las sobras y genera la lista de la compra con precios del súper. Gratis y desde el navegador.',
      short: 'Planificador de menú semanal',
      h1: 'Planificador de menú semanal con lista de la compra',
      lede: 'Decide una vez a la semana qué vais a comer. Meald coloca tus recetas en los días, cuenta las sobras como comidas y saca la lista de la compra sumada y con precios.',
      answer: 'Meald es un planificador de menú semanal gratuito. Guardas tus recetas (a mano o importadas de webs y TikTok), las repartes por desayuno, comida, merienda y cena, y la lista de la compra se genera sola con cantidades sumadas, sin lo que ya tienes en casa y con el coste por supermercado.',
      blocks: [
        {
          h2: 'Cómo se hace el menú de la semana en Meald',
          steps: [
            { title: 'Junta tus recetas', text: 'Escríbelas o pega el enlace de una web de recetas o de un vídeo de TikTok: los ingredientes, las cantidades y los pasos se rellenan solos.' },
            { title: 'Elige qué comidas planificas', text: 'Desayuno, comida, merienda y cena, o solo las que te interesen. Cada hueco propone recetas según lo que tienes en casa, lo que caduca antes, la variedad y el tiempo, y dice por qué.' },
            { title: 'Cocina una vez, come dos', text: 'Marca una comida como sobras de otra: no se vuelve a cocinar ni a comprar, y las raciones se suman a la receta original.' },
            { title: 'Lleva la lista al súper', text: 'Sale del plan con las cantidades sumadas, envases enteros y el coste por supermercado, descontando lo que hay en la despensa. Se comparte y se marca lo comprado.' },
          ],
        },
        {
          h2: 'Semanas tipo y meal prep',
          paragraphs: [
            'Si repites menús, guarda una semana como plantilla y cópiala cuando quieras. Para el batch cooking del domingo hay una semana genérica sin fechas: la preparas una vez y la reutilizas todas las veces que haga falta.',
            'Meald avisa de lo que no encaja, como una receta larga un martes o la misma comida tres días seguidos, y deja arriba lo de hoy con su botón de cocinar.',
          ],
        },
        {
          h2: 'Lo que cuesta de verdad tu semana',
          paragraphs: [
            'Cada ingrediente puede tener su producto del súper con su precio: «tomate» es el ingrediente, «tomate pera 1 kg» de tu supermercado es el producto. Si no eliges ninguno, Meald sugiere el más barato por kilo.',
            'Con eso ves el coste por ración, por semana y por supermercado antes de salir de casa.',
          ],
        },
        {
          h2: 'Meald o una plantilla en papel',
          table: {
            head: ['', 'Meald', 'Plantilla en papel o PDF'],
            rows: [
              ['Lista de la compra', 'Se genera sola, sumada y por supermercado', 'La escribes tú'],
              ['Sobras y meal prep', 'Cuentan como comidas y no se compran dos veces', 'A mano'],
              ['Lo que hay en casa', 'La despensa lo descuenta y avisa de lo que caduca', 'No'],
              ['Coste de la semana', 'Por ración, semana y supermercado', 'No'],
              ['Compartir con la familia', 'Plan y lista compartidos', 'Foto en el chat'],
              ['Imprimir', 'Recetas, recetario y lista en A4', 'Sí'],
            ],
          },
          paragraphs: ['¿Prefieres el papel? Descarga gratis nuestra plantilla de menú semanal para imprimir.'],
        },
      ],
      faq: [
        { q: '¿Meald es gratis?', a: 'Sí. Todas las funciones del planificador, la lista de la compra, la despensa y el modo cocina son gratis y sin límites pensados para que pagues.' },
        { q: '¿Tengo que instalar una app?', a: 'No. Funciona en el navegador del móvil y del ordenador. Si quieres, la añades a la pantalla de inicio y se abre como una app más.' },
        { q: '¿Puedo compartir el menú con mi pareja o mi familia?', a: 'Sí. El plan de la semana y la lista de la compra se comparten con tu casa.' },
        { q: '¿Qué supermercados tienen precios?', a: 'Mercadona se lee directamente y la mayoría de tiendas online también. En cualquier caso, puedes poner el precio a mano.' },
        { q: '¿Puedo imprimir el menú?', a: 'Puedes imprimir o guardar en PDF cada receta, el recetario completo y la lista de la compra en hojas A4.' },
      ],
      cta: { title: 'Planifica tu próxima semana', text: 'Gratis, sin instalar nada y en español, inglés o catalán.', button: 'Empezar gratis' },
    },
    en: {
      title: 'Free online weekly meal planner | Meald',
      ogTitle: 'Your weekly meal plan, done in ten minutes',
      description: 'Plan your week’s meals with your own recipes, make the most of leftovers and get a shopping list with supermarket prices. Free and in your browser.',
      short: 'Weekly meal planner',
      h1: 'A weekly meal planner with a shopping list',
      lede: 'Decide once a week what you’ll eat. Meald puts your recipes on the days, counts leftovers as meals and gives you a summed-up shopping list with prices.',
      answer: 'Meald is a free weekly meal planner. You save your recipes (typed in or imported from websites and TikTok), place them at breakfast, lunch, snack and dinner, and the shopping list builds itself with quantities added up, minus what you already have at home and with the cost per supermarket.',
      blocks: [
        {
          h2: 'How to plan your week in Meald',
          steps: [
            { title: 'Gather your recipes', text: 'Type them in or paste a link to a recipe website or a TikTok video: ingredients, quantities and steps fill in by themselves.' },
            { title: 'Choose which meals you plan', text: 'Breakfast, lunch, snack and dinner, or only the ones you care about. Each slot suggests recipes based on what you have, what expires first, variety and time, and says why.' },
            { title: 'Cook once, eat twice', text: 'Mark a meal as leftovers of another: it isn’t cooked or bought again, and the servings are added to the original recipe.' },
            { title: 'Take the list to the shop', text: 'It comes from the plan with quantities added up, whole packs and the cost per supermarket, minus what’s in the pantry. Share it and tick off what you buy.' },
          ],
        },
        {
          h2: 'Template weeks and meal prep',
          paragraphs: [
            'If you repeat menus, save a week as a template and copy it whenever you want. For Sunday batch cooking there’s a generic week with no dates: prepare it once and reuse it as often as you like.',
            'Meald warns you about what doesn’t fit, like a long recipe on a Tuesday or the same meal three days running, and keeps today’s meals on top with a cook button.',
          ],
        },
        {
          h2: 'What your week really costs',
          paragraphs: [
            'Each ingredient can have its supermarket product with a price: “tomato” is the ingredient, “plum tomatoes 1 kg” from your shop is the product. If you don’t pick one, Meald suggests the cheapest per kilo.',
            'So you see the cost per serving, per week and per supermarket before you leave home.',
          ],
        },
        {
          h2: 'Meald or a paper template',
          table: {
            head: ['', 'Meald', 'Paper or PDF template'],
            rows: [
              ['Shopping list', 'Built for you, summed up and per supermarket', 'You write it'],
              ['Leftovers and meal prep', 'Count as meals and aren’t bought twice', 'By hand'],
              ['What’s at home', 'The pantry deducts it and flags what expires', 'No'],
              ['Cost of the week', 'Per serving, week and supermarket', 'No'],
              ['Share with the family', 'Shared plan and list', 'A photo in the chat'],
              ['Print', 'Recipes, recipe book and list on A4', 'Yes'],
            ],
          },
          paragraphs: ['Prefer paper? Download our free printable weekly meal plan template.'],
        },
      ],
      faq: [
        { q: 'Is Meald free?', a: 'Yes. The planner, shopping list, pantry and cooking mode are free, with no limits designed to make you pay.' },
        { q: 'Do I need to install an app?', a: 'No. It works in your phone or computer browser. If you like, add it to your home screen and it opens like any other app.' },
        { q: 'Can I share the plan with my partner or family?', a: 'Yes. The week’s plan and the shopping list are shared with your household.' },
        { q: 'Which supermarkets have prices?', a: 'Mercadona is read directly, and most online shops work too. You can always enter the price by hand.' },
        { q: 'Can I print the plan?', a: 'You can print or save as PDF each recipe, the whole recipe book and the shopping list on A4 sheets.' },
      ],
      cta: { title: 'Plan your next week', text: 'Free, nothing to install, in English, Spanish or Catalan.', button: 'Start for free' },
    },
    ca: {
      title: 'Planificador de menú setmanal gratis i en línia | Meald',
      ogTitle: 'El teu menú setmanal, fet en deu minuts',
      description: 'Organitza el menú de la setmana amb les teves receptes, aprofita les sobres i genera la llista de la compra amb preus del súper. Gratis i al navegador.',
      short: 'Planificador de menú setmanal',
      h1: 'Planificador de menú setmanal amb llista de la compra',
      lede: 'Decideix un cop a la setmana què menjareu. Meald col·loca les teves receptes als dies, compta les sobres com a àpats i treu la llista de la compra sumada i amb preus.',
      answer: 'Meald és un planificador de menú setmanal gratuït. Deses les teves receptes (a mà o importades de webs i de TikTok), les reparteixes per esmorzar, dinar, berenar i sopar, i la llista de la compra es genera sola amb les quantitats sumades, sense el que ja tens a casa i amb el cost per supermercat.',
      blocks: [
        {
          h2: 'Com es fa el menú de la setmana a Meald',
          steps: [
            { title: 'Reuneix les teves receptes', text: 'Escriu-les o enganxa l’enllaç d’una web de receptes o d’un vídeo de TikTok: els ingredients, les quantitats i els passos s’omplen sols.' },
            { title: 'Tria quins àpats planifiques', text: 'Esmorzar, dinar, berenar i sopar, o només els que t’interessin. Cada forat proposa receptes segons el que tens a casa, el que caduca abans, la varietat i el temps, i diu per què.' },
            { title: 'Cuina un cop, menja’n dos', text: 'Marca un àpat com a sobres d’un altre: no es torna a cuinar ni a comprar, i les racions se sumen a la recepta original.' },
            { title: 'Porta la llista al súper', text: 'Surt del pla amb les quantitats sumades, envasos sencers i el cost per supermercat, descomptant el que hi ha al rebost. Es comparteix i es marca el que has comprat.' },
          ],
        },
        {
          h2: 'Setmanes tipus i meal prep',
          paragraphs: [
            'Si repeteixes menús, desa una setmana com a plantilla i copia-la quan vulguis. Per al batch cooking del diumenge hi ha una setmana genèrica sense dates: la prepares un cop i la reutilitzes tantes vegades com calgui.',
            'Meald avisa del que no encaixa, com una recepta llarga un dimarts o el mateix àpat tres dies seguits, i deixa a dalt el d’avui amb el botó de cuinar.',
          ],
        },
        {
          h2: 'El que costa de debò la teva setmana',
          paragraphs: [
            'Cada ingredient pot tenir el seu producte del súper amb el preu: «tomàquet» és l’ingredient, «tomàquet pera 1 kg» del teu supermercat és el producte. Si no en tries cap, Meald suggereix el més barat per quilo.',
            'Així veus el cost per ració, per setmana i per supermercat abans de sortir de casa.',
          ],
        },
        {
          h2: 'Meald o una plantilla en paper',
          table: {
            head: ['', 'Meald', 'Plantilla en paper o PDF'],
            rows: [
              ['Llista de la compra', 'Es genera sola, sumada i per supermercat', 'L’escrius tu'],
              ['Sobres i meal prep', 'Compten com a àpats i no es compren dues vegades', 'A mà'],
              ['El que hi ha a casa', 'El rebost ho descompta i avisa del que caduca', 'No'],
              ['Cost de la setmana', 'Per ració, setmana i supermercat', 'No'],
              ['Compartir amb la família', 'Pla i llista compartits', 'Foto al xat'],
              ['Imprimir', 'Receptes, receptari i llista en A4', 'Sí'],
            ],
          },
          paragraphs: ['Prefereixes el paper? Descarrega gratis la nostra plantilla de menú setmanal per imprimir.'],
        },
      ],
      faq: [
        { q: 'Meald és gratis?', a: 'Sí. Totes les funcions del planificador, la llista de la compra, el rebost i el mode cuina són gratis i sense límits pensats perquè paguis.' },
        { q: 'He d’instal·lar una app?', a: 'No. Funciona al navegador del mòbil i de l’ordinador. Si vols, l’afegeixes a la pantalla d’inici i s’obre com una app més.' },
        { q: 'Puc compartir el menú amb la parella o la família?', a: 'Sí. El pla de la setmana i la llista de la compra es comparteixen amb casa teva.' },
        { q: 'Quins supermercats tenen preus?', a: 'Mercadona es llegeix directament i la majoria de botigues en línia també. En qualsevol cas, pots posar el preu a mà.' },
        { q: 'Puc imprimir el menú?', a: 'Pots imprimir o desar en PDF cada recepta, el receptari complet i la llista de la compra en fulls A4.' },
      ],
      cta: { title: 'Planifica la setmana que ve', text: 'Gratis, sense instal·lar res i en català, castellà o anglès.', button: 'Començar gratis' },
    },
  },
}
