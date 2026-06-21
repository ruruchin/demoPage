<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  imageAlt?: string
  to?: string
}

withDefaults(defineProps<Props>(), {
  imageAlt: '',
  to: '',
})
</script>

<template>
  <article class="design-card">
    <div class="design-card__media">
      <img
        class="design-card__image"
        :src="image"
        :alt="imageAlt"
      >
    </div>

    <div class="design-card__body">
      <h3 class="design-card__title">
        {{ title }}
      </h3>
      <p class="design-card__description">
        {{ description }}
      </p>
      <NuxtLink
        v-if="to"
        :to="to"
        class="design-card__button"
      >
        Открыть
      </NuxtLink>
      <button
        v-else
        class="design-card__button"
        type="button"
      >
        Открыть
      </button>
    </div>
  </article>
</template>

<style scoped>
.design-card {
  width: 100%;
  max-width: 429px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

@media (max-width: 1279px) {
  .design-card {
    max-width: none;
  }
}

.design-card__media {
  height: 240px;
  flex-shrink: 0;
  background: var(--color-surface);
  overflow: hidden;
}

.design-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.design-card__body {
  padding: 24px;
}

.design-card__title {
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.2px;
  color: var(--color-text-primary);
}

.design-card__description {
  margin-top: 8px;
  font-family: var(--font-family);
  font-size: var(--font-size-card-description);
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

.design-card__button {
  width: 100%;
  height: 52px;
  margin-top: 24px;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  background: var(--color-button-muted-bg);
  color: var(--color-button-muted-text);
  border: 1px solid var(--color-border-light);
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-sizing: border-box;
}

.design-card__button:hover {
  transform: translateY(-1px);
  background: var(--color-green-light);
  border-color: var(--color-green-light);
  color: var(--color-text-primary);
}

@media (min-width: 2560px) {
  .design-card {
    max-width: none;
    min-height: 480px;
  }

  .design-card__media {
    height: 280px;
  }

  .design-card__body {
    padding: 32px;
  }

  .design-card__title {
    font-size: 24px;
  }
}
</style>
