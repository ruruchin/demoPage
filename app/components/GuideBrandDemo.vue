<script setup lang="ts">
import type { BrandDemoVariant } from '~/types/guide'
import { BRAND_LOGO_ALT, BRAND_LOGO_FULL, BRAND_LOGO_SIGN } from '~/utils/brandAssets'

const props = defineProps<{
  variant: BrandDemoVariant
}>()

const logoDonts = [
  { label: 'Другие цвета', class: 'brand-logo-dont--wrong-colors' },
  { label: 'Эффекты', class: 'brand-logo-dont--effects' },
  { label: 'Искажение', class: 'brand-logo-dont--stretch' },
  { label: 'Ночная на светлом', class: 'brand-logo-dont--night-on-light' },
  { label: 'Низкий контраст', class: 'brand-logo-dont--low-contrast' },
  { label: 'Смена расположения', class: 'brand-logo-dont--reorder' },
]
</script>

<template>
  <div class="brand-demo" :class="`brand-demo--${props.variant}`">
    <!-- Colors -->
    <BrandColorPalette v-if="variant === 'color-palette-primary'" group="primary" />
    <BrandColorPalette v-else-if="variant === 'color-palette-pastel'" group="pastel" />

    <div v-else-if="variant === 'color-usage'" class="brand-demo__usage">
      <div class="brand-usage-card brand-usage-card--good">
        <span class="brand-usage-card__badge brand-usage-card__badge--good">Да</span>
        <div class="brand-usage-card__preview brand-usage-card__preview--balanced">
          <div class="brand-usage-card__bar brand-usage-card__bar--white" />
          <div class="brand-usage-card__bar brand-usage-card__bar--green" />
          <div class="brand-usage-card__accent" />
        </div>
        <p>Белый и зелёный преобладают. Жёлтый — точечный акцент.</p>
      </div>
      <div class="brand-usage-card brand-usage-card--bad">
        <span class="brand-usage-card__badge brand-usage-card__badge--bad">Нет</span>
        <div class="brand-usage-card__preview brand-usage-card__preview--yellow-bg">
          <p>Жёлтый фон</p>
        </div>
        <p>Жёлтый не используется для заливки и фона макета.</p>
      </div>
    </div>

    <!-- Logo -->
    <article v-else-if="variant === 'logo-primary'" class="article-editorial-row brand-logo-editorial">
      <div class="article-editorial-row__copy">
        <p class="article-editorial-row__body">
          Полная горизонтальная версия логотипа «Банк Центр-инвест» — основной фирменный блок для носителей с достаточной шириной.
        </p>
      </div>
      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-logo-editorial__media">
          <img
            :src="BRAND_LOGO_FULL"
            :alt="BRAND_LOGO_ALT"
            class="brand-logo-full brand-logo-full--featured"
            width="480"
            height="120"
          >
        </div>
        <p class="article-editorial-media__caption">
          Основная горизонтальная версия логотипа
        </p>
      </div>
    </article>

    <div v-else-if="variant === 'logo-versions'" class="brand-demo__logo-grid">
      <article class="brand-logo-card brand-logo-card--day">
        <p class="brand-logo-card__label">Дневная · светлый фон</p>
        <div class="brand-logo-card__content brand-logo-card__content--full">
          <img
            :src="BRAND_LOGO_FULL"
            :alt="BRAND_LOGO_ALT"
            class="brand-logo-full brand-logo-full--on-light"
            width="280"
            height="70"
          >
        </div>
        <p class="brand-logo-card__hint">Одноцветный зелёный логотип</p>
      </article>
      <article class="brand-logo-card brand-logo-card--night">
        <p class="brand-logo-card__label">Ночная · зелёный фон</p>
        <div class="brand-logo-card__content brand-logo-card__content--full">
          <img
            :src="BRAND_LOGO_FULL"
            :alt="BRAND_LOGO_ALT"
            class="brand-logo-full brand-logo-full--on-green"
            width="280"
            height="70"
          >
        </div>
        <p class="brand-logo-card__hint">Жёлтый логотип на фоне #50B848</p>
      </article>
      <article class="brand-logo-card brand-logo-card--additional">
        <p class="brand-logo-card__label">Дополнительная · двухцветная</p>
        <div class="brand-logo-card__content brand-logo-card__content--full">
          <img
            :src="BRAND_LOGO_FULL"
            :alt="BRAND_LOGO_ALT"
            class="brand-logo-full brand-logo-full--on-light"
            width="280"
            height="70"
          >
        </div>
        <p class="brand-logo-card__hint">Знак — фирменный цвет, текст — чёрный или белый</p>
      </article>
      <article class="brand-logo-card brand-logo-card--mono-dark">
        <p class="brand-logo-card__label">Монохром · тёмный фон</p>
        <div class="brand-logo-card__content brand-logo-card__content--full">
          <img
            :src="BRAND_LOGO_FULL"
            :alt="BRAND_LOGO_ALT"
            class="brand-logo-full brand-logo-full--on-dark"
            width="280"
            height="70"
          >
        </div>
        <p class="brand-logo-card__hint">Когда полноцветное нанесение невозможно</p>
      </article>
      <article class="brand-logo-card brand-logo-card--sign">
        <p class="brand-logo-card__label">Знак отдельно</p>
        <div class="brand-logo-card__content brand-logo-card__content--center">
          <img :src="BRAND_LOGO_SIGN" alt="" width="72" height="72" class="brand-logo-card__mark brand-logo-card__mark--green">
        </div>
        <p class="brand-logo-card__hint">Приоритет при разделении логотипа · фавикон · аватар</p>
      </article>
    </div>

    <article v-else-if="variant === 'logo-clear-space'" class="article-editorial-row brand-logo-editorial">
      <div class="article-editorial-row__copy">
        <p class="article-editorial-row__body">
          Охранное поле = высота буквы «Ц» без нижнего выносного элемента. Внутри поля логотип не пересекается с другими элементами.
        </p>
      </div>
      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-logo-editorial__media brand-logo-editorial__media--clearspace">
          <div class="brand-clearspace">
            <div class="brand-clearspace__zone" />
            <div class="brand-clearspace__logo">
              <img
                :src="BRAND_LOGO_FULL"
                :alt="BRAND_LOGO_ALT"
                class="brand-logo-full brand-logo-full--on-light"
                width="240"
                height="60"
              >
            </div>
            <div class="brand-clearspace__measure brand-clearspace__measure--top">
              X
            </div>
            <div class="brand-clearspace__measure brand-clearspace__measure--right">
              X
            </div>
            <div class="brand-clearspace__measure brand-clearspace__measure--bottom">
              X
            </div>
            <div class="brand-clearspace__measure brand-clearspace__measure--left">
              X
            </div>
          </div>
        </div>
        <p class="article-editorial-media__caption">
          Охранное поле вокруг логотипа
        </p>
      </div>
    </article>

    <div v-else-if="variant === 'logo-donts'" class="brand-demo__donts">
      <article v-for="item in logoDonts" :key="item.label" class="brand-logo-dont">
        <div class="brand-logo-dont__preview" :class="item.class">
          <img
            :src="BRAND_LOGO_FULL"
            :alt="BRAND_LOGO_ALT"
            class="brand-logo-full brand-logo-dont__logo"
            width="180"
            height="45"
          >
        </div>
        <p>{{ item.label }}</p>
        <span class="brand-logo-dont__badge">✕</span>
      </article>
    </div>

    <!-- Typography -->
    <BrandFontsShowcase v-else-if="variant === 'brand-fonts'" />

    <div v-else-if="variant === 'typography-scale'" class="brand-demo__type-scale">
      <div class="brand-type-row">
        <span class="brand-type-row__meta">H1 · Montserrat Bold</span>
        <p class="brand-type-row__sample brand-type-row__sample--h1">Безопасность — на первом месте</p>
      </div>
      <div class="brand-type-row">
        <span class="brand-type-row__meta">H2 · Montserrat Medium</span>
        <p class="brand-type-row__sample brand-type-row__sample--h2">Ипотека для семей с детьми</p>
      </div>
      <div class="brand-type-row">
        <span class="brand-type-row__meta">H3 · Montserrat SemiBold</span>
        <p class="brand-type-row__sample brand-type-row__sample--h3">РКО и кредитование для бизнеса</p>
      </div>
      <div class="brand-type-row">
        <span class="brand-type-row__meta">Body · Montserrat Regular · от 12pt</span>
        <p class="brand-type-row__sample brand-type-row__sample--body">
          Основной текст рекомендуется кеглем от 12 pt, интерлиньяж 130–140%. Для digital и печати — единые правила читаемости.
        </p>
      </div>
      <div class="brand-type-row brand-type-row--secondary">
        <span class="brand-type-row__meta">Secondary · Roboto Regular</span>
        <p class="brand-type-row__sample brand-type-row__sample--roboto">
          Дополнительный шрифт Roboto используется в сочетании с Montserrat в таблицах, подписях и интерфейсных блоках.
        </p>
      </div>
    </div>

    <div v-else-if="variant === 'typography-accents'" class="brand-demo__accents">
      <article class="brand-accent">
        <p class="brand-accent__sample brand-accent__sample--color">Безопасность — на первом месте</p>
        <span>Выделение цветом · только зелёный</span>
      </article>
      <article class="brand-accent">
        <p class="brand-accent__sample brand-accent__sample--border">Безопасность — на первом месте</p>
        <span>Контурная рамка · любой фирменный цвет</span>
      </article>
      <article class="brand-accent">
        <p class="brand-accent__sample brand-accent__sample--fill">Безопасность — на первом месте</p>
        <span>Подложка · любой фирменный цвет</span>
      </article>
      <article class="brand-accent">
        <p class="brand-accent__sample brand-accent__sample--bar">Безопасность — на первом месте</p>
        <span>Вертикальная полоса · любой фирменный цвет</span>
      </article>
    </div>

    <!-- Editorial -->
    <EditorialShowcase v-else-if="variant === 'editorial-dashes'" part="dashes" />
    <EditorialShowcase v-else-if="variant === 'editorial-hyphenation'" part="hyphenation" />
    <EditorialShowcase v-else-if="variant === 'editorial-quotes'" part="quotes" />
    <EditorialShowcase v-else-if="variant === 'editorial-lists'" part="lists" />
    <EditorialShowcase v-else-if="variant === 'editorial-contrast'" part="contrast" />
    <EditorialShowcase v-else-if="variant === 'editorial-tracking'" part="tracking" />
    <EditorialShowcase v-else-if="variant === 'editorial-leading'" part="leading" />
    <EditorialShowcase v-else-if="variant === 'editorial-company-name'" part="company-name" />

    <!-- Layouts -->
    <LayoutsShowcase v-else-if="variant === 'layout-type-1'" part="type-1" />
    <LayoutsShowcase v-else-if="variant === 'layout-type-2'" part="type-2" />
    <LayoutsShowcase v-else-if="variant === 'layout-type-3'" part="type-3" />

    <!-- Brand elements -->
    <BrandElementsShowcase v-else-if="variant === 'brand-elements-3d-primitives'" part="3d-primitives" />
    <BrandElementsShowcase v-else-if="variant === 'brand-elements-3d-examples'" part="3d-examples" />
    <BrandElementsShowcase v-else-if="variant === 'brand-elements-2d'" part="2d" />
    <BrandElementsShowcase v-else-if="variant === 'brand-elements-mesh'" part="mesh" />

    <!-- Digital -->
    <div v-else-if="variant === 'digital-overview'" class="brand-demo__digital">
      <article class="brand-digital-card">
        <div class="brand-digital-card__icon">💬</div>
        <h4>Мессенджеры и соцсети</h4>
        <p>Квадратные баннеры: знак в аватаре, Montserrat + Roboto, 3D/2D иллюстрации, светлый или градиентный фон.</p>
      </article>
      <article class="brand-digital-card">
        <div class="brand-digital-card__icon">🖥</div>
        <h4>Презентации</h4>
        <p>Светлая основа, зелёный и жёлтый — акценты. Montserrat, при необходимости Arial. Таблицы без лишних линий.</p>
      </article>
      <article class="brand-digital-card">
        <div class="brand-digital-card__icon">📱</div>
        <h4>Приложение и digital</h4>
        <p>Иконка — знак. Баннеры РСЯ, заставки, шаблоны слайдов по правилам брендбука.</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.brand-demo {
  margin: 28px 0 8px;
}

.brand-demo--brand-elements-3d-primitives {
  margin: 0 0 var(--article-space-list);
}

.brand-demo--brand-elements-3d-examples,
.brand-demo--brand-elements-2d,
.brand-demo--brand-elements-mesh,
.brand-demo--layout-type-1,
.brand-demo--layout-type-2,
.brand-demo--layout-type-3,
.brand-demo--logo-primary,
.brand-demo--logo-clear-space {
  margin: 0 0 var(--article-space-demo-bottom);
}

.brand-logo-editorial {
  padding-top: 0;
  border-top: none;
}

.brand-logo-editorial__media {
  padding: var(--space-7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo-editorial__media--clearspace {
  padding: var(--space-5);
}

.brand-logo-editorial__media .brand-logo-full--featured {
  max-width: 100%;
  height: auto;
}

/* Color usage */
.brand-demo__usage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.brand-usage-card {
  border-radius: 20px;
  border: 1px solid var(--color-border-light);
  padding: 20px;
  background: var(--color-surface);
  position: relative;
}

.brand-usage-card__badge {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.brand-usage-card__badge--good {
  background: var(--color-brand-green);
  color: #fff;
}

.brand-usage-card__badge--bad {
  background: #e5484d;
  color: #fff;
}

.brand-usage-card__preview {
  height: 120px;
  border-radius: 14px;
  margin-bottom: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.brand-usage-card__preview--balanced {
  background: #fff;
}

.brand-usage-card__bar--white {
  flex: 2;
  background: #fff;
}

.brand-usage-card__bar--green {
  flex: 1;
  background: var(--color-brand-green);
}

.brand-usage-card__accent {
  width: 48px;
  height: 8px;
  background: var(--color-brand-yellow);
  margin: 8px 0 0 16px;
  border-radius: 4px;
}

.brand-usage-card__preview--yellow-bg {
  background: var(--color-brand-yellow);
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.brand-usage-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

/* Logo */
.brand-demo__logo-primary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.brand-logo-primary {
  width: 100%;
  padding: 32px 24px;
  border-radius: 20px;
  border: 1px solid var(--color-border-light);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo-full {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.brand-logo-full--featured {
  max-height: 96px;
}

.brand-logo-full--on-light {
  mix-blend-mode: screen;
}

.brand-logo-full--on-green {
  mix-blend-mode: screen;
  filter: hue-rotate(52deg) saturate(2.2) brightness(1.15);
}

.brand-logo-full--on-dark {
  /* Исходный файл: зелёный логотип на чёрном фоне */
}

.brand-demo__logo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.brand-logo-card {
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--color-border-light);
}

.brand-logo-card--day,
.brand-logo-card--additional,
.brand-logo-card--sign {
  background: #fff;
}

.brand-logo-card--night {
  background: var(--color-brand-green);
}

.brand-logo-card--mono-dark {
  background: var(--color-brand-black);
}

.brand-logo-card__label {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  opacity: 0.7;
}

.brand-logo-card--night .brand-logo-card__label,
.brand-logo-card--mono-dark .brand-logo-card__label {
  color: #fff;
  opacity: 0.85;
}

.brand-logo-card__content {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 72px;
}

.brand-logo-card__content--center {
  justify-content: center;
}

.brand-logo-card__content--full {
  justify-content: center;
  min-height: 80px;
}

.brand-logo-card__content--full .brand-logo-full {
  max-height: 56px;
}

.brand-logo-card__mark--green {
  filter: brightness(0) saturate(100%) invert(52%) sepia(79%) saturate(449%) hue-rotate(73deg) brightness(95%) contrast(92%);
}

.brand-logo-card__mark--yellow {
  filter: brightness(0) saturate(100%) invert(85%) sepia(78%) saturate(1246%) hue-rotate(359deg) brightness(103%) contrast(104%);
}

.brand-logo-card__mark--white {
  filter: brightness(0) invert(1);
}

.brand-logo-card__wordmark {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.brand-logo-card__wordmark--green { color: var(--color-brand-green); }
.brand-logo-card__wordmark--yellow { color: var(--color-brand-yellow); }
.brand-logo-card__wordmark--black { color: var(--color-brand-black); }
.brand-logo-card__wordmark--white { color: #fff; }

.brand-logo-card__hint {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.brand-logo-card--night .brand-logo-card__hint,
.brand-logo-card--mono-dark .brand-logo-card__hint {
  color: rgba(255, 255, 255, 0.75);
}

/* Clear space */
.brand-demo__clearspace {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.brand-clearspace {
  position: relative;
  width: min(100%, 420px);
  aspect-ratio: 1.4;
  border: 2px dashed var(--color-brand-green);
  border-radius: 16px;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-clearspace__zone {
  position: absolute;
  inset: 48px;
  border: 1px dashed rgba(80, 184, 72, 0.35);
  border-radius: 8px;
}

.brand-clearspace__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 8px 12px;
  background: #fff;
  border-radius: 8px;
}

.brand-clearspace__logo .brand-logo-full {
  max-height: 48px;
}

.brand-clearspace__measure {
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-brand-green);
  background: var(--color-surface);
  padding: 2px 6px;
  border-radius: 4px;
}

.brand-clearspace__measure--top { top: 12px; left: 50%; transform: translateX(-50%); }
.brand-clearspace__measure--bottom { bottom: 12px; left: 50%; transform: translateX(-50%); }
.brand-clearspace__measure--left { left: 12px; top: 50%; transform: translateY(-50%); }
.brand-clearspace__measure--right { right: 12px; top: 50%; transform: translateY(-50%); }

.brand-demo__caption {
  margin: 0;
  max-width: 560px;
  text-align: center;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

/* Logo don'ts */
.brand-demo__donts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.brand-logo-dont {
  position: relative;
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
  padding: 16px;
  background: var(--color-surface);
  text-align: center;
}

.brand-logo-dont__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  margin-bottom: 10px;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
}

.brand-logo-dont__logo {
  max-height: 36px;
  mix-blend-mode: screen;
}

.brand-logo-dont p {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.brand-logo-dont__badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e5484d;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo-dont--wrong-colors .brand-logo-dont__logo { filter: hue-rotate(200deg) saturate(1.5); mix-blend-mode: normal; }
.brand-logo-dont--effects .brand-logo-dont__preview { filter: blur(1px) drop-shadow(0 0 6px #f9e300); }
.brand-logo-dont--stretch .brand-logo-dont__logo { transform: scaleX(1.45); mix-blend-mode: normal; }
.brand-logo-dont--night-on-light .brand-logo-dont__logo { filter: hue-rotate(52deg) saturate(2) brightness(1.1); mix-blend-mode: screen; }
.brand-logo-dont--low-contrast .brand-logo-dont__preview { background: #e8feeb; }
.brand-logo-dont--low-contrast .brand-logo-dont__logo { opacity: 0.35; mix-blend-mode: normal; }
.brand-logo-dont--reorder .brand-logo-dont__logo { transform: rotate(-90deg); mix-blend-mode: normal; }

/* Typography */
.brand-demo__type-scale {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--color-border-light);
  background: var(--color-surface);
}

.brand-type-row__meta {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--color-text-muted);
  margin-bottom: 6px;
  font-family: var(--font-family-brand-secondary);
}

.brand-type-row__sample {
  margin: 0;
  color: var(--color-text-primary);
}

.brand-type-row__sample--h1,
.brand-type-row__sample--h2,
.brand-type-row__sample--h3,
.brand-type-row__sample--body {
  font-family: var(--font-family-brand);
}

.brand-type-row__sample--h1 { font-size: 40px; font-weight: 700; line-height: 1.1; }
.brand-type-row__sample--h2 { font-size: 32px; font-weight: 500; line-height: 1.15; }
.brand-type-row__sample--h3 { font-size: 24px; font-weight: 600; line-height: 1.2; }
.brand-type-row__sample--body { font-size: 16px; font-weight: 400; line-height: 1.5; max-width: 720px; }
.brand-type-row__sample--roboto { font-family: var(--font-family-brand-secondary); font-size: 15px; line-height: 1.5; max-width: 720px; }

.brand-type-row--secondary {
  padding-top: 16px;
  border-top: 1px solid var(--color-border-light);
}

/* Accents */
.brand-demo__accents {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.brand-accent {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
  background: var(--color-surface);
}

.brand-accent__sample {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.25;
}

.brand-accent__sample--color { color: var(--color-brand-green); }
.brand-accent__sample--border { border: 2px solid var(--color-brand-green); padding: 8px 12px; border-radius: 8px; display: inline-block; }
.brand-accent__sample--fill { background: var(--color-brand-aqua); padding: 8px 12px; border-radius: 8px; display: inline-block; }
.brand-accent__sample--bar { border-left: 4px solid var(--color-brand-green); padding-left: 12px; }

.brand-accent span {
  font-size: 13px;
  color: var(--color-text-muted);
}

/* Compare grids */
.brand-demo__compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.brand-demo__compare-grid--wide {
  grid-template-columns: 1fr 1fr;
}

.brand-compare {
  position: relative;
  padding: 24px 20px 20px;
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
  background: var(--color-surface);
}

.brand-compare--bad { border-color: rgba(229, 72, 77, 0.35); }
.brand-compare--good { border-color: rgba(80, 184, 72, 0.45); }

.brand-compare__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.brand-compare--bad .brand-compare__badge { background: #e5484d; }
.brand-compare--good .brand-compare__badge { background: var(--color-brand-green); }

.brand-compare p {
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.45;
}

.brand-compare p:last-child { margin-bottom: 0; }

.brand-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.brand-list--bad li {
  margin-bottom: 2px;
  font-size: 15px;
}

.brand-list--good li {
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;
  font-size: 15px;
  line-height: 1.45;
}

.brand-list--good li::before {
  content: counter(list-item) '.';
  position: absolute;
  left: 0;
  font-weight: 600;
  color: var(--color-brand-green);
}

.brand-compare--photo {
  min-height: 140px;
  background:
    linear-gradient(135deg, #8fd694 0%, #50b848 40%, #0e100f 100%);
  overflow: hidden;
}

.brand-photo-text {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.brand-photo-text--overlay {
  display: inline-block;
  background: rgba(14, 16, 15, 0.85);
  padding: 10px 14px;
  border-radius: 8px;
}

.brand-caps {
  margin: 0 0 12px;
  font-weight: 700;
  font-size: 20px;
}

.brand-caps--tight { letter-spacing: -0.05em; }
.brand-caps--loose { letter-spacing: 0.35em; }
.brand-caps--correct { letter-spacing: 0.12em; }

.brand-leading {
  margin: 0;
  font-size: 14px;
}

.brand-leading--tight { line-height: 1.1; }
.brand-leading--good { line-height: 1.55; }

.brand-demo__names {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.brand-name {
  position: relative;
  padding: 24px 20px 16px;
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
}

.brand-name--good { background: var(--color-brand-mint); }
.brand-name--bad { background: var(--color-surface); }

.brand-name p {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 500;
}

/* Layouts */
.brand-demo__layouts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.brand-layout {
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
  padding: 16px;
  background: var(--color-surface);
}

.brand-layout__title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
}

.brand-layout__mock {
  position: relative;
  height: 160px;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--color-border-light);
}

.brand-layout__logo-img {
  position: absolute;
  top: 10px;
  left: 10px;
  max-height: 18px;
  z-index: 1;
}

.brand-layout__headline {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-size: 13px;
  font-weight: 700;
}

.brand-layout__headline--overlay {
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 10px;
  border-radius: 6px;
}

.brand-layout__frame {
  position: absolute;
  right: 12px;
  top: 36px;
  width: 55%;
  height: 100px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-brand-aqua), var(--color-brand-green));
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.brand-layout__mock--v2 {
  background: linear-gradient(160deg, #e5f6f4, #50b848);
}

.brand-layout__mock--v3 {
  background: var(--color-brand-mint);
}

.brand-layout__illustration {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, var(--color-brand-yellow), var(--color-brand-green));
}

.brand-layout p {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--color-text-secondary);
}

/* Digital */
.brand-demo__digital {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.brand-digital-card {
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
  padding: 16px;
  background: var(--color-surface);
}


.brand-digital-card h4 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.brand-digital-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.brand-digital-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--color-brand-aqua);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 12px;
}

@media (max-width: 1279px) {
  .brand-demo__donts,
  .brand-demo__layouts,
  .brand-demo__digital {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .brand-demo__usage,
  .brand-demo__logo-grid,
  .brand-demo__donts,
  .brand-demo__accents,
  .brand-demo__compare-grid,
  .brand-demo__names,
  .brand-demo__layouts,
  .brand-demo__digital {
    grid-template-columns: 1fr;
  }

  .brand-type-row__sample--h1 { font-size: 28px; }
  .brand-type-row__sample--h2 { font-size: 24px; }
}
</style>
