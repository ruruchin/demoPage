<script setup lang="ts">
import { getBasicsHomeCards } from '~/data/basicsGuides'

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

const cards = getBasicsHomeCards()
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
                :to="card.to"
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
