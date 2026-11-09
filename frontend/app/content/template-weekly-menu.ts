import type { Subpage } from './types'

// Plantilla descargable: atrae enlaces (blogs de organización, crianza, ahorro) y lleva a Meald.
// Descarga directa, sin registro. Los PDF los genera scripts/templates.mjs en public/descargas/.
export const templateWeeklyMenu: Subpage = {
  id: 'template-weekly-menu',
  kind: 'template',
  app: 'meald',
  image: 'meald',
  datePublished: '2026-11-09',
  dateModified: '2026-11-09',
  related: ['meald-weekly-menu', 'meald', 'choosd-christmas'],
  copy: {
    es: {
      title: 'Plantilla de menú semanal para imprimir (PDF gratis)',
      ogTitle: 'Plantilla de menú semanal gratis en PDF',
      description: 'Descarga gratis la plantilla de menú semanal en PDF: siete días, cuatro comidas y lista de la compra. Sin registro. O hazlo online y que la lista salga sola.',
      short: 'Plantilla de menú semanal',
      h1: 'Plantilla de menú semanal para imprimir, gratis',
      lede: 'Una hoja A4 con los siete días, desayuno, comida, merienda y cena, y al lado la lista de la compra. Descárgala, imprímela y ponla en la nevera.',
      answer: 'La plantilla es un PDF A4 apaisado con una cuadrícula de lunes a domingo por desayuno, comida, merienda y cena, una columna para la lista de la compra y un hueco para notas y sobras. Se descarga gratis, sin registro y sin correo.',
      blocks: [
        {
          h2: 'Cómo usar la plantilla',
          steps: [
            { title: 'Revisa lo que hay en casa', text: 'Antes de planificar, mira la nevera y la despensa. Apunta en «Notas y sobras» lo que conviene gastar primero.' },
            { title: 'Rellena las cenas primero', text: 'Suelen ser lo que más cuesta decidir. Después, las comidas, y por último desayunos y meriendas, que se repiten más.' },
            { title: 'Aprovecha las sobras', text: 'Si cocinas doble el lunes, apunta esa comida también el martes. Una receta, dos días.' },
            { title: 'Saca la lista de la compra', text: 'Recorre la semana receta a receta y anota en la columna de la derecha lo que falta. Marca la casilla al meterlo en el carro.' },
          ],
        },
        {
          h2: 'Consejos para que el menú se cumpla',
          list: [
            'Deja un hueco libre a la semana para improvisar o comer fuera.',
            'Pon las recetas largas en fin de semana y las rápidas entre semana.',
            'Repite lo que funciona: tres o cuatro semanas tipo cubren casi todo el año.',
            'Cocina una base (arroz, legumbre, verdura asada) el domingo y combínala en varios platos.',
            'Guarda las hojas de semanas que te gustaron: son tus menús para repetir.',
          ],
        },
        {
          h2: 'Si la quieres sin papel',
          paragraphs: [
            'Meald hace lo mismo que la plantilla, pero la lista de la compra se genera sola a partir del menú, con las cantidades sumadas, sin lo que ya tienes en casa y con el precio de tu supermercado. Las sobras cuentan como comidas y puedes guardar semanas tipo para repetirlas.',
            'Es gratis y funciona en el navegador del móvil y del ordenador.',
          ],
        },
      ],
      faq: [
        { q: '¿Tengo que dejar mi correo para descargarla?', a: 'No. El enlace descarga el PDF directamente, sin registro.' },
        { q: '¿En qué tamaño se imprime?', a: 'En A4 horizontal. Si tu impresora lo pide, elige «Ajustar a la página».' },
        { q: '¿Puedo usarla en clase, en el trabajo o en mi blog?', a: 'Sí, para uso personal y para compartirla, enlazando a esta página. No la vendas.' },
        { q: '¿Hay versión en catalán o en inglés?', a: 'Sí. Cambia el idioma de esta página arriba a la derecha y descargarás la plantilla en ese idioma.' },
      ],
      cta: { title: '¿Y si la lista saliera sola?', text: 'Hazlo en Meald: menú semanal, sobras y lista de la compra con precios. Gratis.', button: 'Probar Meald gratis' },
      download: { href: '/descargas/plantilla-menu-semanal.pdf', button: 'Descargar PDF', note: 'PDF · A4 horizontal · 1 página · Sin registro' },
    },
    en: {
      title: 'Printable weekly meal plan template (free PDF)',
      ogTitle: 'Free weekly meal plan template (PDF)',
      description: 'Download a free printable weekly meal plan template: seven days, four meals and a shopping list. No sign-up. Or plan online and get the list built for you.',
      short: 'Weekly meal plan template',
      h1: 'Free printable weekly meal plan template',
      lede: 'One A4 sheet with the seven days, breakfast, lunch, snack and dinner, and a shopping list alongside. Download it, print it and stick it on the fridge.',
      answer: 'The template is a landscape A4 PDF with a Monday-to-Sunday grid for breakfast, lunch, snack and dinner, a shopping list column and space for notes and leftovers. It’s a free download, with no sign-up and no email.',
      blocks: [
        {
          h2: 'How to use the template',
          steps: [
            { title: 'Check what you have', text: 'Before planning, look in the fridge and pantry. Write what needs using up first under “Notes and leftovers”.' },
            { title: 'Fill in dinners first', text: 'They’re usually the hardest to decide. Then lunches, and finally breakfasts and snacks, which repeat more.' },
            { title: 'Use your leftovers', text: 'If you cook double on Monday, write that meal on Tuesday too. One recipe, two days.' },
            { title: 'Write the shopping list', text: 'Go through the week recipe by recipe and note what’s missing in the right-hand column. Tick the box as it goes in the trolley.' },
          ],
        },
        {
          h2: 'Tips to stick to the plan',
          list: [
            'Leave one slot free each week to improvise or eat out.',
            'Put long recipes at the weekend and quick ones on weekdays.',
            'Repeat what works: three or four template weeks cover most of the year.',
            'Cook a base (rice, pulses, roast veg) on Sunday and use it in several dishes.',
            'Keep the sheets of weeks you liked: they’re menus to repeat.',
          ],
        },
        {
          h2: 'If you’d rather go paperless',
          paragraphs: [
            'Meald does the same as the template, but the shopping list builds itself from the plan, with quantities added up, minus what you have at home and with your supermarket’s prices. Leftovers count as meals and you can save template weeks to reuse.',
            'It’s free and works in your phone or computer browser.',
          ],
        },
      ],
      faq: [
        { q: 'Do I have to give my email to download it?', a: 'No. The link downloads the PDF directly, with no sign-up.' },
        { q: 'What size does it print at?', a: 'Landscape A4. If your printer asks, choose “Fit to page”. It also prints fine on US Letter.' },
        { q: 'Can I use it in class, at work or on my blog?', a: 'Yes, for personal use and to share it, linking to this page. Please don’t sell it.' },
        { q: 'Is there a Spanish or Catalan version?', a: 'Yes. Switch this page’s language at the top right and you’ll download the template in that language.' },
      ],
      cta: { title: 'What if the list wrote itself?', text: 'Do it in Meald: weekly plan, leftovers and a shopping list with prices. Free.', button: 'Try Meald for free' },
      download: { href: '/descargas/weekly-meal-plan-template.pdf', button: 'Download PDF', note: 'PDF · Landscape A4 · 1 page · No sign-up' },
    },
    ca: {
      title: 'Plantilla de menú setmanal per imprimir (PDF gratis)',
      ogTitle: 'Plantilla de menú setmanal gratis en PDF',
      description: 'Descarrega gratis la plantilla de menú setmanal en PDF: set dies, quatre àpats i llista de la compra. Sense registre. O fes-ho en línia i la llista surt sola.',
      short: 'Plantilla de menú setmanal',
      h1: 'Plantilla de menú setmanal per imprimir, gratis',
      lede: 'Un full A4 amb els set dies, esmorzar, dinar, berenar i sopar, i al costat la llista de la compra. Descarrega-la, imprimeix-la i posa-la a la nevera.',
      answer: 'La plantilla és un PDF A4 apaïsat amb una quadrícula de dilluns a diumenge per esmorzar, dinar, berenar i sopar, una columna per a la llista de la compra i un espai per a notes i sobres. Es descarrega gratis, sense registre i sense correu.',
      blocks: [
        {
          h2: 'Com fer servir la plantilla',
          steps: [
            { title: 'Mira què hi ha a casa', text: 'Abans de planificar, revisa la nevera i el rebost. Apunta a «Notes i sobres» el que convé gastar primer.' },
            { title: 'Omple primer els sopars', text: 'Solen ser el que costa més de decidir. Després els dinars, i al final esmorzars i berenars, que es repeteixen més.' },
            { title: 'Aprofita les sobres', text: 'Si cuines doble el dilluns, apunta aquell àpat també el dimarts. Una recepta, dos dies.' },
            { title: 'Treu la llista de la compra', text: 'Repassa la setmana recepta a recepta i anota a la columna de la dreta el que falta. Marca la casella quan ho posis al carro.' },
          ],
        },
        {
          h2: 'Consells perquè el menú es compleixi',
          list: [
            'Deixa un forat lliure a la setmana per improvisar o menjar fora.',
            'Posa les receptes llargues el cap de setmana i les ràpides entre setmana.',
            'Repeteix el que funciona: tres o quatre setmanes tipus cobreixen gairebé tot l’any.',
            'Cuina una base (arròs, llegums, verdura al forn) el diumenge i combina-la en diversos plats.',
            'Guarda els fulls de les setmanes que t’han agradat: són menús per repetir.',
          ],
        },
        {
          h2: 'Si la vols sense paper',
          paragraphs: [
            'Meald fa el mateix que la plantilla, però la llista de la compra es genera sola a partir del menú, amb les quantitats sumades, sense el que ja tens a casa i amb el preu del teu supermercat. Les sobres compten com a àpats i pots desar setmanes tipus per repetir-les.',
            'És gratis i funciona al navegador del mòbil i de l’ordinador.',
          ],
        },
      ],
      faq: [
        { q: 'He de deixar el meu correu per descarregar-la?', a: 'No. L’enllaç descarrega el PDF directament, sense registre.' },
        { q: 'En quina mida s’imprimeix?', a: 'En A4 horitzontal. Si la impressora ho demana, tria «Ajusta a la pàgina».' },
        { q: 'La puc fer servir a classe, a la feina o al meu blog?', a: 'Sí, per a ús personal i per compartir-la, enllaçant a aquesta pàgina. No la venguis.' },
        { q: 'Hi ha versió en castellà o en anglès?', a: 'Sí. Canvia l’idioma d’aquesta pàgina a dalt a la dreta i descarregaràs la plantilla en aquell idioma.' },
      ],
      cta: { title: 'I si la llista sortís sola?', text: 'Fes-ho a Meald: menú setmanal, sobres i llista de la compra amb preus. Gratis.', button: 'Provar Meald gratis' },
      download: { href: '/descargas/plantilla-menu-setmanal.pdf', button: 'Descarregar PDF', note: 'PDF · A4 horitzontal · 1 pàgina · Sense registre' },
    },
  },
}
