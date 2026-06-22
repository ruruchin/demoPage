<script setup lang="ts">
import { apiIntegrations, apiPageMeta, apiPlatformBadges } from '~/data/apiPageContent'
import { BASICS_VIDEO_POSTER } from '~/utils/basicsHeroMedia'

const route = useRoute()

const showOverlay = computed(() => {
  if (!import.meta.dev) return false
  return route.query.overlay === '1'
})

const overlayOpacity = computed(() => {
  const value = Number(route.query.overlayOpacity ?? 0.5)
  if (Number.isNaN(value)) return 0.5
  return Math.min(1, Math.max(0, value))
})

const activeIntegrationId = ref(apiIntegrations[0]?.id ?? 'overview')
const activeTocId = ref(apiIntegrations[0]?.toc[0]?.id ?? '')
const showMobileNav = ref(false)

const activeIntegration = computed(() =>
  apiIntegrations.find(item => item.id === activeIntegrationId.value) ?? apiIntegrations[0],
)

watch(activeIntegrationId, (id) => {
  const integration = apiIntegrations.find(item => item.id === id)
  activeTocId.value = integration?.toc[0]?.id ?? ''
})

useSeoMeta({
  title: 'API и интеграции — Центр-инвест DS',
  description: apiPageMeta.subtitle,
})

function selectIntegration(id: string) {
  activeIntegrationId.value = id
}

function scrollToSection(sectionId: string, tocId: string) {
  activeTocId.value = tocId
  document.getElementById(`api-section-${sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function closeMobileNav() {
  showMobileNav.value = false
}

const { collapsed: sidebarCollapsed } = useGuideSidebarCollapsed()

const heroMedia = {
  kind: 'video' as const,
  src: '/assets/videos/basics/API.mp4',
  poster: BASICS_VIDEO_POSTER,
  autoplay: true,
  muted: true,
  loop: true,
  playsInline: true,
  alt: 'API и интеграции',
}
</script>

<template>
  <div class="page-viewport">
    <div class="page">
      <DesignOverlay :visible="showOverlay" :opacity="overlayOpacity" />

      <SidebarNav />

      <div
        class="guide-layout api-layout"
        :class="{ 'guide-layout--sidebar-collapsed': sidebarCollapsed }"
      >
        <button
          type="button"
          class="guide-mobile-bar"
          @click="showMobileNav = true"
        >
          <span class="guide-mobile-bar__icon" aria-hidden="true">
            <ApiBrandIcon :brand="activeIntegrationId" :size="20" />
          </span>
          <span class="guide-mobile-bar__label">API</span>
          <span class="guide-mobile-bar__current">{{ activeIntegration?.label }}</span>
        </button>

        <button
          v-show="showMobileNav"
          type="button"
          class="guide-sidebar-backdrop"
          aria-label="Закрыть навигацию"
          @click="closeMobileNav"
        />

        <ApiIntegrationSidebar
          :items="apiIntegrations"
          :active-id="activeIntegrationId"
          :open="showMobileNav"
          @select="selectIntegration"
          @close="closeMobileNav"
        />

        <div class="guide-content-area">
          <div class="guide-top">
            <div class="guide-main api-main">
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
                      {{ apiPageMeta.title }}
                    </h1>
                    <p class="guide-hero__subtitle">
                      {{ apiPageMeta.subtitle }}
                    </p>
                  </div>
                </div>

                <div class="guide-hero__card guide-hero__card--media">
                  <GuideMediaPanel :media="heroMedia" />
                </div>
              </section>

              <nav class="api-badges" aria-label="Поддерживаемые платформы">
                <span
                  v-for="badge in apiPlatformBadges"
                  :key="badge.id"
                  class="api-badge"
                >
                  <ApiBrandIcon :brand="badge.id" :size="18" />
                  {{ badge.label }}
                </span>
              </nav>

              <div class="guide-body">
                <article class="guide-article">
                  <Transition name="guide-tab-switch" mode="out-in">
                    <div :key="activeIntegrationId" class="guide-article__panel">
                      <section
                        v-for="section in activeIntegration?.sections"
                        :id="`api-section-${section.id}`"
                        :key="section.id"
                        class="guide-section"
                      >
                        <h2
                          v-if="section.title"
                          class="guide-section__title"
                        >
                          {{ section.title }}
                        </h2>

                        <template
                          v-for="(block, blockIndex) in section.blocks"
                          :key="`${section.id}-block-${blockIndex}`"
                        >
                          <p
                            v-if="block.type === 'text'"
                            class="guide-section__paragraph"
                          >
                            {{ block.content }}
                          </p>

                          <ul
                            v-else-if="block.type === 'list'"
                            class="guide-section__list"
                          >
                            <li
                              v-for="(item, index) in block.items"
                              :key="`${section.id}-item-${index}`"
                              class="guide-section__item"
                            >
                              <span class="guide-section__icon" aria-hidden="true">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="var(--color-green-primary)"/>
                                </svg>
                              </span>
                              <span class="guide-section__text">{{ item }}</span>
                            </li>
                          </ul>

                          <ApiCodeBlock
                            v-else-if="block.type === 'code'"
                            :title="block.title"
                            :content="block.content"
                          />
                        </template>
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
                      v-for="item in activeIntegration?.toc"
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

.api-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.api-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: var(--guide-content-inset);
}

.api-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  background: var(--color-panel-bg);
  border: 1px solid var(--color-border-light);
}

.guide-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 48px;
  align-items: start;
  padding-left: var(--guide-content-inset);
  box-sizing: border-box;
}

.guide-article {
  min-width: 0;
}

.guide-section + .guide-section {
  margin-top: 48px;
}

.guide-section__title {
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.4px;
  margin: 0 0 20px;
  color: var(--color-text-primary);
}

.guide-section__paragraph {
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 820px;
}

.guide-section__list {
  list-style: none;
  padding: 0;
  margin: 0 0 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.guide-section__item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.guide-section__icon {
  flex-shrink: 0;
  margin-top: 4px;
}

.guide-section__text {
  font-size: 18px;
  line-height: 1.55;
  color: var(--color-text-primary);
}

.guide-toc {
  position: sticky;
  top: calc(var(--page-inset-top) + 16px);
}

.guide-toc__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.guide-toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.guide-toc__link {
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
}

.guide-toc__link:hover {
  background: var(--color-panel-hover);
}

.guide-toc__link--active {
  background: var(--color-surface-muted);
  font-weight: 500;
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

  .guide-body {
    grid-template-columns: minmax(0, 1fr) 200px;
    gap: 32px;
  }

  .guide-section__text,
  .guide-section__paragraph {
    font-size: 16px;
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

  .guide-hero__card--media {
    border-radius: 28px 28px 28px 120px;
    min-height: 240px;
  }

  .api-main {
    --guide-content-inset: 24px;
  }

  .guide-body {
    grid-template-columns: 1fr;
  }

  .guide-toc {
    position: static;
    padding-top: 8px;
    border-top: 1px solid var(--color-border-light);
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
    border: none;
    cursor: pointer;
    font-family: inherit;
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

  .api-main {
    --guide-content-inset: 64px;
  }

  .guide-section__text,
  .guide-section__paragraph {
    font-size: 20px;
  }

  .guide-body {
    gap: 64px;
    grid-template-columns: minmax(0, 1fr) 280px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .guide-tab-switch-enter-active,
  .guide-tab-switch-leave-active {
    transition: none;
  }
}
</style>
