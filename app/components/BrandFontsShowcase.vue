<script setup lang="ts">
import { BRAND_FONT_MONTSERRAT, BRAND_FONT_ROBOTO } from '~/utils/brandAssets'

const montserratScale = [
  { level: 'H1', weight: 700, weightLabel: 'Bold', size: '40px', lineHeight: 1.1 },
  { level: 'H2', weight: 500, weightLabel: 'Medium', size: '32px', lineHeight: 1.15 },
  { level: 'H3', weight: 600, weightLabel: 'SemiBold', size: '24px', lineHeight: 1.2 },
  { level: 'H4', weight: 400, weightLabel: 'Regular / Medium / SemiBold', size: '20px', lineHeight: 1.25 },
  { level: 'H5', weight: 500, weightLabel: 'Regular / Medium / SemiBold', size: '18px', lineHeight: 1.3 },
  { level: 'H6', weight: 400, weightLabel: 'Regular / Medium / SemiBold', size: '16px', lineHeight: 1.35 },
] as const

const robotoSamples = [
  { weight: 400, label: 'Regular', text: 'Дополнительный текст и подписи в интерфейсе' },
  { weight: 500, label: 'Medium', text: 'Акцентные подписи и метки в таблицах' },
  { weight: 700, label: 'Bold', text: 'Выделение важных чисел и статусов' },
] as const
</script>

<template>
  <div class="brand-fonts">
    <article class="article-editorial-row brand-fonts__row brand-fonts__row--montserrat">
      <div class="article-editorial-row__copy">
        <p class="article-editorial-row__eyebrow">
          Free fonts
        </p>
        <h3 class="article-editorial-row__title">
          Montserrat
        </h3>
        <p class="article-editorial-row__body">
          Шрифт отражает характер бренда. Семейство Montserrat справляется с этой задачей в полной мере.
        </p>
        <p class="article-editorial-row__body">
          Прямые лаконичные линии без засечек хорошо воспринимаются в полиграфии и на экране.
        </p>
        <a
          class="article-editorial-row__link"
          :href="BRAND_FONT_MONTSERRAT.googleSpecimen"
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть на Google Fonts
        </a>
      </div>

      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-fonts__media">
          <header class="brand-fonts__media-header">
            <a
              class="ds-btn brand-fonts__download"
              :href="BRAND_FONT_MONTSERRAT.googleDownload"
              target="_blank"
              rel="noopener noreferrer"
            >
              Скачать с Google Fonts
            </a>
          </header>

          <ul class="brand-fonts__scale">
            <li
              v-for="item in montserratScale"
              :key="item.level"
              class="brand-fonts__scale-item"
            >
              <span class="brand-fonts__scale-meta">
                {{ item.level }} / Montserrat {{ item.weightLabel }}
              </span>
              <p
                class="brand-fonts__scale-sample"
                :style="{
                  fontWeight: item.weight,
                  fontSize: item.size,
                  lineHeight: item.lineHeight,
                }"
              >
                Безопасность — на первом месте
              </p>
            </li>
          </ul>
        </div>
        <p class="article-editorial-media__caption">
          Шкала заголовков H1–H6 для полиграфии и digital-носителей
        </p>
      </div>
    </article>

    <article class="article-editorial-row brand-fonts__row brand-fonts__row--roboto">
      <div class="article-editorial-row__copy">
        <p class="article-editorial-row__eyebrow">
          Free fonts
        </p>
        <h3 class="article-editorial-row__title">
          Roboto
        </h3>
        <p class="article-editorial-row__body">
          Дополняет Montserrat во вспомогательных блоках, таблицах, подписях и интерфейсных элементах.
        </p>
        <a
          class="article-editorial-row__link"
          :href="BRAND_FONT_ROBOTO.googleSpecimen"
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть на Google Fonts
        </a>
      </div>

      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-fonts__media">
          <header class="brand-fonts__media-header">
            <a
              class="ds-btn brand-fonts__download"
              :href="BRAND_FONT_ROBOTO.googleDownload"
              target="_blank"
              rel="noopener noreferrer"
            >
              Скачать с Google Fonts
            </a>
          </header>

          <ul class="brand-fonts__scale">
            <li
              v-for="item in robotoSamples"
              :key="item.label"
              class="brand-fonts__scale-item"
            >
              <span class="brand-fonts__scale-meta">
                Roboto {{ item.label }}
              </span>
              <p
                class="brand-fonts__scale-sample brand-fonts__scale-sample--roboto"
                :style="{ fontWeight: item.weight }"
              >
                {{ item.text }}
              </p>
            </li>
          </ul>
        </div>
        <p class="article-editorial-media__caption">
          Начертания для UI, таблиц и вспомогательных подписей
        </p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.brand-fonts {
  display: flex;
  flex-direction: column;
  margin-top: var(--space-6);
}

.brand-fonts__row--montserrat {
  font-family: v-bind('BRAND_FONT_MONTSERRAT.cssFamily');
}

.brand-fonts__row--roboto {
  font-family: v-bind('BRAND_FONT_ROBOTO.cssFamily');
}

.brand-fonts__media {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.brand-fonts__media-header {
  display: flex;
  justify-content: flex-end;
}

.brand-fonts__download {
  flex-shrink: 0;
}

.brand-fonts__scale {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.brand-fonts__scale-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.brand-fonts__scale-meta {
  font-family: var(--font-family);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.brand-fonts__scale-sample {
  margin: 0;
  color: var(--color-text-primary);
  font-family: inherit;
}

.brand-fonts__scale-sample--roboto {
  font-size: 18px;
  line-height: 1.45;
}

@media (max-width: 960px) {
  .brand-fonts__media-header {
    justify-content: stretch;
  }

  .brand-fonts__download {
    width: 100%;
  }
}
</style>
