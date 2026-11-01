<template>
  <svg viewBox="0 0 32 32" :class="['shrink-0 rounded-[22%] dark:ring-1 dark:ring-ink/15', sizeClass]" aria-hidden="true">
    <rect width="32" height="32" rx="8" :fill="bg" />
    <path :d="glyph" :class="fillClass" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
// Cuadrado con la inicial: el mismo icono que cada app usa como favicon (apps.ts → icon).
// Colores fijos (no tokens) para que en oscuro siga siendo el icono real de la app; por defecto, el de Heavnd.
withDefaults(defineProps<{ glyph: string, fillClass: string, bg?: string, sizeClass?: string }>(), { bg: '#111114', sizeClass: 'size-10' })
</script>
