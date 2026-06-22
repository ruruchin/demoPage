<script setup lang="ts">
import type { ApiIntegration } from '~/types/apiPage'

defineProps<{
  items: ApiIntegration[]
  activeId: string
  open?: boolean
}>()

defineEmits<{
  select: [id: string]
  close: []
}>()
</script>

<template>
  <aside
    class="guide-sidebar"
    :class="{ 'guide-sidebar--open': open }"
  >
    <div class="guide-sidebar__header">
      <h2 class="guide-sidebar__title">
        Интеграции
      </h2>
      <GuideSidebarToggle />
    </div>

    <nav aria-label="Разделы API">
      <ul class="guide-sidebar__list" data-lenis-prevent>
        <li
          v-for="item in items"
          :key="item.id"
          class="guide-sidebar__item"
        >
          <button
            type="button"
            class="guide-sidebar__link"
            :class="{ 'guide-sidebar__link--active': item.id === activeId }"
            @click="$emit('select', item.id); $emit('close')"
          >
            <ApiBrandIcon :brand="item.id" :size="24" />
            <span class="guide-sidebar__label">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>
