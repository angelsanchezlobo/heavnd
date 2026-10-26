<template>
  <ProductPage :app="app" />
</template>

<script setup lang="ts">
const app = APPS.find(a => a.id === 'togethrd')!

// Título y descripción propios: es la página que se comparte y la que indexan los buscadores.
useSeoMeta({
  title: () => t('product.togethrd.metaTitle'),
  description: () => t('product.togethrd.metaDescription'),
  ogTitle: () => t('product.togethrd.metaTitle'),
  ogDescription: () => t('product.togethrd.metaDescription'),
  ogUrl: 'https://heavnd.com/togethrd',
})
useHead({ link: [{ rel: 'canonical', href: 'https://heavnd.com/togethrd' }] })
</script>
