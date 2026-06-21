<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavItem {
  id: string
  label: string
  icon: string
  to: string
}

const route = useRoute()

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: '/assets/icons/home-new.svg', to: '/' },
  { id: 'styles', label: 'Стили', icon: '/assets/icons/styles-new.svg', to: '/styles' },
  { id: 'modules', label: 'Модули', icon: '/assets/icons/modules-new.svg', to: '/modules' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__panel">
      <div class="sidebar__top">
        <button class="sidebar__search" type="button" aria-label="Поиск">
          <img src="/assets/icons/search.svg" alt="" width="24" height="24">
        </button>

        <nav class="sidebar__nav" aria-label="Основная навигация">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
            class="sidebar__nav-item"
            :class="{ 'sidebar__nav-item--active': route.path === item.to || (item.to !== '/' && route.path.startsWith(item.to)) }"
          >
            <span class="sidebar__nav-icon">
              <img :src="item.icon" alt="" width="22" height="22">
            </span>
            <span class="sidebar__nav-label">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="sidebar__bottom">
        <button class="sidebar__settings" type="button" aria-label="Настройки">
          <img src="/assets/icons/settings.svg" alt="" width="24" height="24">
        </button>

        <div class="sidebar__logo">
          <img src="/assets/icons/logo.svg" alt="Центр-инвест" width="32" height="32">
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 8px;
  left: 8px;
  bottom: 8px;
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: calc(100vh - 16px);
  display: flex;
  justify-content: center;
  padding: 0;
  background: transparent;
  z-index: 10;
}

.sidebar__panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f1f3f8;
  border-radius: 28px;
  padding: 32px 0 18px;
}

.sidebar__top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.sidebar__search {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #cfeecf;
  transition: background-color 0.2s ease;
}

.sidebar__search:hover {
  background: #c5e8c6;
}

.sidebar__search img,
.sidebar__nav-icon img,
.sidebar__settings img {
  filter: brightness(0) saturate(100%);
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.sidebar__nav-item {
  width: 58px;
  min-height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 12px;
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
  text-decoration: none;
}

.sidebar__nav-item:hover {
  background: rgba(255, 255, 255, 0.55);
}

.sidebar__nav-item--active {
  background: #bfe9bf;
  color: var(--color-text-primary);
}

.sidebar__nav-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar__nav-label {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 100;
  line-height: 1.2;
  text-align: center;
}

.sidebar__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.sidebar__settings {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  transition: background-color 0.2s ease;
}

.sidebar__settings:hover {
  background: rgba(255, 255, 255, 0.65);
}

.sidebar__logo {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-white);
}
</style>
