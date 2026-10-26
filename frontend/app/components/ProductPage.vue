<template>
  <div>
    <!-- Portada de la app -->
    <section class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="meta flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-3">
        <NuxtLink to="/" class="hover:text-ink">← Heavnd</NuxtLink>
        <a :href="app.url" class="hover:text-ink">{{ host }} ↗</a>
      </div>

      <div class="grid gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-14">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-4">
            <AppIcon :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-14 sm:size-16" />
            <h1 class="display text-6xl sm:text-8xl">{{ app.name }}</h1>
          </div>
          <p class="display mt-5 text-3xl italic leading-tight text-balance sm:text-4xl">{{ t(`product.${app.id}.headline`) }}</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">{{ t(`apps.${app.id}.problem`) }}</p>
          <div class="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a :href="app.page.signupUrl" class="btn-primary px-5 py-3 text-base">{{ t('product.start') }}</a>
            <a :href="app.page.loginUrl" class="text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink">{{ t('product.login') }}</a>
          </div>
          <p class="meta mt-5">{{ t('product.freeNote') }}</p>
        </div>
        <div class="lg:col-span-5">
          <div class="rounded-3xl p-5 sm:p-8" :class="app.accent.tint">
            <div class="mx-auto flex max-w-sm flex-col gap-5" aria-hidden="true">
              <template v-if="app.id === 'resolvd'">
                <div class="-rotate-1"><MockResolvdSave /></div>
                <div class="rotate-1"><MockResolvd /></div>
              </template>
              <template v-else>
                <div class="rotate-1"><MockMeald /></div>
                <div class="-rotate-1"><MockShopping /></div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 01 · Para qué sirve: situaciones reales antes que la lista de funciones -->
    <section id="cases" class="scroll-mt-14 pb-20 sm:pb-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="01" :title="t('product.casesTitle')" :intro="t(`product.${app.id}.casesIntro`)" />
        <div class="mt-14 grid gap-4 sm:grid-cols-2">
          <article v-for="c in app.page.cases" :key="c" class="reveal card p-6 sm:p-8">
            <p class="display text-2xl italic leading-snug text-balance">“{{ t(`product.${app.id}.cases.${c}.quote`) }}”</p>
            <p class="mt-4 text-muted text-pretty">{{ t(`product.${app.id}.cases.${c}.text`) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 02 · Todo lo que hace -->
    <section id="features" class="scroll-mt-14 pb-20 sm:pb-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="02" :title="t('product.featuresTitle')" :intro="t(`product.${app.id}.featuresIntro`)" />
        <div class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(f, i) in app.page.features" :key="f" class="reveal bg-paper p-6" :class="i === app.page.features.length - 1 ? lastSpan : ''">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="size-2 rounded-full" :class="app.accent.bg" aria-hidden="true" />
            </div>
            <h3 class="display mt-3 text-2xl leading-tight">{{ t(`product.${app.id}.features.${f}.title`) }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted text-pretty">{{ t(`product.${app.id}.features.${f}.text`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 · Precio: el único bloque invertido, como el manifiesto en la portada -->
    <section id="pricing" class="scroll-mt-14 bg-night py-20 text-night-ink sm:py-28 dark:border-y dark:border-ink/10">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="03" :title="t('product.pricingTitle')" inverse />

        <!-- Gratis con límites generosos + Pro -->
        <template v-if="app.page.pro">
          <p class="display mt-14 text-3xl italic text-balance sm:text-4xl">{{ t('product.freemium.headline') }}</p>
          <div class="mt-10 grid gap-4 md:grid-cols-2">
            <div class="reveal rounded-3xl border border-night-ink/15 p-6 sm:p-8">
              <p class="meta text-night-ink/60">{{ t('product.freemium.freeName') }}</p>
              <p class="display mt-2 text-5xl">0 €</p>
              <ul class="mt-6">
                <li v-for="k in FREE_ROWS" :key="k" class="flex gap-3 border-t border-night-ink/10 py-3 text-sm">
                  <span class="text-accent" aria-hidden="true">✓</span>{{ t(`product.freemium.free.${k}`) }}
                </li>
              </ul>
              <a :href="app.page.signupUrl" class="btn mt-6 bg-night-ink px-5 py-3 text-base text-night hover:opacity-90">{{ t('product.start') }}</a>
            </div>
            <div class="reveal rounded-3xl bg-accent p-6 text-on-accent sm:p-8">
              <div class="flex items-baseline justify-between gap-3">
                <p class="meta text-on-accent/70">Pro</p>
                <span class="rounded-full bg-on-accent/10 px-2.5 py-0.5 text-xs font-medium">{{ t('product.freemium.soon') }}</span>
              </div>
              <p class="display mt-2 text-5xl">{{ t('product.freemium.proPrice') }}</p>
              <p class="mt-1 text-sm text-on-accent/70">{{ t('product.freemium.proYearly') }}</p>
              <ul class="mt-6">
                <li v-for="k in PRO_ROWS" :key="k" class="flex gap-3 border-t border-on-accent/15 py-3 text-sm">
                  <span aria-hidden="true">✓</span>{{ t(`product.freemium.pro.${k}`) }}
                </li>
              </ul>
            </div>
          </div>
          <p class="mt-8 max-w-2xl text-sm text-night-ink/70">{{ t('product.freemium.promise') }}</p>
        </template>

        <!-- Gratis del todo -->
        <div v-else class="mt-14 grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <p class="display text-7xl sm:text-8xl">0 €</p>
            <p class="display mt-3 text-3xl italic">{{ t('product.pricingHeadline') }}</p>
            <a :href="app.page.signupUrl" class="btn mt-8 bg-accent px-5 py-3 text-base text-on-accent hover:brightness-95">{{ t('product.start') }}</a>
          </div>
          <ul class="lg:col-span-7">
            <li v-for="p in PRICING" :key="p" class="reveal border-t border-night-ink/15 py-5">
              <h3 class="display text-2xl">{{ t(`product.pricing.${p}.title`) }}</h3>
              <p class="mt-1.5 text-night-ink/70 text-pretty">{{ t(`product.pricing.${p}.text`) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 04 · Preguntas -->
    <section id="faq" class="scroll-mt-14 py-20 sm:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="04" :title="t('product.faqTitle')" />
        <div class="mt-14 md:ml-[33.333%]">
          <details v-for="q in app.page.faq" :key="q" class="reveal group border-t border-ink/15 py-5 last:border-b">
            <summary class="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
              <span class="display text-2xl leading-snug">{{ t(`product.${app.id}.faq.${q}.q`) }}</span>
              <span class="mt-1 text-2xl text-muted transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p class="mt-3 max-w-2xl text-muted text-pretty">{{ t(`product.${app.id}.faq.${q}.a`) }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Cierre -->
    <section class="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div class="flex flex-col items-start gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12" :class="app.accent.tint">
        <div class="flex items-center gap-4">
          <AppIcon :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-12" />
          <p class="display text-3xl italic leading-tight text-balance sm:text-4xl">{{ t(`apps.${app.id}.quote`) }}</p>
        </div>
        <a :href="app.page.signupUrl" class="btn-primary shrink-0 px-5 py-3 text-base">{{ t('product.start') }}</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { HeavndApp } from '~/utils/apps'

const props = defineProps<{ app: HeavndApp }>()
const host = computed(() => new URL(props.app.url).host)

/** Lo mismo para todas las apps: gratis de verdad y la promesa de no quitar nada. */
const PRICING = ['everything', 'noLimits', 'promise'] as const
const FREE_ROWS = ['core', 'projects', 'members', 'giftLists', 'photos', 'history'] as const
const PRO_ROWS = ['all', 'next', 'support'] as const

// La última tarjeta ocupa el hueco que quede en su fila para que la rejilla no termine en una celda gris.
const lastSpan = computed(() => {
  const n = props.app.page.features.length
  const sm = n % 2 === 1 ? 'sm:col-span-2' : ''
  const lg = { 0: 'lg:col-span-1', 1: 'lg:col-span-3', 2: 'lg:col-span-2' }[n % 3]
  return `${sm} ${lg}`
})
</script>
