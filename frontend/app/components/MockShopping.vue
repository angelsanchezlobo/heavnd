<template>
  <!-- Miniatura decorativa de la lista de la compra de Meald. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center justify-between text-sm font-semibold">
      {{ t('mock.shoppingTitle') }}
      <span class="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-muted">{{ t('mock.shoppingStore') }}</span>
    </div>
    <ul class="mt-3 divide-y divide-ink/5 text-xs">
      <li v-for="item in items" :key="item.key" class="flex items-center gap-3 py-2">
        <span class="grid size-4 shrink-0 place-items-center rounded border" :class="item.done ? 'border-meald bg-meald text-on-accent' : 'border-ink/25'">
          <svg v-if="item.done" viewBox="0 0 24 24" class="size-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
        </span>
        <span class="flex-1 truncate font-medium" :class="item.done ? 'text-muted line-through' : ''">{{ t(`mock.shoppingItems.${item.key}`) }}</span>
        <span class="font-mono text-[10px] text-muted">{{ item.pack }}</span>
        <span class="w-14 text-right">{{ money(item.price) }}</span>
      </li>
    </ul>
    <div class="mt-1 flex items-center justify-between border-t border-ink/10 pt-3 text-xs">
      <span class="text-muted">{{ t('mock.shoppingTotal') }}</span>
      <span class="font-semibold">{{ money(total) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { key: 'tomato', pack: '1 kg', price: 2.35, done: true },
  { key: 'lentils', pack: '1 kg', price: 1.95, done: true },
  { key: 'pasta', pack: '500 g', price: 0.89, done: false },
  { key: 'basil', pack: '30 g', price: 1.5, done: false },
]
const total = items.reduce((sum, item) => sum + item.price, 0)
</script>
