<template>
  <header class="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur">
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center gap-2.5">
        <AppIcon :glyph="HEAVND_GLYPH" fill-class="text-accent" size-class="size-7" />
        <span class="display text-xl">Heavnd</span>
      </NuxtLink>
      <div class="flex items-center gap-1 text-sm">
        <nav class="mr-2 hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="app in APPS" :key="app.id" :to="`/${app.id}`"
            class="btn-ghost flex items-center gap-2 px-3 py-1.5 text-muted hover:text-ink" active-class="!text-ink"
          >
            <span class="size-2 rounded-full" :class="app.accent.bg" aria-hidden="true" />
            {{ app.name }}
          </NuxtLink>
          <NuxtLink to="/#manifesto" class="btn-ghost px-3 py-1.5 text-muted hover:text-ink">{{ t('nav.manifesto') }}</NuxtLink>
        </nav>
        <label>
          <span class="sr-only">{{ t('language') }}</span>
          <select
            :value="locale" class="btn-ghost cursor-pointer appearance-none bg-transparent px-3 py-1.5 font-medium"
            @change="setLocale(($event.target as HTMLSelectElement).value as Locale)"
          >
            <option v-for="code in LOCALES" :key="code" :value="code">{{ LOCALE_NAMES[code] }}</option>
          </select>
        </label>
        <button class="btn-ghost px-2.5" :aria-label="t('theme.change', { theme: themeLabel })" :title="themeLabel" @click="cycleTheme">
          <FontAwesomeIcon :icon="THEME_ICONS[preference]" class="text-lg" fixed-width />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { ThemePreference } from '~/composables/useTheme'

const { preference, setPreference } = useTheme()

const THEME_ICONS: Record<ThemePreference, IconDefinition> = { SYSTEM: faDesktop, LIGHT: faSun, DARK: faMoon }
const NEXT: Record<ThemePreference, ThemePreference> = { SYSTEM: 'LIGHT', LIGHT: 'DARK', DARK: 'SYSTEM' }
const themeLabel = computed(() => t(`theme.${preference.value}`))

function cycleTheme() {
  setPreference(NEXT[preference.value])
}
</script>
