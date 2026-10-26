<template>
  <!-- Miniatura decorativa: un enlace pegado en Resolvd y el producto que sale de él. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-2 text-xs">
      <svg viewBox="0 0 24 24" class="size-3.5 shrink-0 text-muted" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
      </svg>
      <span class="truncate font-mono text-muted">{{ t('mock.saveUrl') }}</span>
      <span class="ml-auto shrink-0 rounded-md bg-ink px-1.5 py-0.5 text-[10px] font-medium text-paper">↵</span>
    </div>
    <p class="meta mt-3 text-[10px]">{{ t('mock.saveRead') }}</p>
    <div class="mt-2 flex gap-3">
      <div class="grid size-16 shrink-0 place-items-center rounded-lg bg-resolvd/20">
        <svg viewBox="0 0 24 24" class="size-8 text-ink/60" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 3h10v9H7zM5 12h14M8 12v9M16 12v9M6 17h12" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold">{{ t('mock.resolvdA') }}</p>
        <p class="text-sm">{{ money(249) }} <span class="text-xs text-muted">· {{ t('mock.saveTarget') }} {{ money(220) }}</span></p>
        <div class="mt-1.5 flex gap-1.5 text-[10px] font-medium">
          <span class="rounded-full bg-resolvd px-2 py-0.5 text-on-accent">★ {{ t('mock.saveState') }}</span>
          <span class="rounded-full bg-ink/5 px-2 py-0.5 text-muted">#{{ t('mock.saveTag') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
