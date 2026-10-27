<template>
  <div>
    <!-- Portada -->
    <section class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="meta flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-3">
        <span>{{ t('masthead.edition', { year }) }}</span>
        <span class="hidden sm:inline">{{ t('masthead.collection') }}</span>
        <span>heavnd.com</span>
      </div>

      <div class="grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div class="lg:col-span-8">
          <h1 class="display text-[3.4rem] leading-[0.95] text-balance sm:text-8xl lg:text-[8.25rem]">
            {{ t('hero.titleStart') }}
            <span class="relative inline-block italic">
              <span class="relative z-10">{{ t('hero.titleEm') }}</span>
              <span class="absolute inset-x-0 bottom-[0.12em] h-[0.22em] -rotate-1 rounded-full bg-accent/70" aria-hidden="true" />
            </span>
          </h1>
          <p class="mt-8 max-w-xl text-xl leading-relaxed text-muted text-pretty">{{ t('hero.lede') }}</p>
          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#apps" class="btn-primary px-5 py-3 text-base">{{ t('hero.cta') }}</a>
            <a href="#workshop" class="text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink">{{ t('hero.secondary') }} <FontAwesomeIcon :icon="faArrowRight" class="ml-1" /></a>
          </div>
        </div>

        <!-- Columna lateral: índice y nota al margen, como en una revista. -->
        <aside class="flex flex-col gap-10 lg:col-span-4 lg:border-l lg:border-ink/15 lg:pl-8">
          <nav :aria-label="t('hero.indexTitle')">
            <p class="meta">{{ t('hero.indexTitle') }}</p>
            <ol class="mt-3">
              <li v-for="(section, i) in SECTIONS" :key="section.id">
                <a :href="`#${section.id}`" class="group flex items-baseline gap-3 border-b border-ink/10 py-3">
                  <span class="font-mono text-xs text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span class="display text-2xl group-hover:italic">{{ t(section.key) }}</span>
                  <FontAwesomeIcon :icon="faArrowRight" class="ml-auto text-muted transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            </ol>
          </nav>
          <div class="border-l-2 border-accent pl-4">
            <p class="meta">* {{ t('hero.nameTitle') }}</p>
            <p class="display mt-2 text-xl italic leading-snug">{{ t('hero.nameText') }}</p>
          </div>
        </aside>
      </div>

      <!-- Acceso directo a cada app, sin tener que bajar hasta su historia. -->
      <div class="grid gap-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="(app, i) in APPS" :key="app.id" :to="`/${app.id}`"
          class="group relative flex items-center gap-5 overflow-hidden rounded-3xl p-6 transition sm:p-8" :class="app.accent.tint"
        >
          <AppIcon :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-14" />
          <div class="min-w-0">
            <p class="meta">{{ t('apps.label', { n: String(i + 1).padStart(2, '0') }) }}</p>
            <p class="display mt-1 text-4xl">{{ app.name }}</p>
            <p class="mt-1 text-muted">{{ t(`apps.${app.id}.tagline`) }}</p>
          </div>
          <span class="ml-auto grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform group-hover:-rotate-45" aria-hidden="true"><FontAwesomeIcon :icon="faArrowRight" /></span>
        </NuxtLink>
      </div>
    </section>

    <!-- 01 · Las apps -->
    <section id="apps" class="scroll-mt-14 pb-20 pt-4 sm:pb-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="01" :title="t('apps.title')" :intro="t('apps.intro')" />
        <div class="mt-20 flex flex-col gap-32">
          <AppStory v-for="(app, i) in APPS" :key="app.id" :app="app" :index="i" />
        </div>
      </div>
    </section>

    <!-- 02 · Manifiesto: el único bloque invertido de la página. -->
    <section id="manifesto" class="scroll-mt-14 bg-night py-20 text-night-ink sm:py-28 dark:border-y dark:border-ink/10">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="02" :title="t('manifesto.title')" :intro="t('manifesto.intro')" inverse />
        <ol class="mt-16">
          <li
            v-for="(rule, i) in RULES" :key="rule"
            class="reveal grid gap-3 border-t border-night-ink/15 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
          >
            <span class="display text-6xl italic leading-none text-accent">{{ ROMAN[i] }}</span>
            <div class="grid gap-3 lg:grid-cols-2 lg:gap-10">
              <h3 class="display text-3xl leading-tight">{{ t(`manifesto.rules.${rule}.title`) }}</h3>
              <p class="text-night-ink/70 text-pretty">{{ t(`manifesto.rules.${rule}.text`) }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- 03 · En el taller -->
    <section id="workshop" class="scroll-mt-14 py-20 sm:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead number="03" :title="t('workshop.title')" :intro="t('workshop.intro')" />
        <div class="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="app in APPS" :key="app.id" class="reveal card p-6">
            <div class="flex items-center gap-3">
              <AppIcon :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-9" />
              <p class="display text-2xl">{{ app.name }}</p>
            </div>
            <template v-for="stage in STAGES" :key="stage">
              <p v-if="app.roadmap[stage].length" class="meta mt-6">{{ t(`workshop.${stage}`) }}</p>
              <ul class="mt-2">
                <li v-for="item in app.roadmap[stage]" :key="item" class="flex items-start gap-3 border-t border-ink/10 py-2.5 text-sm">
                  <span
                    class="mt-1.5 size-2 shrink-0 rounded-full"
                    :class="stage === 'next' ? app.accent.bg : ['border-2', app.accent.border]" aria-hidden="true"
                  />
                  {{ t(`workshop.${app.id}.${item}`) }}
                </li>
              </ul>
            </template>
          </div>
          <div class="reveal flex flex-col rounded-2xl border border-dashed border-ink/20 p-6">
            <div class="grid size-9 place-items-center rounded-[22%] border border-dashed border-ink/30 text-muted" aria-hidden="true"><FontAwesomeIcon :icon="faPlus" /></div>
            <p class="display mt-6 text-2xl">{{ t('workshop.nextTitle') }}</p>
            <p class="mt-2 text-sm text-muted text-pretty">{{ t('workshop.nextText') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons'

usePageSeo({
  path: '/',
  title: () => t('seo.home.title'),
  ogTitle: () => t('seo.home.ogTitle'),
  description: () => t('seo.home.description'),
  image: 'heavnd',
  jsonLd: () => [
    { '@context': 'https://schema.org', ...HEAVND_ORG, description: t('seo.home.description') },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Heavnd', url: absoluteUrl('/'), inLanguage: 'es', publisher: { '@id': HEAVND_ORG['@id'] } },
  ],
})

const year = new Date().getFullYear()

const RULES = ['one', 'phone', 'home', 'short', 'finish'] as const
const ROMAN = ['I', 'II', 'III', 'IV', 'V']
const STAGES = ['next', 'exploring'] as const
</script>
