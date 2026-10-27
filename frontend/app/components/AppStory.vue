<template>
  <article :id="app.id" class="scroll-mt-20 border-t border-ink/15 pt-8">
    <div class="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <p class="meta">{{ t('apps.label', { n: number }) }}</p>
      <a :href="app.url" class="meta hover:text-ink">{{ host }} <FontAwesomeIcon :icon="faArrowUpRightFromSquare" class="ml-1" /></a>
    </div>

    <div class="reveal mt-6 flex items-center gap-4 sm:gap-6">
      <AppIcon :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-14 sm:size-20" />
      <h3 class="display text-6xl sm:text-8xl lg:text-9xl">{{ app.name }}</h3>
    </div>
    <p class="reveal display mt-4 text-3xl italic text-muted sm:text-4xl">{{ t(`apps.${app.id}.tagline`) }}</p>

    <div class="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-7" :class="flip ? 'lg:order-2' : ''">
        <section class="reveal">
          <p class="meta">{{ t('apps.problem') }}</p>
          <p class="mt-3 text-xl leading-relaxed text-pretty sm:text-2xl">{{ t(`apps.${app.id}.problem`) }}</p>
        </section>

        <blockquote class="reveal my-12 border-l-4 pl-6" :class="app.accent.border">
          <p class="display text-4xl italic leading-tight text-balance sm:text-5xl">“{{ t(`apps.${app.id}.quote`) }}”</p>
        </blockquote>

        <section>
          <p class="reveal meta">{{ t('apps.how') }}</p>
          <ol class="mt-4">
            <li v-for="(step, i) in app.steps" :key="step" class="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 py-5 sm:grid-cols-[4rem_1fr]">
              <span class="display text-4xl leading-none text-ink/25 sm:text-5xl">{{ i + 1 }}</span>
              <div>
                <h4 class="display text-2xl">{{ t(`apps.${app.id}.steps.${step}.title`) }}</h4>
                <p class="mt-1.5 text-muted text-pretty">{{ t(`apps.${app.id}.steps.${step}.text`) }}</p>
              </div>
            </li>
          </ol>
        </section>
      </div>

      <!-- Panel de pantallas: se queda fijo mientras se leen los pasos. -->
      <div class="lg:col-span-5" :class="flip ? 'lg:order-1' : ''">
        <div class="reveal rounded-3xl p-5 sm:p-8 lg:sticky lg:top-24" :class="app.accent.tint">
          <div class="mx-auto flex max-w-sm flex-col gap-5">
            <AppMocks :id="app.id" />
          </div>
        </div>
      </div>
    </div>

    <dl class="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
      <div v-for="fact in app.facts" :key="fact" class="reveal bg-paper p-6">
        <dt class="display text-5xl">{{ t(`apps.${app.id}.facts.${fact}.value`) }}</dt>
        <dd class="mt-2 text-sm text-muted text-pretty">{{ t(`apps.${app.id}.facts.${fact}.label`) }}</dd>
      </div>
    </dl>

    <div class="mt-10 flex flex-wrap items-center gap-4">
      <NuxtLink :to="`/${app.id}`" class="btn-ghost border border-ink/15 px-5 py-3 text-base">{{ t('apps.more', { name: app.name }) }}</NuxtLink>
      <a :href="app.url" class="btn-primary group px-5 py-3 text-base">
        {{ t('apps.open', { name: app.name }) }}
        <FontAwesomeIcon :icon="faArrowRight" class="transition-transform group-hover:translate-x-0.5" />
      </a>
      <span class="size-3 rounded-full" :class="app.accent.bg" aria-hidden="true" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import type { HeavndApp } from '~/utils/apps'

const props = defineProps<{ app: HeavndApp, index: number }>()
const host = computed(() => new URL(props.app.url).host)
const number = computed(() => String(props.index + 1).padStart(2, '0'))
// Una historia con las pantallas a la derecha y la siguiente a la izquierda, como en una revista.
const flip = computed(() => props.index % 2 === 1)
</script>
