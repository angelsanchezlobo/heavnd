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
          <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <template v-if="preference === 'LIGHT'">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </template>
            <path v-else-if="preference === 'DARK'" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            <template v-else>
              <rect x="3" y="4" width="18" height="12" rx="2" />
              <path d="M8 20h8M12 16v4" />
            </template>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { ThemePreference } from '~/composables/useTheme'

const { preference, setPreference } = useTheme()

const NEXT: Record<ThemePreference, ThemePreference> = { SYSTEM: 'LIGHT', LIGHT: 'DARK', DARK: 'SYSTEM' }
const themeLabel = computed(() => t(`theme.${preference.value}`))

function cycleTheme() {
  setPreference(NEXT[preference.value])
}
</script>
