<template>
  <article class="mx-auto max-w-6xl px-4 sm:px-6">
    <nav :aria-label="t('sub.breadcrumb')" class="meta border-b border-ink/15 py-3">
      <ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><NuxtLink :to="pageLink('home')" class="hover:text-ink">Heavnd</NuxtLink></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" class="text-ink">{{ t('contact.short') }}</li>
      </ol>
    </nav>

    <div class="grid gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-y-0">
      <header class="lg:col-span-5">
        <h1 class="display text-5xl leading-[1.02] text-balance sm:text-7xl">{{ t('contact.h1') }}</h1>
        <p class="mt-6 max-w-xl text-xl leading-relaxed text-muted text-pretty">{{ t('contact.lede') }}</p>
      </header>

      <!-- En móvil, el formulario justo después del título; en escritorio, a la derecha de todo lo demás. -->
      <div class="lg:col-span-7 lg:row-span-2">
        <div v-if="sent" class="card p-6 sm:p-8" role="status">
          <h2 class="display text-3xl">{{ t('contact.sentTitle') }}</h2>
          <p class="mt-3 text-muted text-pretty">{{ t('contact.sentText', { email: sentTo }) }}</p>
          <button class="btn-ghost -ml-4 mt-4" @click="reset">{{ t('contact.another') }}</button>
        </div>

        <form v-else class="card space-y-5 p-6 sm:p-8" @submit.prevent="submit">
          <div>
            <label class="field-label" for="c-topic">{{ t('contact.topic') }}</label>
            <select id="c-topic" v-model="topic" class="field" required>
              <option v-for="tp in TOPICS" :key="tp" :value="tp">{{ t(`contact.topics.${tp}`) }}</option>
            </select>
          </div>
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="field-label" for="c-name">{{ t('contact.name') }} <span class="text-muted">({{ t('contact.optional') }})</span></label>
              <input id="c-name" v-model="name" class="field" maxlength="80" autocomplete="name">
            </div>
            <div>
              <label class="field-label" for="c-email">{{ t('contact.email') }}</label>
              <input id="c-email" v-model="email" class="field" type="email" required maxlength="255" autocomplete="email">
            </div>
          </div>
          <div>
            <label class="field-label" for="c-message">{{ t('contact.message') }}</label>
            <textarea id="c-message" v-model="message" class="field min-h-40" required minlength="10" maxlength="5000" />
          </div>
          <!-- Campo trampa: oculto para las personas; si llega con algo, lo ha rellenado un robot. -->
          <div class="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
            <label for="c-website">Website</label>
            <input id="c-website" v-model="website" tabindex="-1" autocomplete="off">
          </div>

          <p class="text-xs leading-relaxed text-muted text-pretty">{{ t('contact.privacy') }}</p>
          <p v-if="error" class="text-sm text-red-700 dark:text-red-400" role="alert">{{ error }}</p>
          <button class="btn-primary px-5 py-3 text-base" :disabled="sending">
            {{ sending ? t('contact.sending') : t('contact.send') }}
          </button>
        </form>
      </div>

      <section class="lg:col-span-5">
        <h2 class="meta">{{ t('contact.direct') }}</h2>
        <ul class="mt-3 text-sm">
          <li v-for="m in MAILBOXES" :key="m.email" class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ink/10 py-3">
            <span class="text-muted">{{ m.label }}</span>
            <a :href="`mailto:${m.email}`" class="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{{ m.email }}</a>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'

/**
 * Formulario de contacto. La landing es estática: nginx pasa POST /api/contact a la API de Meald, que manda
 * el mensaje por correo al buzón del tema (contact@, el de cada app, privacy@ o security@) con Reply-To a
 * quien escribe. ?topic=choosd (o cualquier otro tema) lo deja elegido al llegar.
 */
const TOPICS = ['GENERAL', 'CHOOSD', 'MEALD', 'TOGETHRD', 'SIMPLFD', 'PRIVACY', 'SECURITY'] as const
type Topic = (typeof TOPICS)[number]

const MAILBOXES = computed(() => [
  { label: t('contact.topics.GENERAL'), email: 'contact@heavnd.com' },
  ...APPS.map(app => ({ label: app.name, email: `${app.id}@heavnd.com` })),
  { label: t('contact.topics.PRIVACY'), email: 'privacy@heavnd.com' },
  { label: t('contact.topics.SECURITY'), email: 'security@heavnd.com' },
])

const topic = ref<Topic>('GENERAL')
const name = ref('')
const email = ref('')
const message = ref('')
const website = ref('')
const sending = ref(false)
const sent = ref(false)
const sentTo = ref('')
const error = ref('')

// HTML prerenderizado: al hidratar, el router monta con la URL del prerender (sin query) y repone la real
// justo después. Por eso se vigila la query en vez de leerla una vez al montar.
const route = useRoute()
watch(() => route.query.topic, (value) => {
  const wanted = String(value ?? '').toUpperCase()
  if ((TOPICS as readonly string[]).includes(wanted)) topic.value = wanted as Topic
}, { immediate: true })

async function submit() {
  sending.value = true
  error.value = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      headers: { 'Accept-Language': locale.value },
      body: {
        topic: topic.value, name: name.value, email: email.value, message: message.value,
        language: locale.value, website: website.value,
      },
    })
    sentTo.value = email.value
    sent.value = true
  } catch (e) {
    error.value = e instanceof FetchError && e.status === 429 ? t('contact.tooMany') : t('contact.failed')
  } finally {
    sending.value = false
  }
}

function reset() {
  message.value = ''
  sent.value = false
}

usePageSeo({
  id: 'contact',
  title: () => t('contact.title'),
  ogTitle: () => t('contact.h1'),
  description: () => t('contact.description'),
  image: 'heavnd',
  breadcrumb: () => [{ name: t('contact.short'), id: 'contact' }],
  webPage: () => ({ '@type': 'ContactPage' }),
})
</script>
