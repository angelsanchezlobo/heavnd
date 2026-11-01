<template>
  <!-- Miniatura decorativa de Descubrir en Togethrd: lo tuyo arriba y lo de tus amigos en el bloque granate. -->
  <div class="card w-full p-4" aria-hidden="true">
    <div class="flex items-center gap-2">
      <AppIcon :glyph="APPS[2]!.glyph" :fill-class="APPS[2]!.icon.fill" :bg="APPS[2]!.icon.bg" size-class="size-6" />
      <p class="text-base font-semibold leading-tight">{{ t('mock.togethrdGreeting') }} <span class="text-togethrd">{{ t('mock.togethrdGreetingWhen') }}</span>?</p>
    </div>
    <div class="mt-3 rounded-xl bg-ink/[0.03] p-2.5">
      <p class="text-[10px] font-medium text-muted">{{ t('mock.togethrdNext') }} · {{ t('mock.togethrdNextWhen') }}</p>
      <p class="mt-0.5 truncate text-xs font-semibold">{{ t('mock.togethrdNextTitle') }}</p>
      <MockRoute :count="3" class="mt-2" />
    </div>
    <div class="mt-3 rounded-xl bg-togethrd p-2.5 text-on-togethrd">
      <p class="text-[11px] font-semibold">{{ t('mock.togethrdFriends') }}</p>
      <div class="mt-2 flex items-center gap-2.5 rounded-lg bg-surface p-2 text-ink">
        <span class="grid size-10 shrink-0 place-items-center rounded-md bg-togethrd/15"><FontAwesomeIcon :icon="faWineGlass" class="text-togethrd" /></span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-xs font-semibold">{{ t('mock.togethrdExperience') }}</span>
          <span class="block truncate text-[10px] text-muted">{{ t('mock.togethrdExperienceMeta') }}</span>
        </span>
        <span class="shrink-0 rounded-full bg-togethrd px-2 py-1 text-[10px] font-semibold text-on-togethrd"><FontAwesomeIcon :icon="faBookmark" /> {{ t('mock.togethrdSave') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faBookmark, faWineGlass } from '@fortawesome/free-solid-svg-icons'
</script>
