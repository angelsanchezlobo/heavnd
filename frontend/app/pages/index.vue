<template>
  <div>
    <!-- Portada: titular y las cuatro apps a la vista, sobre halos con sus colores. -->
    <section class="relative isolate overflow-hidden">
      <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div class="absolute -top-48 right-[-12%] size-[44rem] rounded-full bg-accent/25 blur-3xl dark:bg-accent/10" />
        <div class="absolute right-[30%] top-[40%] size-[20rem] rounded-full bg-meald/40 blur-3xl dark:bg-meald/10" />
        <div class="absolute -left-40 top-[55%] size-[26rem] rounded-full bg-choosd/30 blur-3xl dark:bg-choosd/10" />
      </div>

      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="meta flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-3">
          <span>{{ t('masthead.edition', { year }) }}</span>
          <span class="hidden sm:inline">{{ t('masthead.collection') }}</span>
          <span>heavnd.com</span>
        </div>

        <div class="grid items-center gap-10 pb-10 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-14">
          <div class="lg:col-span-6">
            <p class="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-surface/70 py-1.5 pl-2 pr-3.5 text-xs font-medium backdrop-blur">
              <span class="flex -space-x-1" aria-hidden="true">
                <span v-for="app in APPS" :key="app.id" class="size-3 rounded-full ring-2 ring-surface" :class="app.accent.bg" />
              </span>
              {{ t('hero.badge') }}
            </p>
            <h1 class="display mt-6 text-[3.25rem] leading-[0.95] text-balance sm:text-7xl lg:text-[5.25rem]">
              {{ t('hero.titleStart') }}
              <span class="relative inline-block italic">
                <span class="relative z-10">{{ t('hero.titleEm') }}</span>
                <span class="absolute inset-x-0 bottom-[0.1em] h-[0.24em] -rotate-1 rounded-full bg-accent/70" aria-hidden="true" />
              </span>
            </h1>
            <p class="mt-6 max-w-lg text-lg leading-relaxed text-muted text-pretty sm:text-xl">{{ t('hero.lede') }}</p>
            <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#apps" class="btn-primary px-5 py-3 text-base">{{ t('hero.cta') }} <FontAwesomeIcon :icon="faArrowDown" /></a>
              <a href="#workshop" class="text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink">{{ t('hero.secondary') }} <FontAwesomeIcon :icon="faArrowRight" class="ml-1" /></a>
            </div>
            <p class="mt-10 max-w-md border-l-2 border-accent pl-4 text-sm text-muted text-pretty">
              <span class="font-medium text-ink">{{ t('hero.nameTitle') }}.</span> {{ t('hero.nameText') }}
            </p>
          </div>

          <div class="lg:col-span-6">
            <HeroCollage />
          </div>
        </div>

        <!-- Acceso directo a cada app, sin tener que bajar hasta su historia. -->
        <ul class="grid gap-3 pb-20 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="app in APPS" :key="app.id">
            <NuxtLink
              :to="localePath(`/${app.id}`)"
              class="group flex h-full items-center gap-4 rounded-2xl border border-ink/10 bg-surface/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-md dark:hover:shadow-none"
            >
              <AppIcon :glyph="app.glyph" :fill-class="app.icon.fill" :bg="app.icon.bg" size-class="size-11" />
              <span class="min-w-0 flex-1">
                <span class="display block text-2xl leading-tight">{{ app.name }}</span>
                <span class="block text-sm text-muted text-pretty">{{ t(`apps.${app.id}.tagline`) }}</span>
              </span>
              <FontAwesomeIcon :icon="faArrowRight" class="text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
            </NuxtLink>
          </li>
        </ul>
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
            <span class="display text-6xl italic leading-none text-accent-strong">{{ ROMAN[i] }}</span>
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
              <AppIcon :glyph="app.glyph" :fill-class="app.icon.fill" :bg="app.icon.bg" size-class="size-9" />
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
import { faArrowDown, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons'

usePageSeo({
  id: 'home',
  title: () => t('seo.home.ogTitle'),
  ogTitle: () => t('seo.home.ogTitle'),
  description: () => t('seo.home.description'),
  image: 'heavnd',
  jsonLd: () => [appsItemList(APPS)],
})

const year = new Date().getFullYear()

const RULES = ['one', 'phone', 'home', 'short', 'finish'] as const
const ROMAN = ['I', 'II', 'III', 'IV', 'V']
const STAGES = ['next', 'exploring'] as const
</script>
