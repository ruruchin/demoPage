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

.hero__card {
  background: #F1F3F9;
  background-color: #F1F3F9;
  overflow: hidden;
}

.hero__card--text {
  border-radius: var(--radius-xl) var(--radius-xl) 180px var(--radius-xl);
  padding: 40px 48px 54px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}

.hero__graphic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
