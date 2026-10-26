<template>
  <article class="card group relative flex flex-col overflow-hidden p-6 sm:p-8">
    <!-- Brillo del acento en la esquina: la única nota de color fuerte de la tarjeta. -->
    <div class="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50" :class="app.accent.bg" />
    <div class="relative flex items-center gap-3">
      <AppIcon :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-12" />
      <div>
        <h3 class="text-xl font-semibold tracking-tight">{{ app.name }}</h3>
        <p class="text-sm text-muted">{{ host }}</p>
      </div>
    </div>
    <p class="relative mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{{ t(`apps.${app.id}.tagline`) }}</p>
    <p class="relative mt-3 text-muted">{{ t(`apps.${app.id}.description`) }}</p>
    <ul class="relative mt-6 space-y-2.5 text-sm">
      <li v-for="feature in app.features" :key="feature" class="flex gap-3">
        <span class="mt-1.5 size-2 shrink-0 rounded-full" :class="app.accent.bg" aria-hidden="true" />
        {{ t(`apps.${app.id}.features.${feature}`) }}
      </li>
    </ul>
    <div class="relative mt-auto pt-8">
      <a :href="app.url" class="btn-primary w-full sm:w-auto">
        {{ t('apps.open', { name: app.name }) }}
        <svg viewBox="0 0 24 24" class="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { HeavndApp } from '~/utils/apps'

const props = defineProps<{ app: HeavndApp }>()
const host = computed(() => new URL(props.app.url).host)
</script>
