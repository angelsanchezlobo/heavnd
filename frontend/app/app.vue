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
            <AppIcon :glyph="HEAVND_GLYPH" size-class="size-10" />
            <p class="display text-5xl">Heavnd</p>
          </div>
          <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li v-for="app in APPS" :key="app.id">
              <NuxtLink :to="localePath(`/${app.id}`)" class="flex items-center gap-2 text-muted hover:text-ink">
                <span class="size-2 rounded-full" :class="app.accent.bg" aria-hidden="true" />
                {{ app.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="md:col-span-7">
          <p class="display text-3xl italic leading-snug text-balance">{{ t('colophon.tagline') }}</p>
          <p class="mt-3 text-sm text-muted">{{ t('colophon.languages') }}</p>
          <ul class="mt-6 space-y-1 text-sm text-muted">
            <li v-for="c in CONTACTS" :key="c.key">
              {{ t(`colophon.${c.key}`) }}
              <a :href="`mailto:${c.email}`" class="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{{ c.email }}</a>
            </li>
            <li>
              <NuxtLink :to="pageLink('contact')" class="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{{ t('colophon.form') }}</NuxtLink>
            </li>
          </ul>
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
import frauncesItalic from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2?url'
import frauncesNormal from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url'
const { restore } = useTheme()

// El HTML llega con tema SYSTEM; al montar se aplica el tema guardado. El idioma ya viene de la URL.
onMounted(restore)

// <html lang> según el idioma de la URL: buscadores, lectores de pantalla y separación de palabras.
useHead({
  htmlAttrs: { lang: locale },
  // Los titulares (el LCP de cada página) van en Fraunces: precargar el subconjunto latino, redonda y
  // cursiva, evita el cambio de fuente tardío. Son los mismos ficheros con hash que referencia el CSS.
  link: [frauncesNormal, frauncesItalic].map(href => ({ rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: 'anonymous' as const })),
})

const year = new Date().getFullYear()

/** Buzones de Heavnd: el general, el de datos personales (derechos RGPD) y el de avisos de seguridad (security.txt). */
const CONTACTS = [
  { key: 'contact', email: 'contact@heavnd.com' },
  { key: 'privacy', email: 'privacy@heavnd.com' },
  { key: 'security', email: 'security@heavnd.com' },
] as const

</script>
