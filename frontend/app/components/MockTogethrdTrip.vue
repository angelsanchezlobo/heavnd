<template>
  <!-- Miniatura decorativa de la ficha de un viaje en Togethrd. -->
  <div class="card w-full p-4" aria-hidden="true">
    <p class="text-[10px] font-medium uppercase tracking-wide text-muted">✈︎ {{ t('mock.togethrdTripKind') }}</p>
    <p class="mt-0.5 text-sm font-semibold">{{ t('mock.togethrdTrip') }}</p>
    <p class="text-xs text-muted">{{ t('mock.togethrdTripDates') }}</p>
    <div class="mt-3 rounded-xl bg-ink/[0.03] p-2.5 text-xs">
      <p class="font-semibold">{{ t('mock.togethrdFlight') }}</p>
      <p class="text-muted">{{ t('mock.togethrdFlightInfo') }}</p>
    </div>
    <p class="mt-3 text-[11px] font-semibold">{{ t('mock.togethrdDestination') }}</p>
    <div class="mt-2 grid grid-cols-2 gap-2">
      <div v-for="place in places" :key="place" class="rounded-lg border border-ink/10 p-2">
        <div class="h-8 rounded bg-togethrd/20" />
        <p class="mt-1.5 truncate text-[11px] font-medium">{{ t(`mock.togethrdPlaces.${place}`) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const places = ['ghibli', 'ichiran']
</script>
