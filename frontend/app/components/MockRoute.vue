<template>
  <!-- La firma de Togethrd: paradas numeradas unidas por una línea de puntos. -->
  <span class="inline-flex items-center" aria-hidden="true">
    <template v-for="n in count" :key="n">
      <span v-if="n > 1" class="w-3 border-t-2 border-dotted" :class="inverse ? 'border-on-togethrd' : 'border-togethrd'" />
      <span
        class="grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-bold"
        :class="inverse ? 'bg-on-togethrd text-togethrd' : 'bg-togethrd text-on-togethrd'"
      >{{ n }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ count: number, inverse?: boolean }>(), { inverse: false })
</script>
