<script setup lang="ts">
</script>

<template>
  <section class="hero">
    <div class="hero__card hero__card--text">
      <img
        class="hero__logo"
        src="/assets/icons/logo.svg"
        alt=""
        width="52"
        height="52"
      >
      <div class="hero__text-content">
        <h1 class="hero__title">
          Дизайн-система «Центр-инвест»
        </h1>
        <p class="hero__description">
          Система дизайна с открытым исходным кодом, предназначенная для создания красивых и удобных <br> в использовании продуктов.
        </p>
      </div>
    </div>

    <div class="hero__card hero__card--graphic" aria-hidden="true">
      <img
        class="hero__graphic"
        src="/assets/images/hero-pattern.svg"
        alt=""
      >
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  height: 544px;
  min-height: 544px;
}

@media (max-width: 1279px) {
  .hero {
    height: auto;
    min-height: 0;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .hero {
    gap: 12px;
  }
}

@media (min-width: 2560px) {
  .hero {
    height: 680px;
    min-height: 680px;
    gap: 12px;
  }
}

.hero__card {
  background: var(--color-hero-bg);
  background-color: var(--color-hero-bg);
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.hero__card--text {
  border-radius: var(--radius-xl) var(--radius-xl) 180px var(--radius-xl);
  padding: 40px 48px 54px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 767px) {
  .hero__card--text {
    border-radius: 28px 28px 120px 28px;
    padding: 28px 24px 40px;
  }
}

@media (min-width: 2560px) {
  .hero__card--text {
    padding: 52px 64px 72px;
  }
}

.hero__logo {
  margin-bottom: 0;
}

.hero__title {
  max-width: 720px;
  font-family: var(--font-family);
  font-size: var(--font-size-hero-title);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -1.52px;
  color: var(--color-text-primary);
  margin-bottom: 20px;
}

@media (max-width: 767px) {
  .hero__title {
    font-size: clamp(36px, 10vw, 52px);
    letter-spacing: -0.8px;
    margin-bottom: 16px;
  }
}

@media (min-width: 2560px) {
  .hero__title {
    letter-spacing: -2px;
    margin-bottom: 28px;
  }
}

.hero__description {
  max-width: 640px;
  font-family: var(--font-family);
  font-size: var(--font-size-hero-subtitle);
  font-weight: 400;
  line-height: 1.45;
  color: var(--color-text-secondary);
}

.hero__card--graphic {
  border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) 180px;
  position: relative;
  min-height: 280px;
}

@media (max-width: 767px) {
  .hero__card--graphic {
    border-radius: 28px 28px 28px 120px;
    min-height: 220px;
  }
}

.hero__graphic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
