<template>
  <article>
    <section class="mx-auto max-w-6xl px-4 sm:px-6">
      <!-- Migas de pan visibles: las mismas que el BreadcrumbList del @graph. -->
      <nav :aria-label="t('sub.breadcrumb')" class="meta border-b border-ink/15 py-3">
        <ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><NuxtLink :to="pageLink('home')" class="hover:text-ink">Heavnd</NuxtLink></li>
          <li aria-hidden="true">/</li>
          <li><NuxtLink :to="pageLink(app.id)" class="hover:text-ink">{{ app.name }}</NuxtLink></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" class="text-ink">{{ copy.short }}</li>
        </ol>
      </nav>

      <header class="grid gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <p class="meta flex items-center gap-2">
            <span class="size-2 rounded-full" :class="app.accent.bg" aria-hidden="true" />
            {{ t(`sub.kind.${page.kind}`, { app: app.name }) }}
          </p>
          <h1 class="display mt-4 text-5xl leading-[1.02] text-balance sm:text-7xl">{{ copy.h1 }}</h1>
          <p class="mt-6 max-w-2xl text-xl leading-relaxed text-muted text-pretty">{{ copy.lede }}</p>
          <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a v-if="copy.download" :href="copy.download.href" class="btn-primary px-5 py-3 text-base" download>
              <FontAwesomeIcon :icon="faDownload" /> {{ copy.download.button }}
            </a>
            <a
              :href="withRef(app.page.signupUrl, page.id)"
              :class="copy.download ? 'text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink' : 'btn-primary px-5 py-3 text-base'"
            >{{ copy.cta.button }}</a>
          </div>
          <p v-if="copy.download" class="meta mt-4">{{ copy.download.note }}</p>
          <p class="meta mt-6">
            <time :datetime="page.dateModified">{{ t('sub.updated', { date: formatDate(page.dateModified) }) }}</time>
          </p>
        </div>
        <aside class="lg:col-span-4">
          <div class="rounded-3xl p-6 sm:p-8" :class="app.accent.tint">
            <p class="meta">{{ t('sub.answer') }}</p>
            <p class="mt-3 text-lg leading-relaxed text-pretty">{{ copy.answer }}</p>
          </div>
        </aside>
      </header>
    </section>

    <section class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div class="flex flex-col gap-14 lg:ml-[33.333%]">
        <section v-for="block in copy.blocks" :key="block.h2" class="border-t border-ink/15 pt-6">
          <h2 class="display text-3xl leading-tight text-balance sm:text-4xl">{{ block.h2 }}</h2>
          <p v-for="(text, i) in block.paragraphs" :key="i" class="mt-4 max-w-2xl leading-relaxed text-muted text-pretty">{{ text }}</p>
          <ul v-if="block.list" class="mt-5 max-w-2xl">
            <li v-for="item in block.list" :key="item" class="flex gap-3 border-t border-ink/10 py-3 text-pretty">
              <span class="mt-2 size-2 shrink-0 rounded-full" :class="app.accent.bg" aria-hidden="true" />{{ item }}
            </li>
          </ul>
          <ol v-if="block.steps" class="mt-5 max-w-2xl">
            <li v-for="(step, i) in block.steps" :key="step.title" class="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 py-5">
              <span class="display text-4xl leading-none text-ink/25">{{ i + 1 }}</span>
              <div>
                <h3 class="display text-2xl">{{ step.title }}</h3>
                <p class="mt-1.5 text-muted text-pretty">{{ step.text }}</p>
              </div>
            </li>
          </ol>
          <div v-if="block.table" class="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
            <table class="w-full min-w-[32rem] text-left text-sm">
              <thead class="bg-ink/5">
                <tr><th v-for="cell in block.table.head" :key="cell" scope="col" class="px-4 py-3 font-medium">{{ cell }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in block.table.rows" :key="i" class="border-t border-ink/10">
                  <td v-for="(cell, j) in row" :key="j" class="px-4 py-3 align-top" :class="j === 0 ? 'font-medium' : 'text-muted'">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="border-t border-ink/15 pt-6">
          <h2 class="display text-3xl sm:text-4xl">{{ t('sub.faq') }}</h2>
          <div class="mt-6">
            <details v-for="item in copy.faq" :key="item.q" class="group border-t border-ink/15 py-5 last:border-b">
              <summary class="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <h3 class="display text-2xl leading-snug">{{ item.q }}</h3>
                <FontAwesomeIcon :icon="faPlus" class="mt-2 text-xl text-muted transition-transform group-open:rotate-45" />
              </summary>
              <p class="mt-3 max-w-2xl text-muted text-pretty">{{ item.a }}</p>
            </details>
          </div>
        </section>
      </div>
    </section>

    <!-- Cierre: llamada a la app y lecturas relacionadas (enlazado interno). -->
    <section class="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div class="flex flex-col items-start gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12" :class="app.accent.tint">
        <div class="flex items-center gap-4">
          <AppIcon :glyph="app.glyph" :fill-class="app.icon.fill" :bg="app.icon.bg" size-class="size-12" />
          <div>
            <p class="display text-3xl leading-tight text-balance">{{ copy.cta.title }}</p>
            <p class="mt-1 text-muted text-pretty">{{ copy.cta.text }}</p>
          </div>
        </div>
        <a :href="withRef(app.page.signupUrl, page.id)" class="btn-primary shrink-0 px-5 py-3 text-base">{{ copy.cta.button }}</a>
      </div>

      <nav v-if="related.length" class="mt-14" :aria-label="t('sub.related')">
        <p class="meta">{{ t('sub.related') }}</p>
        <ul class="mt-3 grid gap-4 md:grid-cols-3">
          <li v-for="link in related" :key="link.to">
            <NuxtLink :to="link.to" class="card group flex h-full items-center justify-between gap-4 p-5">
              <span class="display text-xl leading-snug">{{ link.name }}</span>
              <FontAwesomeIcon :icon="faArrowRight" class="text-muted transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </section>
  </article>
</template>

<script setup lang="ts">
import { faArrowRight, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'
import type { Subpage } from '~/content/types'

const props = defineProps<{ page: Subpage }>()
const app = computed(() => APPS.find(a => a.id === props.page.app)!)
const copy = computed(() => props.page.copy[locale.value])

/** Enlaces relacionados: subpáginas por su nombre corto, páginas de app por su nombre. */
const related = computed(() => props.page.related.flatMap((id) => {
  const to = pageLink(id)
  if (!to) return []
  const sub = SUBPAGES[id]
  const name = sub ? sub.copy[locale.value].short : (APPS.find(a => a.id === id)?.name ?? id)
  return [{ to, name }]
}))

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(intlTag.value, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${iso}T12:00:00Z`))
}
</script>
