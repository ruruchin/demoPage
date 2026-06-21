<script setup lang="ts">
const route = useRoute()

const showOverlay = computed(() => {
  if (!import.meta.dev) return false
  return route.query.overlay === '1'
})

const showCode = ref(false)

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
      <div class="modules-layout">
        <aside class="modules-sidebar">
          <h2 class="modules-sidebar__title">Компоненты</h2>
          <ul class="modules-sidebar__list" data-lenis-prevent>
            <li v-for="comp in components" :key="comp.id" class="modules-sidebar__list-item">
              <button
                class="modules-sidebar__item"
                :class="{ 'modules-sidebar__item--expanded': comp.id === activeComponentId }"
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
                  <svg v-if="comp.id === activeComponentId" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </button>

              <ul v-if="comp.id === activeComponentId" class="modules-sidebar__sublist">
                <li>
                  <button class="modules-sidebar__subitem modules-sidebar__subitem--active">
                    <span class="modules-sidebar__subitem-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 2V8H20" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 13H8" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 17H8" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 9H8" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    Docs
                  </button>
                </li>
                <li>
                  <button class="modules-sidebar__subitem">
                    <span class="modules-sidebar__subitem-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" stroke="#98a2b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    Default
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </aside>

        <div class="modules-content-area">
          <div class="modules-top">
            <main class="modules-main">
              <div class="modules-content">
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

              <div class="modules-bottom-nav">
                <button class="bottom-nav-btn prev">
                  <span class="nav-dir">&lt;- Предыдущий</span>
                  <strong class="nav-title">VideoPlayer</strong>
                </button>
                <button class="bottom-nav-btn next">
                  <span class="nav-dir">Далее -&gt;</span>
                  <strong class="nav-title">FileUploader</strong>
                </button>
              </div>
            </main>

            <aside class="modules-right">
              <div class="right-panel">
                <h3 class="right-panel__label">Компонент</h3>
                <h2 class="right-panel__title">{{ activeComponent.name }}</h2>
                <div class="right-panel__tabs">
                  <button class="tab active">Docs</button>
                  <button class="tab">Default</button>
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
  align-items: flex-start;
}

.modules-content-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  box-sizing: border-box;
}

.modules-top {
  display: flex;
  flex: 1;
  min-width: 0;
}

.modules-page-footer {
  margin-top: 120px;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
}

.modules-sidebar {
  width: 280px;
  flex-shrink: 0;
  align-self: flex-start;
  position: sticky;
  top: 8px;
  height: calc(100vh - 16px);
  max-height: calc(100vh - 16px);
  background: #f1f3f8;
  border-radius: 28px;
  margin: 0 16px 8px 103px;
  padding: 32px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 5;
}

.modules-sidebar__title {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
  margin-left: 16px;
  font-weight: 500;
  flex-shrink: 0;
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
  transition: background 0.2s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modules-sidebar__item:hover {
  background: rgba(255, 255, 255, 0.5);
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

.modules-sidebar__sublist {
  list-style: none;
  padding: 0 0 0 32px;
  margin: 4px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modules-sidebar__subitem {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  transition: background 0.2s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modules-sidebar__subitem:hover {
  background: rgba(255, 255, 255, 0.5);
}

.modules-sidebar__subitem--active {
  background: #bfe9bf;
  font-weight: 500;
}

.modules-sidebar__subitem--active:hover {
  background: #aae0aa;
}

.modules-sidebar__subitem-icon {
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: var(--color-white);
  border-radius: 28px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
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
  background: #f1f3f8;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: background 0.2s;
}

.share-btn:hover {
  background: #e4e7ec;
}

.share-btn--copied {
  background: #cfeecf;
}

.modules-actions-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f3f8;
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
  background: #50B848;
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
  background: #2d2d2d;
  color: #a8e0ac;
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
  background: #f1f3f8;
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
  background: #f1f3f8;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  color: #d63384;
}

.prop-desc {
  color: var(--color-text-primary);
}

.control-btn {
  background: #f1f3f8;
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
  background: var(--color-white);
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
  background: #e4e7ec;
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
  background: #7fd087;
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
  background: #f1f3f8;
}

.bottom-nav-btn.next {
  background: #50B848;
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
  color: #ffffff;
}

.modules-right {
  width: 320px;
  padding: 0 0 8px 0;
}

.right-panel {
  position:fixed;
  border-radius: 28px;
  padding: 32px 24px;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tab {
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
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tab.active {
  background: #F1F3F9;
  border: 1px solid #DEDEDE;
  color: var(--color-text-primary);
}
</style>
