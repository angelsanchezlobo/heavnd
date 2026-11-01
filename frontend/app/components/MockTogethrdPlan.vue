<template>
  <!-- Miniatura decorativa de un plan de Sorpréndeme: paradas en orden, unidas por la ruta. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center justify-between gap-2">
      <p class="text-sm font-semibold"><FontAwesomeIcon :icon="faWandMagicSparkles" class="mr-1 text-togethrd" /> {{ t('mock.togethrdPlan') }}</p>
      <span class="rounded-full bg-togethrd/15 px-2 py-0.5 text-[11px] font-medium text-togethrd">{{ t('mock.togethrdPlanWhen') }}</span>
    </div>
    <ol class="mt-3">
      <li v-for="(stop, i) in stops" :key="stop.key" class="relative flex gap-3 pb-3 last:pb-0">
        <span v-if="i < stops.length - 1" class="absolute top-5 bottom-0 left-[9px] border-l-2 border-dotted border-togethrd" />
        <span class="z-10 grid size-5 shrink-0 place-items-center rounded-full bg-togethrd text-[10px] font-bold text-on-togethrd">{{ i + 1 }}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-[10px] text-muted">{{ t(`mock.togethrdStops.${stop.key}.kind`) }}</span>
          <span class="block truncate text-xs font-semibold">{{ t(`mock.togethrdStops.${stop.key}.title`) }}</span>
        </span>
        <span class="shrink-0 text-[11px] text-muted">{{ stop.time }}</span>
      </li>
    </ol>
    <div class="mt-3 flex items-center justify-between border-t border-ink/10 pt-2.5 text-[11px]">
      <span class="text-muted">{{ t('mock.togethrdPlanBudget', { price: money(32) }) }}</span>
      <span class="font-semibold text-togethrd"><FontAwesomeIcon :icon="faRoute" /> {{ t('mock.togethrdRoute') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faRoute, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
const stops = [
  { key: 'museum', time: '11:00' },
  { key: 'ramen', time: '14:00' },
  { key: 'concert', time: '21:00' },
]
</script>
