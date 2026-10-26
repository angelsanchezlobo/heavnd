<template>
  <!-- Las dos pantallas de ejemplo de cada app, ligeramente giradas, para la historia y la página propia. -->
  <template v-if="id === 'resolvd'">
    <div class="-rotate-1"><MockResolvdSave /></div>
    <div class="rotate-1"><MockResolvd /></div>
  </template>
  <template v-else-if="id === 'meald'">
    <div class="rotate-1"><MockMeald /></div>
    <div class="-rotate-1"><MockShopping /></div>
  </template>
  <template v-else>
    <div class="-rotate-1"><MockTogethrd /></div>
    <div class="rotate-1"><MockTogethrdTrip /></div>
  </template>
</template>

<script setup lang="ts">
import type { HeavndApp } from '~/utils/apps'

defineProps<{ id: HeavndApp['id'] }>()
</script>
