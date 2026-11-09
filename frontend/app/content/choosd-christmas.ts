import type { Subpage } from './types'

// Caso de uso de temporada: se busca de noviembre a enero. Todo lo que dice es lo que hace Choosd hoy
// (plantilla «Prepara la Navidad» del 1 de noviembre al 6 de enero, reservas sin cuenta, el dueño no ve quién).
export const choosdChristmas: Subpage = {
  id: 'choosd-christmas',
  kind: 'feature',
  app: 'choosd',
  image: 'choosd',
  datePublished: '2026-11-09',
  dateModified: '2026-11-09',
  related: ['choosd', 'meald-weekly-menu', 'template-weekly-menu'],
  copy: {
    es: {
      title: 'Lista de regalos de Navidad online y gratis | Choosd',
      ogTitle: 'Tu lista de regalos de Navidad, sin regalos repetidos',
      description: 'Haz tu lista de regalos de Navidad o Reyes con productos de cualquier tienda. Tu familia reserva sin cuenta y nadie repite regalo. Gratis.',
      short: 'Lista de regalos de Navidad',
      h1: 'Lista de regalos de Navidad y Reyes, sin regalos repetidos',
      lede: 'Guarda lo que te gustaría que te regalen, de cualquier tienda, y manda un enlace. Quien lo abra reserva lo que va a regalar sin crear cuenta, y el resto ve que ya está cogido.',
      answer: 'En Choosd creas una categoría con la plantilla de Navidad, añades productos pegando el enlace de cualquier tienda y activas la lista de regalos. Compartes el enlace: tu familia reserva sin cuenta, nadie repite regalo y tú no ves quién ha cogido qué. Es gratis.',
      blocks: [
        {
          h2: 'Cómo hacer tu lista en cinco minutos',
          steps: [
            { title: 'Empieza con la plantilla de Navidad', text: 'Del 1 de noviembre al 6 de enero, la portada de Choosd te propone «Prepara la Navidad»: una categoría para lo que te gustaría que te regalen, ya preparada para compartirla con la familia.' },
            { title: 'Añade lo que te gusta, de cualquier tienda', text: 'Pega el enlace del producto y se leen solos el nombre, la foto y el precio. Funciona con casi todas las tiendas; si alguna no deja leerlo, lo escribes a mano en unos segundos.' },
            { title: 'Activa la lista de regalos', text: 'En la categoría pulsa «Compartir» y activa «Lista de regalos». Choosd genera un enlace público.' },
            { title: 'Manda el enlace', text: 'Por WhatsApp, por correo o al grupo de la familia. Quien lo abra ve tu lista y pulsa «Lo regalo yo» en lo que vaya a comprar.' },
          ],
        },
        {
          h2: 'Sin regalos repetidos y sin perder la sorpresa',
          paragraphs: [
            'Cuando alguien reserva un regalo, el resto de invitados ve que ya está cogido y elige otro. Así se acaban los dos pijamas iguales y las tres colonias.',
            'Tú no ves quién ha reservado qué. Si quieres saber cómo va, puedes mirar cuántos regalos hay reservados, pero nunca de quién es cada uno.',
          ],
        },
        {
          h2: 'Choosd frente a otras formas de hacer la lista',
          table: {
            head: ['', 'Choosd', 'Lista de una tienda', 'Nota en el móvil o chat'],
            rows: [
              ['Productos de cualquier tienda', 'Sí', 'Solo de esa tienda', 'Sí, pero sin foto ni precio'],
              ['Los invitados necesitan cuenta', 'No', 'A veces', 'No'],
              ['Evita regalos repetidos', 'Sí, con reservas', 'Sí', 'No'],
              ['Mantiene la sorpresa', 'Sí: no ves quién reserva', 'Depende de la tienda', 'No'],
              ['Precio', 'Gratis', 'Gratis', 'Gratis'],
            ],
          },
        },
        {
          h2: 'Ideas para que la lista funcione',
          list: [
            'Pon productos de precios distintos: así cada persona encuentra algo que encaja con lo que quiere gastar.',
            'Añade una nota cuando importe la talla, el color o el modelo exacto.',
            'Haz una lista por persona si organizas la de los niños: una categoría para cada uno.',
            'Si algo deja de interesarte, bórralo antes de que alguien lo reserve.',
            'Después de Reyes, vuelve a usar la categoría para lo que quieras comprarte tú.',
          ],
        },
      ],
      faq: [
        { q: '¿La familia necesita instalar algo o crear cuenta?', a: 'No. Basta con abrir el enlace en el navegador del móvil o del ordenador. Solo necesitas cuenta tú, para hacer la lista.' },
        { q: '¿Puedo ver quién me va a regalar cada cosa?', a: 'No. Ves cuántos regalos hay reservados si lo pides, pero no quién ha cogido cada uno: la sorpresa se mantiene.' },
        { q: '¿Sirve también para Reyes, cumpleaños o una boda?', a: 'Sí. La lista de regalos funciona igual para cualquier ocasión; la plantilla de Navidad solo te ahorra el primer paso en estas fechas.' },
        { q: '¿Cuánto cuesta?', a: 'Nada. El plan gratuito permite tener 2 listas de regalo activas a la vez, suficiente para la tuya y la de otra persona.' },
        { q: '¿Y si cambio el enlace?', a: 'Puedes generar uno nuevo y el anterior deja de funcionar. Las reservas hechas se mantienen.' },
      ],
      cta: { title: 'Haz tu lista de Navidad', text: 'Gratis, desde el navegador y lista para compartir en cinco minutos.', button: 'Crear mi lista gratis' },
    },
    en: {
      title: 'Free online Christmas gift list, no duplicates | Choosd',
      ogTitle: 'Your Christmas gift list, with no duplicate presents',
      description: 'Make your Christmas wish list with products from any shop. Family and friends reserve gifts without an account and nobody buys the same thing. Free.',
      short: 'Christmas gift list',
      h1: 'A Christmas gift list with no duplicate presents',
      lede: 'Save what you’d like to get, from any shop, and send a link. Whoever opens it reserves what they’re buying without signing up, and everyone else sees it’s taken.',
      answer: 'In Choosd you create a category from the Christmas template, add products by pasting a link from any shop and turn on the gift list. Share the link: your family reserves without an account, nobody repeats a gift and you can’t see who took what. It’s free.',
      blocks: [
        {
          h2: 'Make your list in five minutes',
          steps: [
            { title: 'Start from the Christmas template', text: 'From 1 November to 6 January, Choosd’s home suggests “Get ready for Christmas”: a category for what you’d like to receive, ready to share with your family.' },
            { title: 'Add what you like, from any shop', text: 'Paste the product link and the name, photo and price fill in by themselves. It works with almost every shop; if one blocks it, you type it in a few seconds.' },
            { title: 'Turn on the gift list', text: 'In the category tap “Share” and turn on “Gift list”. Choosd creates a public link.' },
            { title: 'Send the link', text: 'By WhatsApp, email or the family group chat. Whoever opens it sees your list and taps “I’ll give this” on what they’ll buy.' },
          ],
        },
        {
          h2: 'No duplicate gifts, and the surprise stays',
          paragraphs: [
            'When someone reserves a gift, the other guests see it’s taken and choose something else. No more two identical jumpers.',
            'You can’t see who reserved what. If you’re curious, you can check how many gifts are reserved, but never who is giving each one.',
          ],
        },
        {
          h2: 'Choosd compared with other ways to make a list',
          table: {
            head: ['', 'Choosd', 'A shop’s registry', 'A note or a chat'],
            rows: [
              ['Products from any shop', 'Yes', 'Only that shop', 'Yes, but no photo or price'],
              ['Guests need an account', 'No', 'Sometimes', 'No'],
              ['Avoids duplicate gifts', 'Yes, with reservations', 'Yes', 'No'],
              ['Keeps the surprise', 'Yes: you don’t see who reserves', 'Depends on the shop', 'No'],
              ['Price', 'Free', 'Free', 'Free'],
            ],
          },
        },
        {
          h2: 'Tips for a list that works',
          list: [
            'Include different price points so everyone finds something that fits their budget.',
            'Add a note when size, colour or the exact model matters.',
            'Making the kids’ lists? Use one category per child.',
            'If you stop wanting something, delete it before someone reserves it.',
            'After the holidays, reuse the category for things you want to buy yourself.',
          ],
        },
      ],
      faq: [
        { q: 'Does my family need to install anything or sign up?', a: 'No. They just open the link in their phone or computer browser. Only you need an account, to make the list.' },
        { q: 'Can I see who is giving me each thing?', a: 'No. You can see how many gifts are reserved if you ask, but not who took each one, so the surprise stays.' },
        { q: 'Does it work for birthdays or a wedding too?', a: 'Yes. The gift list works the same for any occasion; the Christmas template just saves you the first step at this time of year.' },
        { q: 'How much does it cost?', a: 'Nothing. The free plan allows 2 active gift lists at once, enough for yours and someone else’s.' },
        { q: 'What if I change the link?', a: 'You can create a new one and the old one stops working. Existing reservations are kept.' },
      ],
      cta: { title: 'Make your Christmas list', text: 'Free, in your browser and ready to share in five minutes.', button: 'Create my free list' },
    },
    ca: {
      title: 'Llista de regals de Nadal en línia i gratis | Choosd',
      ogTitle: 'La teva llista de regals de Nadal, sense regals repetits',
      description: 'Fes la teva llista de regals de Nadal o Reis amb productes de qualsevol botiga. La família reserva sense compte i ningú repeteix regal. Gratis.',
      short: 'Llista de regals de Nadal',
      h1: 'Llista de regals de Nadal i Reis, sense regals repetits',
      lede: 'Desa el que t’agradaria que et regalessin, de qualsevol botiga, i envia un enllaç. Qui l’obri reserva el que regalarà sense crear compte, i la resta veu que ja està agafat.',
      answer: 'A Choosd crees una categoria amb la plantilla de Nadal, hi afegeixes productes enganxant l’enllaç de qualsevol botiga i actives la llista de regals. Comparteixes l’enllaç: la família reserva sense compte, ningú repeteix regal i tu no veus qui ha agafat què. És gratis.',
      blocks: [
        {
          h2: 'Com fer la llista en cinc minuts',
          steps: [
            { title: 'Comença amb la plantilla de Nadal', text: 'De l’1 de novembre al 6 de gener, la portada de Choosd et proposa «Prepara el Nadal»: una categoria per al que t’agradaria que et regalessin, a punt per compartir amb la família.' },
            { title: 'Afegeix el que t’agrada, de qualsevol botiga', text: 'Enganxa l’enllaç del producte i el nom, la foto i el preu s’omplen sols. Funciona amb gairebé totes les botigues; si alguna no ho permet, ho escrius a mà en uns segons.' },
            { title: 'Activa la llista de regals', text: 'A la categoria prem «Compartir» i activa «Llista de regals». Choosd genera un enllaç públic.' },
            { title: 'Envia l’enllaç', text: 'Per WhatsApp, per correu o al grup de la família. Qui l’obri veu la teva llista i prem «L’hi regalo jo» en el que comprarà.' },
          ],
        },
        {
          h2: 'Sense regals repetits i sense perdre la sorpresa',
          paragraphs: [
            'Quan algú reserva un regal, la resta de convidats veu que ja està agafat i en tria un altre. S’han acabat els dos pijames iguals.',
            'Tu no veus qui ha reservat què. Si vols saber com va, pots mirar quants regals hi ha reservats, però mai de qui és cadascun.',
          ],
        },
        {
          h2: 'Choosd davant d’altres maneres de fer la llista',
          table: {
            head: ['', 'Choosd', 'Llista d’una botiga', 'Nota al mòbil o xat'],
            rows: [
              ['Productes de qualsevol botiga', 'Sí', 'Només d’aquella botiga', 'Sí, però sense foto ni preu'],
              ['Els convidats necessiten compte', 'No', 'De vegades', 'No'],
              ['Evita regals repetits', 'Sí, amb reserves', 'Sí', 'No'],
              ['Manté la sorpresa', 'Sí: no veus qui reserva', 'Depèn de la botiga', 'No'],
              ['Preu', 'Gratis', 'Gratis', 'Gratis'],
            ],
          },
        },
        {
          h2: 'Idees perquè la llista funcioni',
          list: [
            'Posa productes de preus diferents: així cadascú troba alguna cosa que encaixa amb el que vol gastar.',
            'Afegeix una nota quan importi la talla, el color o el model exacte.',
            'Si organitzes la dels nens, fes una categoria per a cadascun.',
            'Si una cosa deixa d’interessar-te, esborra-la abans que algú la reservi.',
            'Després de Reis, torna a fer servir la categoria per al que et vulguis comprar tu.',
          ],
        },
      ],
      faq: [
        { q: 'La família ha d’instal·lar res o crear compte?', a: 'No. N’hi ha prou d’obrir l’enllaç al navegador del mòbil o de l’ordinador. Només necessites compte tu, per fer la llista.' },
        { q: 'Puc veure qui em regalarà cada cosa?', a: 'No. Pots veure quants regals hi ha reservats si ho demanes, però no qui ha agafat cadascun: la sorpresa es manté.' },
        { q: 'Serveix també per a Reis, aniversaris o un casament?', a: 'Sí. La llista de regals funciona igual per a qualsevol ocasió; la plantilla de Nadal només t’estalvia el primer pas en aquestes dates.' },
        { q: 'Quant costa?', a: 'Res. El pla gratuït permet tenir 2 llistes de regals actives alhora, prou per a la teva i la d’una altra persona.' },
        { q: 'I si canvio l’enllaç?', a: 'Pots generar-ne un de nou i l’anterior deixa de funcionar. Les reserves fetes es mantenen.' },
      ],
      cta: { title: 'Fes la teva llista de Nadal', text: 'Gratis, des del navegador i a punt per compartir en cinc minuts.', button: 'Crear la meva llista gratis' },
    },
  },
}
