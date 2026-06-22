<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const showOverlay = computed(() => {
  if (!import.meta.dev) return false
  return route.query.overlay === '1'
})

const showCode = ref(false)
const showMobileComponents = ref(false)
type ComponentView = 'docs' | 'default'
const activeView = ref<ComponentView>('docs')

const overlayOpacity = computed(() => {
  const value = Number(route.query.overlayOpacity ?? 0.5)
  if (Number.isNaN(value)) return 0.5
  return Math.min(1, Math.max(0, value))
})

const components = [
  { id: 'AsyncAttachFiles', name: 'AsyncAttachFiles' },
  { id: 'FileUploader', name: 'FileUploader' },
  { id: 'AttachmentHandler', name: 'AttachmentHandler' },
  { id: 'AttachmentPreview', name: 'AttachmentPreview' },
  { id: 'FileSelector', name: 'FileSelector' },
  { id: 'FileMetadata', name: 'FileMetadata' },
  { id: 'FileValidator', name: 'FileValidator' },
  { id: 'DownloadFile', name: 'DownloadFile' },
  { id: 'UploadProgress', name: 'UploadProgress' },
  { id: 'AttachmentList', name: 'AttachmentList' },
  { id: 'UploadQueue', name: 'UploadQueue' },
  { id: 'RemoveAttachment', name: 'RemoveAttachment' },
  { id: 'DropZone', name: 'DropZone' },
  { id: 'DocumentViewer', name: 'DocumentViewer' },
  { id: 'ImageGallery', name: 'ImageGallery' },
  { id: 'VideoPlayer', name: 'VideoPlayer' },
  { id: 'MediaPreview', name: 'MediaPreview' },
  { id: 'ThumbnailGrid', name: 'ThumbnailGrid' },
  { id: 'FileIcon', name: 'FileIcon' },
  { id: 'MimeTypeBadge', name: 'MimeTypeBadge' },
]

function resolveComponentId(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  return components.some(component => component.id === value) ? value : null
}

const activeComponentId = ref(resolveComponentId(route.query.component) ?? 'AsyncAttachFiles')
const activeComponent = computed(() =>
  components.find(component => component.id === activeComponentId.value) ?? components[0],
)

const activeComponentIndex = computed(() =>
  components.findIndex(component => component.id === activeComponentId.value),
)

const componentSearch = ref('')

const filteredComponents = computed(() => {
  const query = componentSearch.value.trim().toLowerCase()
  if (!query) {
    return components
  }

  return components.filter(component =>
    component.name.toLowerCase().includes(query),
  )
})

const hasComponentSearch = computed(() => componentSearch.value.trim().length > 0)

function clearComponentSearch() {
  componentSearch.value = ''
}

const { collapsed: sidebarCollapsed } = useModulesSidebarCollapsed()

const previousComponent = computed(() => {
  const index = activeComponentIndex.value
  const prevIndex = index <= 0 ? components.length - 1 : index - 1
  return components[prevIndex] ?? components[0]
})

const nextComponent = computed(() => {
  const index = activeComponentIndex.value
  const nextIndex = index === -1 || index >= components.length - 1 ? 0 : index + 1
  return components[nextIndex] ?? components[0]
})

const linkCopied = ref(false)
let copyResetTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => route.query.component,
  (value) => {
    const componentId = resolveComponentId(value)
    if (componentId) {
      activeComponentId.value = componentId
    }
  },
)

function getComponentShareUrl(componentId: string) {
  const url = new URL('/modules', window.location.origin)
  url.searchParams.set('component', componentId)
  return url.toString()
}

async function copyComponentLink() {
  const shareUrl = getComponentShareUrl(activeComponentId.value)

  await navigator.clipboard.writeText(shareUrl)

  linkCopied.value = true
  if (copyResetTimer) {
    clearTimeout(copyResetTimer)
  }
  copyResetTimer = setTimeout(() => {
    linkCopied.value = false
  }, 2000)
}

function selectComponent(componentId: string) {
  activeComponentId.value = componentId
  activeView.value = 'docs'
  showMobileComponents.value = false
  router.replace({ query: { ...route.query, component: componentId } })
}

function selectView(view: ComponentView) {
  activeView.value = view
}

function closeMobileComponents() {
  showMobileComponents.value = false
}

function goToPreviousComponent() {
  selectComponent(previousComponent.value.id)
}

function goToNextComponent() {
  selectComponent(nextComponent.value.id)
}

onUnmounted(() => {
  if (copyResetTimer) {
    clearTimeout(copyResetTimer)
  }
})

const propsList = [
  { name: 'name', description: 'Имя поля формы', default: "''", control: 'Text' },
  { name: 'size', description: 'Размер компонента', default: "'medium'", control: 'Select' },
  { name: 'disabled', description: 'Отключение поля', default: 'false', control: 'Boolean' },
  { name: 'label', description: 'Лейбл для поля', default: "''", control: 'Text' },
  { name: 'acceptFiles', description: 'Типы принимаемых файлов', default: "''", control: 'Text' },
  { name: 'multiple', description: 'Множественный выбор файлов', default: 'false', control: 'Boolean' },
  { name: 'maxFilenameLength', description: 'Максимальная длина имени файла', default: '255', control: 'Number' },
]
</script>

<template>
  <div class="page-viewport">
    <div class="page">
      <DesignOverlay :visible="showOverlay" :opacity="overlayOpacity" />

      <SidebarNav />

      <!-- Main Area -->
      <div
        class="modules-layout"
        :class="{ 'modules-layout--sidebar-collapsed': sidebarCollapsed }"
      >
        <button
          type="button"
          class="modules-mobile-bar"
          @click="showMobileComponents = true"
        >
          <span class="modules-mobile-bar__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#7fd087"/>
              <rect x="11" y="3" width="6" height="6" rx="1.5" fill="#7fd087"/>
              <rect x="3" y="11" width="6" height="6" rx="1.5" fill="#7fd087"/>
              <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#7fd087"/>
            </svg>
          </span>
          <span class="modules-mobile-bar__label">Компоненты</span>
          <span class="modules-mobile-bar__current">{{ activeComponent.name }}</span>
        </button>

        <button
          v-show="showMobileComponents"
          type="button"
          class="modules-sidebar-backdrop"
          aria-label="Закрыть список компонентов"
          @click="closeMobileComponents"
        />

        <aside
          class="modules-sidebar"
          :class="{ 'modules-sidebar--open': showMobileComponents }"
        >
          <div class="modules-sidebar__header">
            <h2 class="modules-sidebar__title">Компоненты</h2>
            <ModulesSidebarToggle />
          </div>

          <label class="modules-sidebar__search">
            <span class="modules-sidebar__search-icon" aria-hidden="true">
              <img src="/assets/icons/search.svg" alt="" width="18" height="18">
            </span>
            <input
              v-model="componentSearch"
              type="search"
              class="modules-sidebar__search-input"
              placeholder="Поиск компонента..."
              autocomplete="off"
            >
            <button
              v-if="hasComponentSearch"
              type="button"
              class="modules-sidebar__search-clear"
              aria-label="Очистить поиск"
              @click="clearComponentSearch"
            >
              ×
            </button>
          </label>

          <ul v-if="filteredComponents.length" class="modules-sidebar__list" data-lenis-prevent>
            <li v-for="comp in filteredComponents" :key="comp.id" class="modules-sidebar__list-item">
              <button
                class="modules-sidebar__item"
                :class="{ 'modules-sidebar__item--expanded': comp.id === activeComponentId }"
                @click="selectComponent(comp.id)"
              >
                <span class="modules-sidebar__item-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#7fd087"/>
                    <rect x="11" y="3" width="6" height="6" rx="1.5" fill="#7fd087"/>
                    <rect x="3" y="11" width="6" height="6" rx="1.5" fill="#7fd087"/>
                    <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#7fd087"/>
                  </svg>
                </span>
                <span class="modules-sidebar__item-text">{{ comp.name }}</span>
                <span class="modules-sidebar__item-chevron">
                  <svg
                    class="modules-sidebar__item-chevron-icon"
                    :class="{ 'modules-sidebar__item-chevron-icon--expanded': comp.id === activeComponentId }"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </button>

              <div
                class="modules-sidebar__sublist-collapse"
                :class="{ 'modules-sidebar__sublist-collapse--open': comp.id === activeComponentId }"
              >
                <div class="modules-sidebar__sublist-collapse__inner">
                  <div class="modules-sidebar__sublist">
                    <span
                      class="modules-sidebar__sublist-indicator"
                      :class="{ 'modules-sidebar__sublist-indicator--default': activeView === 'default' }"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      class="modules-sidebar__subitem"
                      :class="{ 'modules-sidebar__subitem--active': activeView === 'docs' }"
                      @click="selectView('docs')"
                    >
                      <span class="modules-sidebar__subitem-icon modules-sidebar__subitem-icon--docs">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      Docs
                    </button>
                    <button
                      type="button"
                      class="modules-sidebar__subitem"
                      :class="{ 'modules-sidebar__subitem--active': activeView === 'default' }"
                      @click="selectView('default')"
                    >
                      <span class="modules-sidebar__subitem-icon modules-sidebar__subitem-icon--muted">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      Default
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <p v-else class="modules-sidebar__empty">
            Компонент не найден
          </p>
        </aside>

        <div class="modules-content-area">
          <div class="modules-top">
            <main class="modules-main">
              <Transition name="modules-switch" mode="out-in">
                <div :key="activeComponentId" class="modules-content">
          <div class="modules-header">
            <h1 class="modules-title">
              {{ activeComponent.name }}
              <button
                type="button"
                class="share-btn"
                :class="{ 'share-btn--copied': linkCopied }"
                :aria-label="linkCopied ? 'Ссылка скопирована' : 'Копировать ссылку на компонент'"
                @click="copyComponentLink"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </h1>
          </div>
          
          <div class="modules-actions-wrapper">
            <button class="btn btn--primary">Button</button>
            <button class="btn-text" @click="showCode = !showCode">{{ showCode ? 'Скрыть код' : 'Показать код' }}</button>
          </div>
          
          <div
            class="code-block-collapse"
            :class="{ 'code-block-collapse--open': showCode }"
          >
            <div class="code-block-collapse__inner">
              <div class="code-block">
                <pre><code>&lt;template&gt;
  &lt;AsyncAttachFiles 
    name="documents"
    size="medium"
    :multiple="true"
  /&gt;
&lt;/template&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="props-table-container">
            <div class="props-header-pill">PROPS</div>
            <table class="props-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Default</th>
                  <th>Control</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prop in propsList" :key="prop.name">
                  <td><code class="prop-code">{{ prop.name }}</code></td>
                  <td class="prop-desc">{{ prop.description }}</td>
                  <td><code class="prop-code">{{ prop.default }}</code></td>
                  <td>
                    <button v-if="prop.control === 'Text'" class="control-btn">Set string</button>
                    <button v-else-if="prop.control === 'Select'" class="control-btn control-btn--dropdown">
                      Choose option... 
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <div v-else-if="prop.control === 'Boolean'" class="toggle-switch">
                      <input type="checkbox" :checked="prop.default === 'true'" class="toggle-checkbox" :id="'toggle-' + prop.name">
                      <label :for="'toggle-' + prop.name" class="toggle-label"></label>
                    </div>
                    <button v-else class="control-btn">Set number</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
              </Transition>

              <div class="modules-bottom-nav">
                <button
                  type="button"
                  class="bottom-nav-btn prev"
                  @click="goToPreviousComponent"
                >
                  <span class="nav-dir">&lt;- Предыдущий</span>
                  <strong class="nav-title">{{ previousComponent.name }}</strong>
                </button>
                <button
                  type="button"
                  class="bottom-nav-btn next"
                  @click="goToNextComponent"
                >
                  <span class="nav-dir">Далее -&gt;</span>
                  <strong class="nav-title">{{ nextComponent.name }}</strong>
                </button>
              </div>
            </main>

            <aside class="modules-right">
              <div class="right-panel">
                <h3 class="right-panel__label">Компонент</h3>
                <Transition name="modules-title-switch" mode="out-in">
                  <h2 :key="activeComponentId" class="right-panel__title">{{ activeComponent.name }}</h2>
                </Transition>
                <div class="right-panel__tabs">
                  <span
                    class="right-panel__tabs-indicator"
                    :class="{ 'right-panel__tabs-indicator--default': activeView === 'default' }"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    class="tab"
                    :class="{ active: activeView === 'docs' }"
                    @click="selectView('docs')"
                  >
                    Docs
                  </button>
                  <button
                    type="button"
                    class="tab"
                    :class="{ active: activeView === 'default' }"
                    @click="selectView('default')"
                  >
                    Default
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <div class="modules-page-footer">
            <PageFooter variant="modules" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page layout adjustments */
.page {
  display: flex;
}

.modules-layout {
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: calc(100vh - var(--page-inset-top));
  align-items: flex-start;
}

.modules-content-area {
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

.modules-top {
  display: flex;
  flex: 1;
  min-width: 0;
}

.modules-page-footer {
  margin-top: 120px;
  margin-bottom: 0;
  width: 100%;
  box-sizing: border-box;
}

.modules-sidebar {
  width: var(--modules-sidebar-width);
  flex-shrink: 0;
  align-self: flex-start;
  position: sticky;
  top: 8px;
  height: calc(100vh - 16px);
  max-height: calc(100vh - 16px);
  background: var(--color-panel-bg);
  border-radius: 28px;
  margin: 0 16px 8px var(--modules-sidebar-offset);
  padding: 32px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 5;
  transition:
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s ease;
}

.modules-mobile-bar,
.modules-sidebar-backdrop {
  display: none;
}

.modules-sidebar__title {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
  font-weight: 500;
  flex: 1;
  min-width: 0;
}

.modules-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  padding-left: 16px;
  flex-shrink: 0;
}

.modules-sidebar-toggle {
  display: none;
}

@media (min-width: 768px) {
  .modules-sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    margin: 0 4px 0 0;
    padding: 0;
    border: 1px solid var(--color-border-light);
    border-radius: 10px;
    background: var(--color-surface-muted);
    color: var(--color-text-primary);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  .modules-sidebar-toggle:hover {
    background: var(--color-panel-hover);
  }

  .modules-layout--sidebar-collapsed .modules-sidebar {
    width: 56px;
    min-width: 56px;
    padding: 32px 12px;
  }

  .modules-layout--sidebar-collapsed .modules-sidebar__header {
    padding: 0;
    margin-bottom: 0;
    justify-content: center;
  }

  .modules-layout--sidebar-collapsed .modules-sidebar__title,
  .modules-layout--sidebar-collapsed .modules-sidebar__search,
  .modules-layout--sidebar-collapsed .modules-sidebar__list,
  .modules-layout--sidebar-collapsed .modules-sidebar__empty {
    display: none;
  }

  .modules-layout--sidebar-collapsed .modules-sidebar-toggle {
    margin: 0;
  }
}

.modules-sidebar__search {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  padding: 0 12px;
  min-height: 44px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  flex-shrink: 0;
  transition: background-color 0.3s ease, border-color 0.2s ease;
}

.modules-sidebar__search:focus-within {
  border-color: var(--color-green-primary);
}

.modules-sidebar__search-icon {
  display: flex;
  flex-shrink: 0;
}

.modules-sidebar__search-icon img {
  filter: brightness(0) saturate(100%);
  opacity: 0.55;
}

[data-theme='dark'] .modules-sidebar__search-icon img {
  filter: brightness(0) saturate(100%) invert(1);
  opacity: 0.7;
}

.modules-sidebar__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--color-text-primary);
  outline: none;
  font-family: inherit;
}

.modules-sidebar__search-input::placeholder {
  color: var(--color-text-muted);
}

.modules-sidebar__search-clear {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.modules-sidebar__search-clear:hover {
  background: var(--color-panel-hover);
  color: var(--color-text-primary);
}

.modules-sidebar__empty {
  margin: 8px 16px 0;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.modules-sidebar__list {
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

.modules-sidebar__list::-webkit-scrollbar {
  display: none;
}

.modules-sidebar__list-item {
  display: flex;
  flex-direction: column;
}

.modules-sidebar__item {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  color: var(--color-text-primary);
  background: transparent;
  transition: background 0.25s ease, font-weight 0.2s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modules-sidebar__item:hover {
  background: var(--color-panel-hover);
}

.modules-sidebar__item--expanded {
  font-weight: 500;
}

.modules-sidebar__item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modules-sidebar__item-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modules-sidebar__item-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.modules-sidebar__item-chevron-icon {
  transition: transform 0.28s ease;
}

.modules-sidebar__item-chevron-icon--expanded {
  transform: rotate(180deg);
}

.modules-sidebar__sublist-collapse {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.32s ease,
    opacity 0.28s ease;
}

.modules-sidebar__sublist-collapse--open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.modules-sidebar__sublist-collapse__inner {
  overflow: hidden;
  min-height: 0;
}

.modules-sidebar__sublist {
  position: relative;
  list-style: none;
  padding: 4px 0 0 32px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modules-sidebar__sublist-indicator {
  position: absolute;
  left: 32px;
  right: 0;
  top: 4px;
  height: calc((100% - 4px - 4px) / 2);
  background: var(--color-accent-active);
  border-radius: 12px;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  pointer-events: none;
}

.modules-sidebar__sublist-indicator--default {
  transform: translateY(calc(100% + 4px));
}

.modules-sidebar__subitem {
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  transition: color 0.2s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modules-sidebar__subitem:hover {
  color: var(--color-text-primary);
}

.modules-sidebar__subitem--active {
  font-weight: 500;
}

.modules-sidebar__subitem-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-icon-stroke);
}

.modules-sidebar__subitem-icon--muted {
  color: var(--color-icon-muted);
}

.modules-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px 0;
  min-width: 0;
}

.modules-content {
  flex: 1;
  background: var(--color-card-bg);
  border-radius: 28px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
  transition: background-color 0.3s ease;
}

.modules-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modules-title {
  font-size: var(--font-size-hero-title);
  font-weight: 400;
  line-height: 1.05;
  display: flex;
  align-items: center;
  gap: 16px;
  letter-spacing: -1.52px;
}

.share-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-panel-bg);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: background 0.2s;
}

.share-btn:hover {
  background: var(--color-share-hover);
}

.share-btn--copied {
  background: var(--color-share-copied);
}

.modules-actions-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-panel-bg);
  padding: 8px 16px;
  border-radius: 16px;
  width: 100%;
}

.btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn--primary {
  background: var(--color-primary-btn);
  color: var(--color-white);
}

.btn-text {
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: 14px 16px;
}

.btn-text:hover {
  opacity: 0.7;
}

.code-block-collapse {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.35s ease,
    opacity 0.3s ease;
}

.code-block-collapse--open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.code-block-collapse__inner {
  overflow: hidden;
  min-height: 0;
  border-radius: 16px;
}

.code-block {
  background: var(--color-code-bg);
  color: var(--color-code-text);
  padding: 24px;
  border-radius: 16px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  margin-top: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .code-block-collapse {
    transition: none;
  }
}

.props-table-container {
  overflow-x: auto;
  margin-top: 16px;
}

.props-header-pill {
  background: var(--color-panel-bg);
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.props-table th {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: 14px;
}

.props-table td {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 15px;
}

.prop-code {
  background: var(--color-prop-code-bg);
  padding: 6px 12px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  color: var(--color-prop-code);
}

.prop-desc {
  color: var(--color-text-primary);
}

.control-btn {
  background: var(--color-control-bg);
  color: var(--color-text-muted);
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.control-btn--dropdown {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  display: inline-block;
}

.toggle-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.toggle-label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-toggle-bg);
  border-radius: 24px;
  cursor: pointer;
  transition: .3s;
}

.toggle-label:before {
  content: "";
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: .3s;
}

.toggle-checkbox:checked + .toggle-label {
  background: var(--color-green-primary);
}

.toggle-checkbox:checked + .toggle-label:before {
  transform: translateX(20px);
}

.modules-bottom-nav {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.bottom-nav-btn {
  flex: 1;
  padding: 32px 40px;
  border-radius: 28px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border: none;
  transition: transform 0.2s;
}

.bottom-nav-btn:hover {
  transform: translateY(-2px);
}

.bottom-nav-btn.prev {
  background: var(--color-panel-bg);
}

.bottom-nav-btn.next {
  background: var(--color-primary-btn);
  text-align: left;
  align-items: flex-start;
}

.nav-dir {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.bottom-nav-btn.next .nav-dir {
  color: rgba(255, 255, 255, 0.8);
}

.nav-title {
  color: var(--color-text-primary);
  font-size: 24px;
  font-weight: 600;
}

.bottom-nav-btn.next .nav-title {
  color: var(--color-white);
}

.modules-right {
  width: var(--modules-right-width);
  flex-shrink: 0;
  padding: 0 0 8px 0;
}

.right-panel {
  position: sticky;
  top: 8px;
  border-radius: 28px;
  padding: 32px 24px;
  height: auto;
  max-height: calc(100vh - 16px);
  box-sizing: border-box;
}

.right-panel__label {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
  font-weight: 400;
}

.right-panel__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text-primary);
}

.right-panel__tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.right-panel__tabs-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 165px;
  height: 48px;
  background: var(--color-tab-active-bg);
  border: 1px solid var(--color-tab-active-border);
  border-radius: 35px;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  pointer-events: none;
}

.right-panel__tabs-indicator--default {
  transform: translateY(calc(100% + 4px));
}

.tab {
  position: relative;
  z-index: 1;
  width: 165px;
  height: 48px;
  padding: 0 20px;
  border-radius: 35px;
  font-size: 15px;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tab.active {
  color: var(--color-text-primary);
}

.modules-switch-enter-active,
.modules-switch-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.modules-switch-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.modules-switch-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.modules-title-switch-enter-active,
.modules-title-switch-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.modules-title-switch-enter-from {
  opacity: 0;
  transform: translateX(8px);
}

.modules-title-switch-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .modules-sidebar__sublist-collapse,
  .modules-sidebar__item-chevron-icon,
  .modules-sidebar__sublist-indicator,
  .right-panel__tabs-indicator,
  .modules-switch-enter-active,
  .modules-switch-leave-active,
  .modules-title-switch-enter-active,
  .modules-title-switch-leave-active {
    transition: none;
  }
}

@media (max-width: 1439px) {
  .modules-sidebar {
    width: 240px;
    margin-left: calc(var(--sidebar-width) + 12px);
  }

  .modules-right {
    width: 260px;
  }

  .modules-content {
    padding: 36px 32px;
  }

  .modules-title {
    font-size: clamp(44px, 5vw, 68px);
    letter-spacing: -1px;
  }
}

@media (max-width: 1279px) {
  .modules-top {
    flex-direction: column;
  }

  .modules-main {
    padding-right: 0;
  }

  .modules-right {
    width: 100%;
    padding: 0 0 12px;
  }

  .right-panel {
    position: static;
    max-height: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 20px;
    padding: 20px 24px;
    background: var(--color-panel-bg);
    border-radius: 20px;
  }

  .right-panel__label {
    margin-bottom: 0;
    width: 100%;
  }

  .right-panel__title {
    margin-bottom: 0;
    font-size: 20px;
    flex: 1;
    min-width: 0;
  }

  .right-panel__tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .right-panel__tabs-indicator {
    display: none;
  }

  .tab {
    width: auto;
    min-width: 112px;
    height: 44px;
  }

  .tab.active {
    background: var(--color-tab-active-bg);
    border: 1px solid var(--color-tab-active-border);
  }

  .modules-content-area {
    padding-right: 16px;
  }

  .modules-page-footer {
    margin-top: 80px;
  }
}

@media (max-width: 767px) {
  .page {
    flex-direction: column;
    padding-bottom: 88px;
  }

  .modules-layout {
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  .modules-mobile-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    width: calc(100% - 32px);
    margin: 12px 16px 0;
    padding: 14px 16px;
    border: none;
    border-radius: 16px;
    background: var(--color-panel-bg);
    cursor: pointer;
    text-align: left;
  }

  .modules-mobile-bar__icon {
    display: flex;
    flex-shrink: 0;
  }

  .modules-mobile-bar__label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
    flex-shrink: 0;
  }

  .modules-mobile-bar__current {
    margin-left: auto;
    font-size: 13px;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .modules-sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 90;
    border: none;
    background: rgba(0, 0, 0, 0.35);
    cursor: pointer;
  }

  .modules-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: min(320px, 88vw);
    height: 100vh;
    max-height: 100vh;
    margin: 0;
    border-radius: 0 28px 28px 0;
    transform: translateX(-105%);
    transition: transform 0.3s ease;
  }

  .modules-sidebar--open {
    transform: translateX(0);
  }

  .modules-content-area {
    padding: 0 16px;
  }

  .modules-content {
    padding: 24px 20px;
    gap: 24px;
    border-radius: 24px;
  }

  .modules-title {
    font-size: clamp(28px, 8vw, 40px);
    letter-spacing: -0.6px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .share-btn {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .modules-actions-wrapper {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 12px;
  }

  .btn,
  .btn-text {
    width: 100%;
    text-align: center;
  }

  .props-table th,
  .props-table td {
    padding: 12px 16px;
    font-size: 14px;
  }

  .props-table th:nth-child(3),
  .props-table td:nth-child(3),
  .props-table th:nth-child(4),
  .props-table td:nth-child(4) {
    min-width: 120px;
  }

  .modules-bottom-nav {
    flex-direction: column;
    gap: 12px;
  }

  .bottom-nav-btn {
    padding: 24px;
    border-radius: 24px;
  }

  .nav-title {
    font-size: 20px;
  }

  .modules-page-footer {
    margin-top: 48px;
    margin-bottom: 8px;
  }

  .right-panel {
    padding: 16px;
    border-radius: 16px;
  }

  .right-panel__title {
    font-size: 18px;
    width: 100%;
  }

  .tab {
    min-width: 0;
    flex: 1;
    justify-content: center;
  }

  .tab.active {
    background: var(--color-tab-active-bg);
    border: 1px solid var(--color-tab-active-border);
  }
}

@media (prefers-reduced-motion: reduce) {
  .modules-sidebar {
    transition: none;
  }
}

@media (min-width: 2560px) {
  .modules-content {
    padding: 64px;
    gap: 40px;
    border-radius: 32px;
  }

  .modules-title {
    font-size: var(--font-size-hero-title);
    letter-spacing: -2px;
    gap: 20px;
  }

  .share-btn {
    width: 56px;
    height: 56px;
  }

  .modules-actions-wrapper {
    padding: 12px 20px;
    border-radius: 20px;
  }

  .btn {
    padding: 16px 32px;
    font-size: 16px;
  }

  .props-table th,
  .props-table td {
    padding: 24px 32px;
    font-size: 16px;
  }

  .bottom-nav-btn {
    padding: 40px 48px;
    border-radius: 32px;
  }

  .nav-title {
    font-size: 28px;
  }

  .right-panel {
    padding: 40px 32px;
    border-radius: 32px;
  }

  .right-panel__title {
    font-size: 28px;
    margin-bottom: 32px;
  }

  .tab {
    width: 100%;
    max-width: 200px;
    height: 52px;
    font-size: 16px;
  }

  .modules-page-footer {
    margin-top: 140px;
  }

  .modules-sidebar {
    padding: 40px 20px;
    border-radius: 32px;
  }

  .modules-sidebar__item {
    font-size: 16px;
    padding: 14px 18px;
  }
}
</style>
