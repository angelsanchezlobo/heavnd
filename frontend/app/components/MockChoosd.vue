<template>
  <!-- Miniatura decorativa del torneo de Choosd: no es interactiva y se oculta a lectores de pantalla. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm font-semibold">
        <AppIcon :glyph="APPS[0]!.glyph" fill-class="text-choosd" size-class="size-6" />
        {{ t('mock.choosdQuestion') }}
      </div>
      <span class="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-muted">{{ t('mock.choosdRound') }}</span>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-3">
      <div v-for="option in options" :key="option.name" class="rounded-xl border p-2.5" :class="option.chosen ? 'border-choosd ring-2 ring-choosd/40' : 'border-ink/10'">
        <div class="grid aspect-[4/3] place-items-center rounded-lg" :class="option.chosen ? 'bg-choosd/20' : 'bg-ink/5'">
          <FontAwesomeIcon :icon="faChair" class="text-3xl text-ink/50" />
        </div>
        <div class="mt-2 truncate text-xs font-medium">{{ option.name }}</div>
        <div class="text-xs text-muted">{{ money(option.price) }}</div>
      </div>
    </div>
    <div class="mt-4">
      <div class="flex justify-between text-[11px] text-muted">
        <span>{{ t('mock.choosdBudget') }}</span>
        <span class="font-medium text-ink">{{ money(211) }} / {{ money(500) }}</span>
      </div>
      <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div class="h-full w-[58%] rounded-full bg-choosd" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faChair } from '@fortawesome/free-solid-svg-icons'
const options = computed(() => [
  { name: t('mock.choosdA'), price: 249, chosen: true },
  { name: t('mock.choosdB'), price: 289, chosen: false },
])
</script>
