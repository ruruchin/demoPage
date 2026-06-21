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
