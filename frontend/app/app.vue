<template>
  <div id="top" class="min-h-dvh overflow-x-clip">
    <a href="#apps" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn-primary">{{ t('nav.skip') }}</a>
    <SiteHeader />

    <main>
      <!-- Hero -->
      <section class="relative">
        <div class="halo pointer-events-none absolute inset-x-0 -top-24 h-[640px]" aria-hidden="true" />
        <div class="dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <div class="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
          <div>
            <p class="eyebrow flex items-center gap-2">
              <span class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {{ t('hero.eyebrow') }}
            </p>
            <h1 class="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              {{ t('hero.titleStart') }}
              <span class="relative whitespace-nowrap">
                <span class="relative z-10">{{ t('hero.titleEnd') }}</span>
                <span class="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-accent/60 sm:bottom-2 sm:h-4" aria-hidden="true" />
              </span>
            </h1>
            <p class="mt-6 max-w-xl text-lg text-muted text-pretty">{{ t('hero.lead') }}</p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <a href="#apps" class="btn-primary px-5 py-3 text-base">{{ t('hero.cta') }}</a>
              <div class="flex items-center gap-2 text-sm text-muted">
                <span class="flex -space-x-1.5">
                  <AppIcon v-for="app in APPS" :key="app.id" :glyph="app.glyph" :fill-class="app.accent.text" size-class="size-6 ring-2 ring-paper" />
                </span>
                {{ t('hero.count', { count: APPS.length }) }}
              </div>
            </div>
          </div>

          <!-- Las dos apps "en uso", giradas y escalonadas. En móvil se omiten: las tarjetas de abajo ya lo cuentan. -->
          <div class="relative mx-auto hidden h-[560px] w-full max-w-md sm:block">
            <div class="absolute left-0 top-0 w-[22rem] -rotate-3 transition duration-500 hover:rotate-0">
              <MockResolvd />
            </div>
            <div class="absolute bottom-0 right-0 w-[19rem] rotate-2 transition duration-500 hover:rotate-0">
              <MockMeald />
            </div>
          </div>
        </div>
      </section>

      <!-- Apps -->
      <section id="apps" class="scroll-mt-14 border-t border-ink/5 bg-surface/40 py-20 sm:py-28">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <p class="eyebrow">{{ t('apps.eyebrow') }}</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{{ t('apps.title') }}</h2>
          <div class="mt-10 grid gap-6 md:grid-cols-2">
            <AppCard v-for="app in APPS" :key="app.id" :app="app" />
          </div>
          <div class="mt-6 flex items-center gap-4 rounded-2xl border border-dashed border-ink/15 p-6">
            <div class="grid size-12 shrink-0 place-items-center rounded-[22%] border border-dashed border-ink/20 text-xl text-muted" aria-hidden="true">+</div>
            <div>
              <p class="font-semibold">{{ t('apps.soonTitle') }}</p>
              <p class="text-sm text-muted">{{ t('apps.soonText') }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Principios -->
      <section id="principles" class="scroll-mt-14 py-20 sm:py-28">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <p class="eyebrow">{{ t('principles.eyebrow') }}</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{{ t('principles.title') }}</h2>
          <div class="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in principles" :key="item.key">
              <div class="grid size-10 place-items-center rounded-xl bg-accent/25 text-ink">
                <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path :d="item.icon" />
                </svg>
              </div>
              <h3 class="mt-4 font-semibold">{{ t(`principles.${item.key}.title`) }}</h3>
              <p class="mt-1.5 text-sm text-muted text-pretty">{{ t(`principles.${item.key}.text`) }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-ink/5">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div class="flex items-center gap-3">
          <AppIcon :glyph="HEAVND_GLYPH" fill-class="text-accent" size-class="size-8" />
          <div>
            <p class="font-semibold">Heavnd</p>
            <p class="text-muted">{{ t('footer.tagline') }}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
          <a v-for="app in APPS" :key="app.id" :href="app.url" class="flex items-center gap-2 hover:text-ink">
            <span class="size-2 rounded-full" :class="app.accent.bg" aria-hidden="true" />
            {{ app.name }}
          </a>
          <span>{{ t('footer.rights', { year }) }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { restore } = useTheme()

// El HTML llega en español y con tema SYSTEM; al montar se aplican el idioma y el tema guardados.
onMounted(() => {
  restoreLocale()
  restore()
})

// <html lang> según el idioma elegido: lectores de pantalla, corrector y separación de palabras.
useHead({ htmlAttrs: { lang: locale } })

const year = new Date().getFullYear()

const principles = [
  { key: 'focus', icon: 'M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
  { key: 'independent', icon: 'M4 4h7v7H4zM13 13h7v7h-7zM13 4h7v7h-7zM4 13h7v7H4z' },
  { key: 'installable', icon: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 7v7M9 11l3 3 3-3M11 18h2' },
  { key: 'yours', icon: 'M4 6h16M4 12h10M4 18h6M17 15l2 2 3-4' },
]
</script>
