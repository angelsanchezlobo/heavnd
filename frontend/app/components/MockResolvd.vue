<template>
  <!-- Miniatura decorativa del torneo de Resolvd: no es interactiva y se oculta a lectores de pantalla. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm font-semibold">
        <AppIcon :glyph="APPS[0]!.glyph" fill-class="text-resolvd" size-class="size-6" />
        {{ t('mock.resolvdQuestion') }}
      </div>
      <span class="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-muted">{{ t('mock.resolvdRound') }}</span>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-3">
      <div v-for="option in options" :key="option.name" class="rounded-xl border p-2.5" :class="option.chosen ? 'border-resolvd ring-2 ring-resolvd/40' : 'border-ink/10'">
        <div class="grid aspect-[4/3] place-items-center rounded-lg" :class="option.chosen ? 'bg-resolvd/20' : 'bg-ink/5'">
          <svg viewBox="0 0 24 24" class="size-9 text-ink/60" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 3h10v9H7zM5 12h14M8 12v9M16 12v9M6 17h12" />
          </svg>
        </div>
        <div class="mt-2 truncate text-xs font-medium">{{ option.name }}</div>
        <div class="text-xs text-muted">{{ money(option.price) }}</div>
      </div>
    </div>
    <div class="mt-4">
      <div class="flex justify-between text-[11px] text-muted">
        <span>{{ t('mock.resolvdBudget') }}</span>
        <span class="font-medium text-ink">{{ money(211) }} / {{ money(500) }}</span>
      </div>
      <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div class="h-full w-[58%] rounded-full bg-resolvd" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const options = computed(() => [
  { name: t('mock.resolvdA'), price: 249, chosen: true },
  { name: t('mock.resolvdB'), price: 289, chosen: false },
])
</script>
