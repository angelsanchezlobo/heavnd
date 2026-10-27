// El idioma lo decide la URL. Se fija antes de renderizar la página, así el HTML prerenderizado
// y la hidratación usan el mismo idioma.
export default defineNuxtRouteMiddleware((to) => {
  locale.value = localeFromPath(to.path)
})
