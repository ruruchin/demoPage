<script setup lang="ts">
const route = useRoute()

const showOverlay = computed(() => {
  if (!import.meta.dev) {
    return false
  }

  return route.query.overlay === '1'
})

const overlayOpacity = computed(() => {
  const value = Number(route.query.overlayOpacity ?? 0.5)
  if (Number.isNaN(value)) {
    return 0.5
  }

  return Math.min(1, Math.max(0, value))
})

const cards = [
  {
    title: 'Дизайн мобильных продуктов',
    description:
      'Принципы и методы создания удобных мобильных интерфейсов',
    image: '/assets/images/Дизайн мобильных продуктов.png',
  },
  {
    title: 'Типографика',
    description:
      'Правила работы со шрифтами и текстовыми стилями в дизайне',
    image: '/assets/images/Типографика.png',
  },
  {
    title: 'Продуктовый дизайн',
    description:
      'Подходы к проектированию цифровых продуктов и пользовательского опыта',
    image: '/assets/images/Продуктовый дизайн.png',
  },
]
</script>

<template>
  <div class="page-viewport">
    <div class="page">
      <DesignOverlay
        :visible="showOverlay"
        :opacity="overlayOpacity"
      />

      <SidebarNav />

      <main class="page__main">
        <div class="page__main-body">
          <HeroBlock />

          <section class="basics">
            <h2 class="basics__title">
              Основы дизайна
            </h2>

            <div class="basics__grid">
              <DesignCard
                v-for="card in cards"
                :key="card.title"
                :title="card.title"
                :description="card.description"
                :image="card.image"
              />
              <GuideBlock />
            </div>
          </section>
        </div>

        <PageFooter />
      </main>
    </div>
  </div>
</template>
