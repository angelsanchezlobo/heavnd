<template>
  <!-- Miniatura decorativa de un espacio compartido de Simplfd: saldos y pagos para quedar en paz. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center justify-between text-sm font-semibold">
      {{ t('mock.simplfdSpace') }}
      <span class="flex -space-x-1.5">
        <span v-for="p in people" :key="p.name" class="grid size-6 place-items-center rounded-full border border-ink/60 text-[10px] font-semibold text-[#14211f]" :style="{ background: p.color }">{{ p.name[0] }}</span>
      </span>
    </div>
    <ul class="mt-3 divide-y divide-ink/5 text-xs">
      <li v-for="p in people" :key="p.name" class="flex items-center gap-3 py-2">
        <span class="flex-1 font-medium">{{ p.name }}</span>
        <span class="text-muted">{{ p.balance > 0 ? t('mock.simplfdOwed') : t('mock.simplfdOwes') }}</span>
        <span class="w-16 text-right font-semibold" :class="p.balance > 0 ? 'text-simplfd' : ''">{{ money(Math.abs(p.balance)) }}</span>
      </li>
    </ul>
    <p class="meta mt-2">{{ t('mock.simplfdSettle') }}</p>
    <div class="mt-2 flex items-center gap-2 rounded-xl bg-ink/[0.04] px-3 py-2 text-xs">
      <span class="font-medium">{{ people[1]!.name }}</span>
      <FontAwesomeIcon :icon="faArrowRight" class="text-muted" />
      <span class="font-medium">{{ people[0]!.name }}</span>
      <span class="ml-auto font-semibold">{{ money(18.3) }}</span>
      <span class="rounded-full bg-simplfd px-2 py-0.5 text-[10px] font-semibold text-on-simplfd">{{ t('mock.simplfdDone') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
// Saldos de ejemplo: suman cero, como en la app.
const people = computed(() => [
  { name: 'Marta', balance: 42.1, color: '#ffdcc6' },
  { name: t('mock.simplfdYou'), balance: -18.3, color: '#cde6e2' },
  { name: 'Pau', balance: -23.8, color: '#e4dcfa' },
])
</script>
