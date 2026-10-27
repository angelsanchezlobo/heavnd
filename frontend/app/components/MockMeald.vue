<template>
  <!-- Miniatura decorativa del plan semanal de Meald. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center gap-2 text-sm font-semibold">
      <AppIcon :glyph="APPS[1]!.glyph" fill-class="text-meald" size-class="size-6" />
      {{ t('mock.mealdWeek') }}
    </div>
    <ul class="mt-3 space-y-1.5">
      <li v-for="(meal, index) in meals" :key="meal.key" class="flex items-center gap-3 rounded-lg px-2 py-1.5 text-xs" :class="meal.leftover ? 'bg-meald/15' : 'bg-ink/[0.03]'">
        <span class="w-8 font-medium uppercase text-muted">{{ weekdayShort(index) }}</span>
        <span class="flex-1 truncate font-medium">{{ t(`mock.meals.${meal.key}`) }}</span>
        <FontAwesomeIcon v-if="meal.leftover" :icon="faRotateLeft" class="text-[11px] text-ink/60" />
      </li>
    </ul>
    <div class="mt-3 flex items-center justify-between border-t border-ink/5 pt-3 text-xs">
      <span class="text-muted">{{ t('mock.mealdTotal') }}</span>
      <span class="font-semibold">{{ money(42.8) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
const meals = [
  { key: 'mon', leftover: false },
  { key: 'tue', leftover: true },
  { key: 'wed', leftover: false },
  { key: 'thu', leftover: true },
  { key: 'fri', leftover: false },
]
</script>
