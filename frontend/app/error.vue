<template>
  <div class="min-h-dvh overflow-x-clip">
    <SiteHeader />
    <main id="main" class="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
      <p class="meta">{{ error?.statusCode ?? 404 }}</p>
      <h1 class="display mt-4 text-6xl leading-none text-balance sm:text-8xl">{{ t('notFound.title') }}</h1>
      <p class="mt-6 max-w-xl text-lg text-muted text-pretty">{{ t('notFound.text') }}</p>
      <ul class="mt-10 grid gap-4 md:grid-cols-3">
        <li v-for="app in APPS" :key="app.id">
          <NuxtLink :to="localePath(`/${app.id}`)" class="flex items-center gap-4 rounded-3xl p-6" :class="app.accent.tint">
            <AppIcon :glyph="app.glyph" :fill-class="app.icon.fill" :bg="app.icon.bg" size-class="size-12" />
            <span>
              <span class="display block text-3xl">{{ app.name }}</span>
              <span class="text-muted">{{ t(`apps.${app.id}.tagline`) }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink :to="localePath('/')" class="btn-primary mt-10 px-5 py-3 text-base">{{ t('notFound.home') }}</NuxtLink>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

// Página de error (404.html en el prerender, que nginx sirve con estado 404): fuera del índice y con
// enlaces a las páginas que sí existen, para que ni el usuario ni el rastreador se queden sin salida.
defineProps<{ error: NuxtError | null }>()

locale.value = localeFromPath(useRoute().path)
useHead({ htmlAttrs: { lang: locale }, title: () => `${t('notFound.title')} · Heavnd` })
useSeoMeta({ robots: 'noindex, follow' })
</script>
