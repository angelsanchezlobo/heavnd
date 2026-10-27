import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// El CSS de Font Awesome va en nuxt.config con el resto de estilos; si lo inyectara la librería al
// arrancar, los iconos se verían a tamaño completo un instante antes de cargarlo.
config.autoAddCss = false

// Los iconos se importan en cada componente (`:icon="faHeart"`), así el bundle solo lleva los que se usan.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
