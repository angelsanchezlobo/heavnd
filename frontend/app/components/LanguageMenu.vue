<template>
  <div ref="root" class="relative" @keydown.esc="close(true)" @focusout="onFocusOut">
    <button
      ref="trigger" type="button" class="btn-ghost gap-1.5 px-2.5 py-1.5 font-medium"
      :aria-label="t('language')" aria-haspopup="true" :aria-expanded="open" aria-controls="language-menu"
      @click="toggle" @keydown.down.prevent="openAndFocus(0)" @keydown.up.prevent="openAndFocus(LOCALES.length - 1)"
    >
      <FontAwesomeIcon :icon="faGlobe" class="text-muted" />
      <span class="uppercase">{{ locale }}</span>
      <FontAwesomeIcon :icon="faChevronDown" class="text-[10px] text-muted transition-transform" :class="open ? 'rotate-180' : ''" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 -translate-y-1 scale-95"
      leave-active-class="transition duration-100 ease-in" leave-to-class="opacity-0 -translate-y-1 scale-95"
    >
      <ul
        v-show="open" id="language-menu" role="list"
        class="card absolute right-0 top-full z-40 mt-2 w-44 origin-top-right p-1.5 shadow-lg dark:shadow-none"
        @keydown.down.prevent="move(1)" @keydown.up.prevent="move(-1)"
      >
        <!-- Enlaces de verdad: cada idioma tiene su URL, así que se pueden abrir en otra pestaña y los rastreadores los siguen. -->
        <li v-for="code in LOCALES" :key="code">
          <NuxtLink
            ref="items" :to="target(code)" :hreflang="code" :lang="code"
            class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none transition hover:bg-ink/5 focus-visible:bg-ink/5"
            :class="code === locale ? 'font-semibold' : 'text-muted hover:text-ink'"
            :aria-current="code === locale ? 'true' : undefined"
            @click="close(false)"
          >
            <span class="w-6 font-mono text-[11px] uppercase tracking-wider text-muted">{{ code }}</span>
            <span class="flex-1">{{ LOCALE_NAMES[code] }}</span>
            <FontAwesomeIcon v-if="code === locale" :icon="faCheck" class="text-xs text-ink" />
          </NuxtLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { faCheck, faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons'

// Selector de idioma propio en vez del <select> nativo: mismo estilo que el resto de la cabecera y
// enlaces reales a la misma página en cada idioma.
const route = useRoute()
const open = ref(false)
const root = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const items = ref<{ $el: HTMLElement }[]>([])

function target(code: Locale) {
  return { path: localePath(stripLocale(route.path), code), hash: route.hash }
}

function focusItem(index: number) {
  const count = LOCALES.length
  items.value[(index + count) % count]?.$el.focus()
}

function toggle() {
  open.value = !open.value
}

async function openAndFocus(index: number) {
  open.value = true
  await nextTick()
  focusItem(index)
}

function move(step: number) {
  const current = items.value.findIndex(item => item.$el === document.activeElement)
  focusItem(current + step)
}

function close(returnFocus: boolean) {
  if (!open.value) return
  open.value = false
  if (returnFocus) trigger.value?.focus()
}

// Se cierra al sacar el foco del menú (Tab fuera o clic en otra parte de la página).
function onFocusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) close(false)
}

function onPointerDown(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) close(false)
}
onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>
