<template>
  <header class="reveal grid gap-6 border-t pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12" :class="inverse ? 'border-night-ink/20' : 'border-ink/15'">
    <p class="meta" :class="inverse ? 'text-night-ink/60' : ''">{{ number }} — {{ title }}</p>
    <div>
      <h2 class="display text-5xl sm:text-7xl">{{ title }}</h2>
      <p v-if="intro" class="mt-5 max-w-2xl text-lg text-pretty" :class="inverse ? 'text-night-ink/70' : 'text-muted'">{{ intro }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
// Cabecera de sección al estilo de una revista: número y nombre en monoespaciada a la izquierda,
// titular grande a la derecha, sobre un filete a todo el ancho.
defineProps<{ number: string, title: string, intro?: string, inverse?: boolean }>()
</script>
