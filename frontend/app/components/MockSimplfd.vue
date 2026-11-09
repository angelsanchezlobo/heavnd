<template>
  <!-- Miniatura decorativa de la portada de Simplfd: el mes por apartados en la barra segmentada. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center gap-2 text-sm font-semibold">
      <AppIcon :glyph="app.glyph" :fill-class="app.icon.fill" :bg="app.icon.bg" size-class="size-6" />
      {{ t('mock.simplfdSpent') }}
    </div>
    <p class="mt-2 text-3xl font-semibold tracking-tight">{{ money(total) }}</p>
    <div class="mt-3 flex h-4 overflow-hidden rounded-full border border-ink/70">
      <span v-for="s in sections" :key="s.key" class="h-full border-r border-ink/70 last:border-r-0" :style="{ width: `${(s.amount / total) * 100}%`, background: s.color }" />
    </div>
    <ul class="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
      <li v-for="s in sections" :key="s.key" class="flex items-center gap-2">
        <span class="size-2.5 shrink-0 rounded-full border border-ink/60" :style="{ background: s.color }" />
        <span class="flex-1 truncate">{{ t(`mock.simplfdSections.${s.key}`) }}</span>
        <span class="text-muted">{{ money(s.amount) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const app = APPS.find(a => a.id === 'simplfd')!
// Pasteles de los apartados de Simplfd (melocotón, petróleo suave, lavanda, arena).
const sections = [
  { key: 'groceries', amount: 312.4, color: '#ffdcc6' },
  { key: 'home', amount: 185, color: '#cde6e2' },
  { key: 'leisure', amount: 96.3, color: '#e4dcfa' },
  { key: 'coffee', amount: 38.5, color: '#f6e7b9' },
]
const total = sections.reduce((sum, s) => sum + s.amount, 0)
</script>
