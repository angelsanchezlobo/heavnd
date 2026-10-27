<template>
  <ProductPage :app="app" />
</template>

<script setup lang="ts">
const app = APPS.find(a => a.id === 'meald')!

// Es la página que se comparte y la que indexan los buscadores, no la app (que es una SPA).
useAppPageSeo(app)
</script>
