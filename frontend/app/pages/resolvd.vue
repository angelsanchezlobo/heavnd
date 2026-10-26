<template>
  <ProductPage :app="app" />
</template>

<script setup lang="ts">
const app = APPS.find(a => a.id === 'resolvd')!

// Título y descripción propios: es la página que se comparte y la que indexan los buscadores.
useSeoMeta({
  title: () => t('product.resolvd.metaTitle'),
  description: () => t('product.resolvd.metaDescription'),
  ogTitle: () => t('product.resolvd.metaTitle'),
  ogDescription: () => t('product.resolvd.metaDescription'),
  ogUrl: 'https://heavnd.com/resolvd',
})
useHead({ link: [{ rel: 'canonical', href: 'https://heavnd.com/resolvd' }] })
</script>
