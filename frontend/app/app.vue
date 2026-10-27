<template>
  <div id="top" class="min-h-dvh overflow-x-clip">
    <a href="#main" class="btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">{{ t('nav.skip') }}</a>
    <SiteHeader />

    <main id="main">
      <NuxtPage />
    </main>

    <footer class="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <div class="grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="flex items-center gap-3">
            <AppIcon :glyph="HEAVND_GLYPH" fill-class="text-accent" size-class="size-10" />
            <p class="display text-5xl">Heavnd</p>
          </div>
          <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li v-for="app in APPS" :key="app.id">
              <NuxtLink :to="`/${app.id}`" class="flex items-center gap-2 text-muted hover:text-ink">
                <span class="size-2 rounded-full" :class="app.accent.bg" aria-hidden="true" />
                {{ app.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="md:col-span-7">
          <p class="display text-3xl italic leading-snug text-balance">{{ t('colophon.tagline') }}</p>
          <p class="mt-3 text-sm text-muted">{{ t('colophon.languages') }}</p>
        </div>
      </div>
      <div class="meta mt-12 flex items-center justify-between border-t border-ink/10 pt-4">
        <span>{{ t('colophon.rights', { year }) }}</span>
        <a href="#top" class="hover:text-ink">{{ t('colophon.top') }} <FontAwesomeIcon :icon="faArrowUp" class="ml-1" /></a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
const { restore } = useTheme()

// El HTML llega en español y con tema SYSTEM; al montar se aplican el idioma y el tema guardados.
onMounted(() => {
  restoreLocale()
  restore()
})

// <html lang> según el idioma elegido: lectores de pantalla, corrector y separación de palabras.
useHead({ htmlAttrs: { lang: locale } })

const year = new Date().getFullYear()

</script>
