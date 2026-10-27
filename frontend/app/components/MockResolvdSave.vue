<template>
  <!-- Miniatura decorativa: un enlace pegado en Resolvd y el producto que sale de él. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-2 text-xs">
      <FontAwesomeIcon :icon="faLink" class="shrink-0 text-muted" />
      <span class="truncate font-mono text-muted">{{ t('mock.saveUrl') }}</span>
      <span class="ml-auto shrink-0 rounded-md bg-ink px-1.5 py-0.5 text-[10px] font-medium text-paper"><FontAwesomeIcon :icon="faTurnDown" class="rotate-90" /></span>
    </div>
    <p class="meta mt-3 text-[10px]">{{ t('mock.saveRead') }}</p>
    <div class="mt-2 flex gap-3">
      <div class="grid size-16 shrink-0 place-items-center rounded-lg bg-resolvd/20">
        <FontAwesomeIcon :icon="faChair" class="text-2xl text-ink/50" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold">{{ t('mock.resolvdA') }}</p>
        <p class="text-sm">{{ money(249) }} <span class="text-xs text-muted">· {{ t('mock.saveTarget') }} {{ money(220) }}</span></p>
        <div class="mt-1.5 flex gap-1.5 text-[10px] font-medium">
          <span class="rounded-full bg-resolvd px-2 py-0.5 text-on-accent"><FontAwesomeIcon :icon="faStar" /> {{ t('mock.saveState') }}</span>
          <span class="rounded-full bg-ink/5 px-2 py-0.5 text-muted">#{{ t('mock.saveTag') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faChair, faLink, faStar, faTurnDown } from '@fortawesome/free-solid-svg-icons'
</script>
