<script setup lang="ts">
</script>

<template>
  <aside class="guide">
    <p class="guide__label">
      На этой странице
    </p>
    <h3 class="guide__title">
      Руководство по интерфейсу
    </h3>
    <p class="guide__description">
      Сайт содержит рекомендации и лучшие практики, которые могут помочь вам создать отличный опыт для любой платформы «Центр-инвест».
    </p>
  </aside>
</template>

<style scoped>
.guide {
  padding-top: 8px;
  max-width: 280px;
  margin-left: 44px;
}

@media (max-width: 1279px) {
  .guide {
    max-width: none;
    margin-left: 0;
  }
}

@media (min-width: 2560px) {
  .guide {
    max-width: 360px;
    margin-left: 0;
    padding-top: 16px;
  }

  .guide__title {
    font-size: 24px;
  }
}

.guide__label {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.guide__title {
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.2px;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.guide__description {
  font-family: var(--font-family);
  font-size: var(--font-size-card-description);
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-text-secondary);
}
</style>
