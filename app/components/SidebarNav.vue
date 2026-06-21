<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavItem {
  id: string
  label: string
  icon: string
  to: string
}

const route = useRoute()
const { theme, toggleTheme } = useTheme()

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: '/assets/icons/home-new.svg', to: '/' },
  { id: 'styles', label: 'Стили', icon: '/assets/icons/styles-new.svg', to: '/basics' },
  { id: 'modules', label: 'Модули', icon: '/assets/icons/modules-new.svg', to: '/modules' },
  { id: 'api', label: 'API', icon: '/assets/icons/api-new.svg', to: '/api' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__panel">
      <div class="sidebar__top">
        <NuxtLink
          to="/search"
          class="sidebar__search"
          :class="{ 'sidebar__search--active': route.path === '/search' }"
          aria-label="Поиск"
        >
          <img src="/assets/icons/search.svg" alt="" width="24" height="24">
        </NuxtLink>

        <nav class="sidebar__nav" aria-label="Основная навигация">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
            class="sidebar__nav-item"
            :class="{ 'sidebar__nav-item--active': route.path === item.to || (item.to !== '/' && route.path.startsWith(item.to)) || (item.id === 'styles' && route.path.startsWith('/basics')) || (item.id === 'api' && route.path.startsWith('/api')) }"
          >
            <span class="sidebar__nav-icon">
              <img :src="item.icon" alt="" width="22" height="22">
            </span>
            <span class="sidebar__nav-label">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="sidebar__bottom">
        <button
          type="button"
          class="sidebar__settings"
          :class="{ 'sidebar__settings--active': theme === 'dark' }"
          :aria-label="theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme"
        >
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
  top: var(--page-inset-top);
  left: var(--page-inset-top);
  bottom: var(--page-inset-bottom);
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: calc(100vh - var(--page-inset-top) - var(--page-inset-bottom));
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
  background: var(--color-panel-bg);
  border-radius: 28px;
  padding: 32px 0 18px;
  transition: background-color 0.3s ease;
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
  background: var(--color-accent-soft);
  transition: background-color 0.2s ease;
  text-decoration: none;
}

.sidebar__search:hover {
  background: var(--color-accent-soft-hover);
}

.sidebar__search--active {
  background: var(--color-accent-active);
}

.sidebar__search img,
.sidebar__nav-icon img {
  filter: brightness(0) saturate(100%);
}

[data-theme='dark'] .sidebar__search img,
[data-theme='dark'] .sidebar__nav-icon img {
  filter: brightness(0) saturate(100%) invert(1);
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
  background: var(--color-panel-hover);
}

.sidebar__nav-item--active {
  background: var(--color-accent-active);
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
  transition: background-color 0.2s ease, transform 0.25s ease;
}

.sidebar__settings img {
  transition: transform 0.35s ease, filter 0.3s ease;
}

[data-theme='dark'] .sidebar__settings img {
  filter: brightness(0) saturate(100%) invert(1);
}

.sidebar__settings:hover {
  background: var(--color-overlay-hover);
}

.sidebar__settings--active {
  background: var(--color-accent-active);
}

.sidebar__settings--active img {
  transform: rotate(180deg);
}

.sidebar__logo {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-card-bg);
  transition: background-color 0.3s ease;
}

@media (max-width: 767px) {
  .sidebar {
    top: auto;
    left: 8px;
    right: 8px;
    bottom: 8px;
    width: auto;
    min-width: 0;
    height: auto;
  }

  .sidebar__panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 24px;
    padding: 10px 14px;
    gap: 8px;
  }

  .sidebar__top,
  .sidebar__bottom {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .sidebar__top {
    flex: 1;
    justify-content: center;
  }

  .sidebar__bottom {
    flex-shrink: 0;
    gap: 4px;
  }

  .sidebar__search {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .sidebar__nav {
    flex-direction: row;
    gap: 4px;
    width: auto;
  }

  .sidebar__nav-item {
    width: auto;
    min-height: 0;
    flex-direction: column;
    padding: 6px 10px;
    gap: 4px;
  }

  .sidebar__nav-label {
    font-size: 10px;
  }

  .sidebar__settings {
    width: 40px;
    height: 40px;
  }

  .sidebar__logo {
    width: 40px;
    height: 40px;
  }

  .sidebar__logo img {
    width: 24px;
    height: 24px;
  }
}

@media (min-width: 2560px) {
  .sidebar__search {
    width: 68px;
    height: 68px;
  }

  .sidebar__nav-item {
    width: 68px;
    min-height: 68px;
  }

  .sidebar__nav-label {
    font-size: 13px;
  }
}
</style>
