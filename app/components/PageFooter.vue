<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'modules'
}>(), {
  variant: 'default',
})
</script>

<template>
  <footer class="footer" :class="{ 'footer--modules': variant === 'modules' }">
    <div class="footer__content">
      <div class="footer__left">
        <div class="footer__logo">
          <img src="/assets/icons/logo.svg" alt="Центр-инвест" width="48" height="48" />
        </div>
        <p class="footer__description">
          Система дизайна с открытым исходным кодом, предназначенная для создания красивых и удобных <br>в использовании продуктов. Включает готовые компоненты, токены дизайна и подробную документацию для ускорения разработки <br>и обеспечения единообразия интерфейсов.
        </p>
        <div class="footer__legal">
          <a href="#" class="footer__link footer__link--green">Privacy Policy</a>
          <a href="#" class="footer__link footer__link--green">Terms of Service</a>
        </div>
      </div>

      <div class="footer__center">
        <div class="footer__column">
          <h3 class="footer__column-title">Social</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">GitHub</a></li>
            <li><a href="#" class="footer__link">X</a></li>
            <li><a href="#" class="footer__link">YouTube</a></li>
            <li><a href="#" class="footer__link">Blog RSS</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Libraries</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">Android</a></li>
            <li><a href="#" class="footer__link">Compose</a></li>
            <li><a href="#" class="footer__link">Flutter</a></li>
            <li><a href="#" class="footer__link">Web</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__right">
        <div class="footer__pattern">
          <img src="/assets/images/hero-pattern.svg" alt="" class="footer__pattern-image" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 120px;
  background-color: var(--color-sidebar-bg);
  border-top-left-radius: var(--radius-xl);
  border-top-right-radius: var(--radius-xl);
  padding: 72px 76px 154px 76px;
  width: 100%;
  height: 454px;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.footer__content {
  display: grid;
  grid-template-columns: 481px 526px 1fr;
  align-items: stretch;
}

.footer__left {
  display: flex;
  flex-direction: column;
}

.footer__logo {
  margin-bottom: 24px;
}

.footer__description {
  font-family: var(--font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  color: var(--color-footer-text);
  margin: 0 0 48px 0;
  max-width: 481px;
  transition: color 0.3s ease;
}

.footer__legal {
  display: flex;
  gap: 24px;
}

.footer__center {
  display: flex;
  gap: 80px;
  justify-content: center;
}

.footer__column-title {
  font-size: 14px;
  font-weight: 200;
  color: var(--color-text-primary);
  margin: 30px 108px 34px 0;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer__link {
  text-decoration: none;
  color: var(--color-green-primary);
  font-size: 16px;
  transition: opacity 0.2s ease;
}

.footer__link:hover {
  opacity: 0.8;
}

.footer__link--green {
  color: var(--color-green-primary);
}

.footer__right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  align-self: stretch;
}

.footer__pattern {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.footer__pattern-image {
  width: 100%;
  height: auto;
  min-width: 280px;
  max-height: 320px;
  object-fit: contain;
  object-position: right bottom;
}

.footer--modules {
  margin-top: 0;
  border-radius: 28px;
  padding: 72px 76px 120px;
  height: auto;
  min-height: 380px;
  width: 100%;
}

.footer--modules .footer__content {
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(200px, 1fr);
  gap: 32px;
}

.footer--modules .footer__description {
  max-width: none;
  font-size: 16px;
  margin-bottom: 32px;
}

.footer--modules .footer__center {
  gap: 48px;
  justify-content: flex-start;
}

.footer--modules .footer__column-title {
  margin: 0 0 24px;
}

.footer--modules .footer__pattern-image {
  min-width: 180px;
  max-height: 260px;
}

@media (max-width: 1279px) {
  .footer {
    padding: 48px 40px 100px;
    height: auto;
  }

  .footer__content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .footer__right {
    grid-column: 1 / -1;
    justify-content: center;
  }

  .footer__pattern-image {
    max-height: 220px;
  }

  .footer--modules .footer__content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .footer {
    margin-top: 64px;
    padding: 32px 24px 48px;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
  }

  .footer__content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer__description br {
    display: none;
  }

  .footer__description {
    font-size: 15px;
    margin-bottom: 24px;
  }

  .footer__center {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }

  .footer__column-title {
    margin: 0 0 16px;
  }

  .footer__right {
    min-height: 160px;
  }

  .footer--modules {
    padding: 32px 24px 48px;
    min-height: 0;
    border-radius: 24px;
  }

  .footer--modules .footer__content {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 2560px) {
  .footer {
    padding: 88px 96px 180px;
    height: auto;
    min-height: 520px;
  }

  .footer__content {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.9fr) minmax(240px, 1fr);
    gap: 48px;
  }

  .footer__description {
    font-size: 20px;
    max-width: 620px;
  }

  .footer__link {
    font-size: 18px;
  }

  .footer--modules {
    padding: 88px 96px 140px;
    min-height: 460px;
  }

  .footer--modules .footer__description {
    font-size: 18px;
  }
}
</style>
