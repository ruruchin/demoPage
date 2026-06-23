<script setup lang="ts">
const route = useRoute()
const router = useRouter()

type SearchCategory = 'all' | 'components' | 'basics' | 'pages'

interface SearchItem {
  id: string
  title: string
  description: string
  href: string
  category: Exclude<SearchCategory, 'all'>
  keywords?: string[]
}

const showOverlay = computed(() => {
  if (!import.meta.dev) return false
  return route.query.overlay === '1'
})

const overlayOpacity = computed(() => {
  const value = Number(route.query.overlayOpacity ?? 0.5)
  if (Number.isNaN(value)) return 0.5
  return Math.min(1, Math.max(0, value))
})

const searchInput = ref(typeof route.query.q === 'string' ? route.query.q : '')
const activeCategory = ref<SearchCategory>('all')

const categories: { id: SearchCategory, label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'components', label: 'Компоненты' },
  { id: 'basics', label: 'Основы дизайна' },
  { id: 'pages', label: 'Страницы' },
]

const searchItems: SearchItem[] = [
  { id: 'page-home', title: 'Главная', description: 'Обзор дизайн-системы и основы дизайна', href: '/', category: 'pages', keywords: ['главная', 'home', 'обзор'] },
  { id: 'page-styles', title: 'Стили', description: 'Основы дизайна и брендбук: логотип, цвета, типографика, макеты', href: '/basics', category: 'pages', keywords: ['стили', 'styles', 'брендбук', 'основы'] },
  { id: 'page-modules', title: 'Модули', description: 'Документация UI-компонентов и их свойства', href: '/modules', category: 'pages', keywords: ['модули', 'components', 'компоненты'] },
  { id: 'page-api', title: 'API', description: 'Интеграции с Cursor, Claude, MCP и REST для AI-агентов', href: '/api', category: 'pages', keywords: ['api', 'cursor', 'claude', 'mcp', 'интеграции', 'агенты'] },
  { id: 'basics-mobile', title: 'Дизайн мобильных продуктов', description: 'Принципы и методы создания удобных мобильных интерфейсов', href: '/basics/mobile-design', category: 'basics', keywords: ['мобильный', 'mobile', 'продукт'] },
  { id: 'basics-typography', title: 'Типографика', description: 'Правила работы со шрифтами и текстовыми стилями в дизайне', href: '/basics/typography', category: 'basics', keywords: ['типографика', 'шрифт', 'текст'] },
  { id: 'basics-product', title: 'Продуктовый дизайн', description: 'Подходы к проектированию цифровых продуктов и пользовательского опыта', href: '/basics/product-design', category: 'basics', keywords: ['продукт', 'ux', 'дизайн'] },
  { id: 'basics-logo', title: 'Логотип', description: 'Версии, охранное поле и правила использования логотипа', href: '/basics/logo', category: 'basics', keywords: ['логотип', 'logo', 'знак', 'бренд'] },
  { id: 'basics-colors', title: 'Фирменные цвета', description: 'Палитра бренда и правила применения цветов', href: '/basics/colors', category: 'basics', keywords: ['цвет', 'палитра', 'зелёный', 'жёлтый'] },
  { id: 'basics-brand-typography', title: 'Шрифты бренда', description: 'Montserrat, Roboto и правила заголовков по брендбуку', href: '/basics/brand-typography', category: 'basics', keywords: ['брендбук', 'montserrat', 'roboto'] },
  { id: 'basics-elements', title: 'Фирменные элементы', description: '3D, 2D иллюстрации и mesh-градиенты', href: '/basics/brand-elements', category: 'basics', keywords: ['элементы', '3d', 'иллюстрация', 'градиент'] },
  { id: 'basics-editorial', title: 'Оформление текста', description: 'Тире, кавычки, списки, контраст и название компании', href: '/basics/editorial', category: 'basics', keywords: ['редакция', 'тире', 'кавычки', 'текст'] },
  { id: 'basics-layouts', title: 'Строение макетов', description: 'Три вида компоновки рекламных макетов', href: '/basics/layouts', category: 'basics', keywords: ['макет', 'layout', 'баннер', 'реклама'] },
  { id: 'basics-digital', title: 'Digital', description: 'Соцсети, баннеры, презентации и приложение', href: '/basics/digital', category: 'basics', keywords: ['digital', 'соцсети', 'презентация', 'приложение'] },
  { id: 'comp-AsyncAttachFiles', title: 'AsyncAttachFiles', description: 'Компонент загрузки и прикрепления файлов', href: '/modules?component=AsyncAttachFiles', category: 'components' },
  { id: 'comp-FileUploader', title: 'FileUploader', description: 'Загрузка файлов с поддержкой drag-and-drop', href: '/modules?component=FileUploader', category: 'components' },
  { id: 'comp-AttachmentHandler', title: 'AttachmentHandler', description: 'Обработка и управление вложениями', href: '/modules?component=AttachmentHandler', category: 'components' },
  { id: 'comp-AttachmentPreview', title: 'AttachmentPreview', description: 'Предпросмотр прикреплённых файлов', href: '/modules?component=AttachmentPreview', category: 'components' },
  { id: 'comp-FileSelector', title: 'FileSelector', description: 'Выбор файлов из системы', href: '/modules?component=FileSelector', category: 'components' },
  { id: 'comp-DropZone', title: 'DropZone', description: 'Область для перетаскивания файлов', href: '/modules?component=DropZone', category: 'components' },
  { id: 'comp-DocumentViewer', title: 'DocumentViewer', description: 'Просмотр документов в интерфейсе', href: '/modules?component=DocumentViewer', category: 'components' },
  { id: 'comp-ImageGallery', title: 'ImageGallery', description: 'Галерея изображений', href: '/modules?component=ImageGallery', category: 'components' },
  { id: 'comp-VideoPlayer', title: 'VideoPlayer', description: 'Видеоплеер для медиаконтента', href: '/modules?component=VideoPlayer', category: 'components' },
]

const normalizedQuery = computed(() => searchInput.value.trim().toLowerCase())

const filteredResults = computed(() => {
  const query = normalizedQuery.value

  return searchItems.filter((item) => {
    if (activeCategory.value !== 'all' && item.category !== activeCategory.value) {
      return false
    }

    if (!query) {
      return true
    }

    const haystack = [
      item.title,
      item.description,
      ...(item.keywords ?? []),
    ].join(' ').toLowerCase()

    return haystack.includes(query)
  })
})

const hasQuery = computed(() => normalizedQuery.value.length > 0)
const resultsCountLabel = computed(() => {
  const count = filteredResults.value.length
  const word = count === 1 ? 'результат' : count >= 2 && count <= 4 ? 'результата' : 'результатов'
  return `${count} ${word}`
})

watch(
  () => route.query.q,
  (value) => {
    if (typeof value === 'string' && value !== searchInput.value) {
      searchInput.value = value
    }
  },
)

function submitSearch() {
  router.replace({
    path: '/search',
    query: {
      ...route.query,
      q: searchInput.value.trim() || undefined,
    },
  })
}

function clearSearch() {
  searchInput.value = ''
  submitSearch()
}

function selectCategory(category: SearchCategory) {
  activeCategory.value = category
}
</script>

<template>
  <div class="page-viewport">
    <div class="page">
      <DesignOverlay :visible="showOverlay" :opacity="overlayOpacity" />

      <SidebarNav />

      <main class="page__main search-page">
        <div class="page__main-body search-page__body">
        <section class="search-hero">
          <div class="search-hero__content">
            <p class="search-hero__label">Поиск по системе</p>
            <h1 class="search-hero__title">Что вы ищете?</h1>
            <p class="search-hero__subtitle">
              Компоненты, разделы документации и материалы <br>по основам дизайна
            </p>

            <form class="search-form" @submit.prevent="submitSearch">
              <label class="search-form__field">
                <span class="search-form__icon" aria-hidden="true">
                  <img src="/assets/icons/search.svg" alt="" width="24" height="24">
                </span>
                <input
                  v-model="searchInput"
                  type="search"
                  class="search-form__input"
                  placeholder="Компонент, раздел или тема..."
                  autocomplete="off"
                  @input="submitSearch"
                >
                <button
                  v-if="hasQuery"
                  type="button"
                  class="search-form__clear"
                  aria-label="Очистить поиск"
                  @click="clearSearch"
                >
                  ×
                </button>
              </label>
              <button type="submit" class="search-form__submit">
                Найти
              </button>
            </form>
          </div>
        </section>

        <section class="search-results">
          <div class="search-results__header">
            <h2 class="search-results__title">
              {{ hasQuery ? 'Результаты поиска' : 'Популярное' }}
            </h2>
            <span class="search-results__count">{{ resultsCountLabel }}</span>
          </div>

          <div class="search-filters" role="tablist" aria-label="Фильтр результатов">
            <button
              v-for="category in categories"
              :key="category.id"
              type="button"
              class="search-filter"
              :class="{ 'search-filter--active': activeCategory === category.id }"
              role="tab"
              :aria-selected="activeCategory === category.id"
              @click="selectCategory(category.id)"
            >
              {{ category.label }}
            </button>
          </div>

          <ul v-if="filteredResults.length" class="search-list">
            <li v-for="item in filteredResults" :key="item.id">
              <NuxtLink :to="item.href" class="search-item">
                <span class="search-item__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
                    <rect x="11" y="3" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
                    <rect x="3" y="11" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
                    <rect x="11" y="11" width="6" height="6" rx="1.5" fill="var(--color-green-primary)"/>
                  </svg>
                </span>
                <span class="search-item__body">
                  <span class="search-item__title">{{ item.title }}</span>
                  <span class="search-item__description">{{ item.description }}</span>
                </span>
                <span class="search-item__badge">{{ categories.find(c => c.id === item.category)?.label }}</span>
              </NuxtLink>
            </li>
          </ul>

          <div v-else class="search-empty">
            <p class="search-empty__title">Ничего не найдено</p>
            <p class="search-empty__text">
              Попробуйте другой запрос или выберите категорию «Все»
            </p>
            <button type="button" class="search-empty__btn" @click="clearSearch(); selectCategory('all')">
              Сбросить фильтры
            </button>
          </div>
        </section>
        </div>

        <PageFooter />
      </main>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  gap: 32px;
}

.search-page__body {
  display: flex;
  flex-direction: column;
  gap: 72px;
}

.search-hero {
  background: var(--color-hero-bg);
  border-radius: var(--radius-xl) var(--radius-xl) 180px var(--radius-xl);
  padding: 48px 56px 64px;
  transition: background-color 0.3s ease;
}

.search-hero__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: 12px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.search-hero__title {
  font-size: clamp(40px, 5vw, var(--font-size-hero-title));
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -1.2px;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.search-hero__subtitle {
  max-width: 560px;
  font-size: var(--font-size-hero-subtitle);
  line-height: 1.45;
  color: var(--color-text-muted);
  margin-bottom: 32px;
}

.search-form {
  display: flex;
  align-items: stretch;
  gap: 12px;
  max-width: 720px;
}

.search-form__field {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: 0 16px;
  min-height: 56px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.search-form__field:focus-within {
  border-color: var(--color-green-primary);
}

.search-form__icon {
  display: flex;
  flex-shrink: 0;
}

.search-form__icon img {
  filter: brightness(0) saturate(100%);
  opacity: 0.55;
}

[data-theme='dark'] .search-form__icon img {
  filter: brightness(0) saturate(100%) invert(1);
  opacity: 0.7;
}

.search-form__input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--color-text-primary);
  outline: none;
  min-width: 0;
}

.search-form__input::placeholder {
  color: var(--color-text-muted);
}

.search-form__clear {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 22px;
  line-height: 1;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.search-form__clear:hover {
  background: var(--color-panel-bg);
  color: var(--color-text-primary);
}

.search-form__submit {
  padding: 0 28px;
  border-radius: var(--radius-md);
  background: var(--color-primary-btn);
  color: var(--color-white);
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.search-form__submit:hover {
  opacity: 0.9;
}

.search-results {
  padding: 0 8px;
}

.search-results__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding: 0 40px;
}

.search-results__title {
  font-size: var(--font-size-section-title);
  font-weight: 400;
  letter-spacing: -0.5px;
  color: var(--color-text-primary);
}

.search-results__count {
  font-size: 14px;
  color: var(--color-text-muted);
}

.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding: 0 40px;
}

.search-filter {
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--color-panel-bg);
  border: 1px solid transparent;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.search-filter:hover {
  color: var(--color-text-primary);
}

.search-filter--active {
  background: var(--color-accent-active);
  color: var(--color-text-primary);
  border-color: transparent;
}

.search-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 40px;
  margin: 0;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}

.search-item:hover {
  background: var(--color-panel-bg);
  border-color: var(--color-border);
  transform: translateY(-1px);
}

.search-item__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-soft);
  border-radius: 12px;
  flex-shrink: 0;
}

.search-item__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.search-item__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.2px;
}

.search-item__description {
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.search-item__badge {
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--color-panel-bg);
}

.search-empty {
  margin: 0 40px;
  padding: 48px 32px;
  text-align: center;
  background: var(--color-panel-bg);
  border-radius: var(--radius-lg);
}

.search-empty__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.search-empty__text {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

.search-empty__btn {
  padding: 12px 24px;
  border-radius: var(--radius-md);
  background: var(--color-primary-btn);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 1279px) {
  .search-results__header,
  .search-filters,
  .search-list {
    padding-left: 24px;
    padding-right: 24px;
  }

  .search-empty {
    margin-left: 24px;
    margin-right: 24px;
  }
}

@media (max-width: 767px) {
  .search-hero {
    border-radius: 28px 28px 120px 28px;
    padding: 32px 24px 40px;
  }

  .search-form {
    flex-direction: column;
  }

  .search-form__submit {
    height: 52px;
  }

  .search-results__header,
  .search-filters,
  .search-list {
    padding-left: 0;
    padding-right: 0;
  }

  .search-empty {
    margin-left: 0;
    margin-right: 0;
  }

  .search-item {
    flex-wrap: wrap;
    padding: 16px;
  }

  .search-item__badge {
    width: 100%;
    text-align: center;
  }
}
</style>
