<template>
  <svg viewBox="0 0 32 32" :class="['shrink-0 rounded-[22%] dark:ring-1 dark:ring-ink/15', sizeClass]" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#111114" />
    <path :d="glyph" :class="fillClass" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
// Cuadrado ink con la inicial en el acento: el mismo icono que cada app usa como favicon.
// El fondo es #111114 fijo (no el token) para que en oscuro siga siendo el icono real de la app.
withDefaults(defineProps<{ glyph: string, fillClass: string, sizeClass?: string }>(), { sizeClass: 'size-10' })
</script>
