<script setup lang="ts">
const { collapsed, toggle } = useGuideSidebarCollapsed()
</script>

<template>
  <button
    type="button"
    class="guide-sidebar-toggle"
    :class="{ 'guide-sidebar-toggle--collapsed': collapsed }"
    :aria-label="collapsed ? 'Показать боковую панель' : 'Скрыть боковую панель'"
    :aria-expanded="!collapsed"
    @click="toggle"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        v-if="collapsed"
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        v-else
        d="M10 4L6 8L10 12"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
