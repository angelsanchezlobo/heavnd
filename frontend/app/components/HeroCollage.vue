<template>
  <!--
    Collage de la portada: una pantalla de cada app, superpuestas y algo giradas, sobre una lámina con el
    lila de la marca. Decorativo: el contenido real está en el texto y en la tira de apps.
  -->
  <div class="relative mx-auto h-[24rem] w-full max-w-[34rem] sm:h-[33rem]" aria-hidden="true">
    <div class="absolute inset-x-[6%] inset-y-[8%] rotate-2 rounded-[2.5rem] bg-accent/30 dark:bg-accent/15" />
    <div class="absolute inset-x-[10%] inset-y-[12%] -rotate-3 rounded-[2.5rem] border border-ink/10" />

    <div v-for="item in ITEMS" :key="item.id" class="hero-card absolute" :class="item.place" :style="{ '--r': item.rotate, animationDelay: item.delay }">
      <component :is="item.mock" />
      <span class="absolute -right-3 -top-3 drop-shadow-sm">
        <AppIcon :glyph="app(item.id).glyph" :fill-class="app(item.id).icon.fill" :bg="app(item.id).icon.bg" size-class="size-9" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MockChoosd, MockMeald, MockSimplfd, MockTogethrdPlan } from '#components'
import type { HeavndApp } from '~/utils/apps'

const app = (id: HeavndApp['id']) => APPS.find(a => a.id === id)!

// Posición de cada tarjeta: arriba Choosd y Meald, abajo Togethrd y Simplfd, solapadas hacia el centro.
// En móvil solo caben dos con buen tamaño: Choosd y Simplfd, en diagonal.
const ITEMS = [
  { id: 'choosd', mock: MockChoosd, place: 'left-0 top-0 z-10 w-[80%] sm:w-[64%]', rotate: '-4deg', delay: '0ms' },
  { id: 'meald', mock: MockMeald, place: 'right-0 top-[9%] z-20 hidden w-[56%] sm:block', rotate: '3deg', delay: '90ms' },
  { id: 'togethrd', mock: MockTogethrdPlan, place: 'bottom-[3%] left-[3%] z-30 hidden w-[56%] sm:block', rotate: '2deg', delay: '180ms' },
  { id: 'simplfd', mock: MockSimplfd, place: 'bottom-0 right-0 z-40 w-[78%] sm:right-[1%] sm:w-[58%]', rotate: '-3deg', delay: '270ms' },
] as const
</script>

<style scoped>
.hero-card {
  rotate: var(--r);
  filter: drop-shadow(0 18px 30px rgb(17 17 20 / 0.12));
}
:global(.dark) .hero-card { filter: drop-shadow(0 18px 30px rgb(0 0 0 / 0.5)); }

/* Entrada escalonada al cargar, solo si el sistema no pide menos movimiento. */
@media (prefers-reduced-motion: no-preference) {
  .hero-card { animation: hero-in 700ms cubic-bezier(.2, .8, .2, 1) both; }
}
@keyframes hero-in {
  from { opacity: 0; translate: 0 24px; rotate: 0deg; }
}
</style>
