<template>
  <!-- Miniatura decorativa de las ideas guardadas en Togethrd. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm font-semibold">
        <AppIcon :glyph="APPS[2]!.glyph" fill-class="text-togethrd" size-class="size-6" />
        {{ t('mock.togethrdIdeas') }}
      </div>
      <span class="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-muted">{{ t('mock.togethrdPending') }}</span>
    </div>
    <ul class="mt-3 space-y-2">
      <li v-for="idea in ideas" :key="idea.key" class="flex items-center gap-3 rounded-xl bg-ink/[0.03] p-2">
        <span class="grid size-10 shrink-0 place-items-center rounded-lg text-base" :class="idea.tint"><FontAwesomeIcon :icon="idea.glyph" class="text-ink/60" /></span>
        <span class="min-w-0 flex-1">
          <span class="block text-[10px] font-medium uppercase tracking-wide text-muted">{{ t(`mock.togethrdItems.${idea.key}.kind`) }}</span>
          <span class="block truncate text-xs font-semibold">{{ t(`mock.togethrdItems.${idea.key}.title`) }}</span>
        </span>
        <span class="text-right text-[11px] text-muted">{{ idea.price == null ? t(`mock.togethrdItems.${idea.key}.when`) : money(idea.price) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { faBowlFood, faFilm, faMusic } from '@fortawesome/free-solid-svg-icons'
const ideas = [
  { key: 'ramen', glyph: faBowlFood, tint: 'bg-togethrd/20', price: 18 },
  { key: 'concert', glyph: faMusic, tint: 'bg-ink/5', price: null },
  { key: 'movie', glyph: faFilm, tint: 'bg-ink/5', price: null },
]
</script>
