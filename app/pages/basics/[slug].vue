<script setup lang="ts">
import { getBasicsGuide } from '~/data/basicsGuides'
import { tieHangingWords } from '~/utils/russianTypography'

const t = tieHangingWords

const route = useRoute()

const slug = computed(() => {
  const value = route.params.slug
  return typeof value === 'string' ? value : value[0] ?? ''
})

const guide = computed(() => getBasicsGuide(slug.value))

watch(guide, (value) => {
  if (!value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Раздел не найден',
    })
  }
}, { immediate: true })

const showOverlay = computed(() => {
  if (!import.meta.dev) return false
  return route.query.overlay === '1'
})

const overlayOpacity = computed(() => {
  const value = Number(route.query.overlayOpacity ?? 0.5)
  if (Number.isNaN(value)) return 0.5
  return Math.min(1, Math.max(0, value))
})

const activeTabId = ref(guide.value.tabs[0]?.id ?? '')
const activeTocId = ref(guide.value.tabs[0]?.toc[0]?.id ?? '')
const showMobileNav = ref(false)

const activeTab = computed(() =>
  guide.value?.tabs.find(tab => tab.id === activeTabId.value) ?? guide.value?.tabs[0],
)

watch(slug, () => {
  const nextGuide = getBasicsGuide(slug.value)
  if (!nextGuide) return
  activeTabId.value = nextGuide.tabs[0]?.id ?? ''
  activeTocId.value = nextGuide.tabs[0]?.toc[0]?.id ?? ''
})

watch(activeTabId, (tabId) => {
  const tab = guide.value?.tabs.find(item => item.id === tabId)
  activeTocId.value = tab?.toc[0]?.id ?? ''
})

const { scrollToSection } = useGuideTocScrollSpy({
  toc: computed(() => activeTab.value?.toc),
  sectionIdPrefix: 'guide-section-',
  activeTocId,
  contentKey: activeTabId,
})

useSeoMeta({
  title: () => `${guide.value?.title ?? 'Основы'} — Центр-инвест DS`,
  description: () => guide.value?.subtitle ?? '',
})

function selectTab(tabId: string) {
  activeTabId.value = tabId
}

function closeMobileNav() {
  showMobileNav.value = false
}

const { collapsed: sidebarCollapsed } = useGuideSidebarCollapsed()
</script>

<template>
  <div class="page-viewport">
    <div class="page">
      <DesignOverlay :visible="showOverlay" :opacity="overlayOpacity" />

      <SidebarNav />

      <div
        class="guide-layout"
        :class="{ 'guide-layout--sidebar-collapsed': sidebarCollapsed }"
      >
        <button
          type="button"
          class="guide-mobile-bar"
          @click="showMobileNav = true"
        >
          <span class="guide-mobile-bar__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
              <rect x="11" y="3" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
              <rect x="3" y="11" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
              <rect x="11" y="11" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
            </svg>
          </span>
          <span class="guide-mobile-bar__label">Основы дизайна</span>
          <span class="guide-mobile-bar__current">{{ guide?.sidebarLabel }}</span>
        </button>

        <button
          v-show="showMobileNav"
          type="button"
          class="guide-sidebar-backdrop"
          aria-label="Закрыть навигацию"
          @click="closeMobileNav"
        />

        <GuideBasicsSidebar
          :active-slug="slug"
          :open="showMobileNav"
          @close="closeMobileNav"
        />

        <div class="guide-content-area">
          <div class="guide-top">
            <div class="guide-main">
              <section class="guide-hero">
                <div class="guide-hero__card guide-hero__card--text">
                  <img
                    class="guide-hero__logo"
                    src="/assets/icons/logo.svg"
                    alt=""
                    width="52"
                    height="52"
                  >
                  <div class="guide-hero__text">
                    <h1 class="guide-hero__title">
                      {{ t(guide?.title ?? '') }}
                    </h1>
                    <p class="guide-hero__subtitle">
                      {{ t(guide?.subtitle ?? '') }}
                    </p>
                  </div>
                </div>

                <div class="guide-hero__card guide-hero__card--media">
                  <GuideMediaPanel :media="guide!.media" />
                </div>
              </section>

              <nav class="guide-tabs" aria-label="Разделы страницы">
                <button
                  v-for="tab in guide?.tabs"
                  :key="tab.id"
                  type="button"
                  class="guide-tabs__item"
                  :class="{ 'guide-tabs__item--active': tab.id === activeTabId }"
                  @click="selectTab(tab.id)"
                >
                  {{ tab.label }}
                </button>
              </nav>

              <div class="guide-body">
                <article class="guide-article">
                  <Transition name="guide-tab-switch" mode="out-in">
                    <div :key="activeTabId" class="guide-article__panel">
                      <section
                        v-for="section in activeTab?.sections"
                        :id="`guide-section-${section.id}`"
                        :key="section.id"
                        class="guide-section"
                      >
                        <h2
                          v-if="section.title"
                          class="guide-section__title"
                        >
                          {{ t(section.title) }}
                        </h2>

                        <GuideSectionBlocks
                          :blocks="section.blocks"
                          :section-id="section.id"
                          :slug="slug"
                        />
                      </section>
                    </div>
                  </Transition>
                </article>

                <aside class="guide-toc" aria-label="На этой странице">
                  <p class="guide-toc__label">
                    На этой странице
                  </p>
                  <ul class="guide-toc__list">
                    <li
                      v-for="item in activeTab?.toc"
                      :key="item.id"
                    >
                      <button
                        type="button"
                        class="guide-toc__link"
                        :class="{ 'guide-toc__link--active': item.id === activeTocId }"
                        @click="scrollToSection(item.sectionId, item.id)"
                      >
                        {{ item.label }}
                      </button>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>

          <div class="guide-page-footer">
            <PageFooter variant="modules" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
}

.guide-layout {
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: calc(100vh - var(--page-inset-top));
  align-items: flex-start;
}

.guide-mobile-bar,
.guide-sidebar-backdrop {
  display: none;
}

.guide-content-area {
  flex: 1;
  min-width: 0;
  min-height: 100%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-bottom: var(--page-inset-bottom);
  box-sizing: border-box;
}

.guide-top {
  display: flex;
  flex: 1;
  min-width: 0;
}

.guide-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  --guide-content-inset: 48px;
}

.guide-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  min-height: 420px;
}

.guide-hero__card {
  background: var(--color-hero-bg);
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.guide-hero__card--text {
  border-radius: var(--radius-xl) var(--radius-xl) 180px var(--radius-xl);
  padding: 40px var(--guide-content-inset) 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.guide-hero__card--media {
  border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) 180px;
  min-height: 280px;
}

.guide-hero__title {
  font-size: clamp(40px, 5vw, var(--font-size-hero-title));
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -1.2px;
  color: var(--color-text-primary);
  margin: 0 0 20px;
}

.guide-hero__subtitle {
  max-width: 640px;
  font-size: var(--font-size-hero-subtitle);
  line-height: 1.45;
  color: var(--color-text-secondary);
  margin: 0;
}

.guide-page-footer {
  margin-top: 120px;
  width: 100%;
}

.guide-tab-switch-enter-active,
.guide-tab-switch-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.guide-tab-switch-enter-from,
.guide-tab-switch-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 1439px) {
  .guide-hero {
    min-height: 360px;
  }
}

@media (max-width: 1279px) {
  .guide-hero {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .guide-hero__card--text {
    border-radius: 28px 28px 120px 28px;
    padding: 28px var(--guide-content-inset) 40px;
  }

  .guide-main {
    --guide-content-inset: 24px;
  }

  .guide-hero__card--media {
    border-radius: 28px 28px 28px 120px;
    min-height: 240px;
  }

  .guide-content-area {
    padding-right: 16px;
  }
}

@media (max-width: 767px) {
  .page {
    flex-direction: column;
    padding-bottom: 88px;
  }

  .guide-layout {
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  .guide-mobile-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    width: calc(100% - 32px);
    margin: 0 16px 12px;
    padding: 14px 16px;
    border-radius: 20px;
    background: var(--color-panel-bg);
    text-align: left;
  }

  .guide-mobile-bar__label {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .guide-mobile-bar__current {
    margin-left: auto;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 45%;
  }

  .guide-sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    border: none;
    z-index: 15;
  }

  .guide-content-area {
    padding: 0 16px 0;
  }

  .guide-page-footer {
    margin-top: 64px;
  }
}

@media (min-width: 2560px) {
  .guide-hero {
    min-height: 520px;
    gap: 12px;
  }

  .guide-hero__card--text {
    padding: 52px var(--guide-content-inset) 72px;
  }

  .guide-main {
    --guide-content-inset: 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .guide-tab-switch-enter-active,
  .guide-tab-switch-leave-active {
    transition: none;
  }
}
</style>
