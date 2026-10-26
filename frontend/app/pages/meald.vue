<template>
  <ProductPage :app="app" />
</template>

<script setup lang="ts">
const app = APPS.find(a => a.id === 'meald')!

// Título y descripción propios: es la página que se comparte y la que indexan los buscadores.
useSeoMeta({
  title: () => t('product.meald.metaTitle'),
  description: () => t('product.meald.metaDescription'),
  ogTitle: () => t('product.meald.metaTitle'),
  ogDescription: () => t('product.meald.metaDescription'),
  ogUrl: 'https://heavnd.com/meald',
})
useHead({ link: [{ rel: 'canonical', href: 'https://heavnd.com/meald' }] })
</script>
