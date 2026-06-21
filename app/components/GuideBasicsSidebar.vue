<script setup lang="ts">
import { basicsGuideNav } from '~/data/basicsGuides'

defineProps<{
  activeSlug: string
  open?: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <aside
    class="guide-sidebar"
    :class="{ 'guide-sidebar--open': open }"
  >
    <h2 class="guide-sidebar__title">
      Основы дизайна
    </h2>

    <nav aria-label="Разделы основ дизайна">
      <ul class="guide-sidebar__list" data-lenis-prevent>
        <li
          v-for="item in basicsGuideNav"
          :key="item.slug"
          class="guide-sidebar__item"
        >
          <NuxtLink
            :to="`/basics/${item.slug}`"
            class="guide-sidebar__link"
            :class="{ 'guide-sidebar__link--active': item.slug === activeSlug }"
            @click="$emit('close')"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.guide-sidebar {
  width: var(--guide-sidebar-width);
  flex-shrink: 0;
  align-self: flex-start;
  position: sticky;
  top: var(--page-inset-top);
  height: calc(100vh - var(--page-inset-top) - var(--page-inset-bottom));
  max-height: calc(100vh - var(--page-inset-top) - var(--page-inset-bottom));
  background: var(--color-panel-bg);
  border-radius: 28px;
  margin: 0 16px var(--page-inset-bottom) var(--guide-sidebar-offset);
  padding: 32px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 5;
  transition: background-color 0.3s ease;
}

.guide-sidebar__title {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0 0 24px 16px;
  font-weight: 500;
  flex-shrink: 0;
}

.guide-sidebar__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
}

.guide-sidebar__list::-webkit-scrollbar {
  display: none;
}

.guide-sidebar__link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  color: var(--color-text-primary);
  background: transparent;
  transition: background 0.2s ease, font-weight 0.2s ease;
  text-decoration: none;
}

.guide-sidebar__link:hover {
  background: var(--color-panel-hover);
}

.guide-sidebar__link--active {
  background: var(--color-accent-active);
  font-weight: 500;
}

@media (max-width: 1279px) {
  .guide-sidebar {
    width: 240px;
    margin-left: calc(var(--sidebar-width) + 12px);
  }
}

@media (max-width: 767px) {
  .guide-sidebar {
    position: fixed;
    top: auto;
    left: 8px;
    right: 8px;
    bottom: 96px;
    width: auto;
    height: min(70vh, 520px);
    max-height: min(70vh, 520px);
    margin: 0;
    transform: translateY(calc(100% + 120px));
    transition: transform 0.3s ease;
    z-index: 20;
  }

  .guide-sidebar--open {
    transform: translateY(0);
  }
}
</style>
