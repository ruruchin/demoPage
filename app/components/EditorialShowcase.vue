<script setup lang="ts">
import {
  EDITORIAL_COMPANY,
  EDITORIAL_CONTRAST,
  EDITORIAL_DASHES,
  EDITORIAL_HYPHENATION,
  EDITORIAL_LEADING,
  EDITORIAL_LISTS,
  EDITORIAL_QUOTES,
  EDITORIAL_TRACKING,
} from '~/utils/brandbookEditorial'
import { GUIDE_EDITORIAL_TABLE_CLASS } from '~/utils/guideLayout'

defineProps<{
  part:
    | 'dashes'
    | 'hyphenation'
    | 'quotes'
    | 'lists'
    | 'contrast'
    | 'tracking'
    | 'leading'
    | 'company-name'
}>()
</script>

<template>
  <div class="ed">
    <!-- Дефис и тире -->
    <template v-if="part === 'dashes'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <section
          v-for="item in EDITORIAL_DASHES.types"
          :key="item.title"
          class="guide-editorial-table__row guide-editorial-table__row--start"
        >
          <div class="ed__rule">
            <h4 class="ed__rule-title">
              {{ item.title }}
            </h4>
            <p class="ed__rule-text">
              {{ item.description }}
            </p>
            <div v-if="item.shortcuts" class="ed__shortcuts">
              <p v-for="(line, i) in item.shortcuts" :key="i" class="ed__shortcut">
                {{ line }}
              </p>
            </div>
          </div>
          <div class="guide-editorial-table__verdict">
            <p v-for="ex in item.examples" :key="ex" class="ed__example-line">
              {{ ex }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--yes">
              {{ item.verdict }}
            </p>
            <p class="guide-editorial-table__note">
              {{ item.note }}
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Переносы -->
    <template v-else-if="part === 'hyphenation'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <section class="guide-editorial-table__row guide-editorial-table__row--start ed__row--compare ed__row--hyphenation">
          <div class="ed__hyphen-col ed__hyphen-col--bad">
            <p class="ed__hyphen-text ed__hyphen-text--bad">
              {{ EDITORIAL_HYPHENATION.badLines.join('\n') }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--no">
              Нет
            </p>
            <p class="guide-editorial-table__note">
              Строки слипаются, переносы и повторы слов
            </p>
          </div>
          <div class="ed__hyphen-col ed__hyphen-col--good">
            <p class="ed__hyphen-text ed__hyphen-text--good">
              {{ EDITORIAL_HYPHENATION.goodLines.join('\n') }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--yes">
              Да
            </p>
            <p class="guide-editorial-table__note">
              Текст хорошо читаем
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Кавычки -->
    <template v-else-if="part === 'quotes'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <section
          v-for="item in EDITORIAL_QUOTES.examples"
          :key="item.value"
          class="guide-editorial-table__row"
        >
          <p
            class="guide-editorial-table__sample guide-editorial-table__sample--lg"
            :class="{ 'guide-editorial-table__sample--lg-bad': !item.ok }"
          >
            {{ item.value }}
          </p>
          <div class="guide-editorial-table__verdict">
            <p
              class="guide-editorial-table__label"
              :class="item.ok ? 'guide-editorial-table__label--yes' : 'guide-editorial-table__label--no'"
            >
              {{ item.ok ? 'Да' : 'Нет' }}
            </p>
            <p class="guide-editorial-table__note">
              {{ item.label }}
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Списки -->
    <template v-else-if="part === 'lists'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <div class="guide-editorial-table__legend">
          <span v-for="m in EDITORIAL_LISTS.markers" :key="m">{{ m }}</span>
          <span v-for="l in EDITORIAL_LISTS.levels" :key="l">{{ l }}</span>
        </div>

        <section
          v-for="(ex, idx) in EDITORIAL_LISTS.examples"
          :key="idx"
          class="guide-editorial-table__row guide-editorial-table__row--start"
        >
          <div class="guide-editorial-table__sample">
            <ol
              class="ed__list"
              :class="{
                'ed__list--bad': !ex.ok,
                'ed__list--good': ex.ok,
                'ed__list--marker-gap': ex.tight === 'marker',
              }"
            >
              <li v-for="item in ex.items" :key="item">
                <template v-if="ex.tight === true">{{ item }}</template>
                <template v-else-if="ex.tight === 'marker'">
                  <span class="ed__list-num">1.</span>{{ item }}
                </template>
                <template v-else>
                  {{ item }}
                </template>
              </li>
            </ol>
          </div>
          <div class="guide-editorial-table__verdict">
            <p
              class="guide-editorial-table__label"
              :class="ex.ok ? 'guide-editorial-table__label--yes' : 'guide-editorial-table__label--no'"
            >
              {{ ex.ok ? 'Да' : 'Нет' }}
            </p>
            <p class="guide-editorial-table__note">
              {{ ex.note }}
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Контрастность -->
    <template v-else-if="part === 'contrast'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <section class="guide-editorial-table__row ed__row--compare">
          <div class="ed__photo">
            <img :src="EDITORIAL_CONTRAST.photo" alt="" class="ed__photo-bg">
            <p class="ed__photo-label">
              Текст без подложки
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--no">
              Нет
            </p>
            <p class="guide-editorial-table__note ed__note--on-photo">
              Текст нечитаем и конфликтует с деталями фото
            </p>
          </div>
          <div class="ed__photo">
            <img :src="EDITORIAL_CONTRAST.photo" alt="" class="ed__photo-bg">
            <p class="ed__photo-label ed__photo-label--overlay">
              Текст с подложкой
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--yes">
              Да
            </p>
            <p class="guide-editorial-table__note ed__note--on-photo">
              Текст хорошо читаем
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Разрядка -->
    <template v-else-if="part === 'tracking'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <section
          v-for="row in EDITORIAL_TRACKING.rows"
          :key="row.text"
          class="guide-editorial-table__row"
        >
          <p
            class="ed__tracking-sample"
            :class="{
              'ed__tracking-sample--tight': row.style === 'tight',
              'ed__tracking-sample--correct': row.style === 'correct',
              'ed__tracking-sample--loose': row.style === 'loose',
            }"
          >
            {{ row.text }}
          </p>
          <div class="guide-editorial-table__verdict">
            <p
              class="guide-editorial-table__label"
              :class="row.ok ? 'guide-editorial-table__label--yes' : 'guide-editorial-table__label--no'"
            >
              {{ row.ok ? 'Да' : 'Нет' }}
            </p>
            <p class="guide-editorial-table__note">
              {{ row.note }}
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Интерлиньяж -->
    <template v-else-if="part === 'leading'">
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <p class="guide-editorial-table__section-label">
          Большой текст
        </p>
        <section class="guide-editorial-table__row guide-editorial-table__row--start ed__row--compare">
          <div class="ed__leading-col">
            <p class="ed__leading-heading ed__leading-heading--bad">
              {{ EDITORIAL_LEADING.large.bad.title }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--no">
              Нет
            </p>
            <p class="guide-editorial-table__note">
              {{ EDITORIAL_LEADING.large.bad.note }}
            </p>
          </div>
          <div class="ed__leading-col">
            <p class="ed__leading-heading ed__leading-heading--good">
              {{ EDITORIAL_LEADING.large.good.title }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--yes">
              Да
            </p>
            <p class="guide-editorial-table__note">
              {{ EDITORIAL_LEADING.large.good.note }}
            </p>
          </div>
        </section>

        <p class="guide-editorial-table__section-label">
          Мелкий текст
        </p>
        <section class="guide-editorial-table__row guide-editorial-table__row--start ed__row--compare">
          <div class="ed__leading-col">
            <p class="ed__leading-body ed__leading-body--bad">
              {{ EDITORIAL_LEADING.small.sample }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--no">
              Нет
            </p>
            <p class="guide-editorial-table__note">
              Строки слипаются
            </p>
          </div>
          <div class="ed__leading-col">
            <p class="ed__leading-body ed__leading-body--good">
              {{ EDITORIAL_LEADING.small.sample }}
            </p>
            <p class="guide-editorial-table__label guide-editorial-table__label--yes">
              Да
            </p>
            <p class="guide-editorial-table__note">
              Текст хорошо читаем
            </p>
          </div>
        </section>
      </div>
    </template>

    <!-- Название компании -->
    <template v-else>
      <div :class="GUIDE_EDITORIAL_TABLE_CLASS">
        <section class="guide-editorial-table__row guide-editorial-table__row--start">
          <div class="guide-editorial-table__sample">
            <p class="guide-editorial-table__label guide-editorial-table__label--yes">
              {{ EDITORIAL_COMPANY.correct.label }}
            </p>
            <p class="ed__company-name">
              {{ EDITORIAL_COMPANY.correct.name }}
            </p>
          </div>
          <div class="guide-editorial-table__verdict">
            <p class="guide-editorial-table__note">
              {{ EDITORIAL_COMPANY.correct.note }}
            </p>
          </div>
        </section>

        <p class="guide-editorial-table__section-label">
          {{ EDITORIAL_COMPANY.incorrect.label }}
        </p>

        <section
          v-for="item in EDITORIAL_COMPANY.incorrect.items"
          :key="item.text"
          class="guide-editorial-table__row guide-editorial-table__row--start"
        >
          <p class="ed__company-wrong">
            {{ item.text }}
          </p>
          <div class="guide-editorial-table__verdict">
            <p class="guide-editorial-table__note">
              {{ item.note }}
            </p>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped>
.ed {
  max-width: 100%;
}

/* Дефис и тире — левая колонка */
.ed__rule-title {
  margin: 0 0 var(--space-3);
  font-size: var(--font-size-article-subheading);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-primary);
}

.ed__rule-text {
  margin: 0;
  font-size: var(--font-size-article-body);
  line-height: var(--line-height-article-body);
  color: var(--color-text-primary);
  max-width: 36ch;
}

.ed__shortcuts {
  margin-top: var(--space-6);
}

.ed__shortcut {
  margin: 0;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.ed__example-line {
  margin: 0 0 var(--space-2);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text-primary);
}

.ed__example-line:last-of-type {
  margin-bottom: var(--space-4);
}

/* Сравнение в две колонки (переносы, контраст, интерлиньяж) */
.ed__row--compare {
  border-bottom: none;
  padding-bottom: 0;
}

.ed__row--hyphenation {
  gap: var(--space-6) var(--space-9);
}

/* Переносы */
.ed__hyphen-col {
  min-width: 0;
  padding: var(--space-6);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
  background: var(--color-card-bg);
}

.ed__hyphen-text {
  margin: 0 0 var(--space-5);
  font-size: var(--font-size-article-body);
  color: var(--color-text-body);
  white-space: pre-line;
  max-width: 38ch;
}

.ed__hyphen-text--bad {
  line-height: 1.12;
}

.ed__hyphen-text--good {
  line-height: 1.6;
}

.ed__hyphen-col .guide-editorial-table__label {
  margin-top: 0;
}

.ed__hyphen-col .guide-editorial-table__note {
  max-width: none;
}

/* Списки — только стили самого списка */
.ed__list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 320px;
}

.ed__list--bad li {
  margin-bottom: 2px;
  font-size: var(--font-size-article-body);
  line-height: 1.3;
}

.ed__list--good li {
  margin-bottom: var(--space-4);
  padding-left: 28px;
  position: relative;
  font-size: var(--font-size-article-body);
  line-height: 1.45;
}

.ed__list--good li::before {
  content: counter(list-item) '.';
  position: absolute;
  left: 0;
  font-weight: 600;
  color: var(--color-brand-green);
}

.ed__list--marker-gap li {
  padding-left: 0;
}

.ed__list-num {
  margin-right: var(--space-1);
}

/* Фото */
.ed__photo {
  position: relative;
  min-height: 280px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.ed__photo-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ed__photo-label {
  position: relative;
  margin: 0 0 var(--space-3);
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.ed__photo-label--overlay {
  align-self: flex-start;
  background: rgba(14, 16, 15, 0.88);
  padding: 10px 14px;
  border-radius: 6px;
  text-shadow: none;
}

.ed__photo .guide-editorial-table__label,
.ed__photo .guide-editorial-table__note {
  position: relative;
}

.ed__note--on-photo {
  color: rgba(255, 255, 255, 0.9);
}

/* Разрядка */
.ed__tracking-sample {
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.1;
}

.ed__tracking-sample--tight {
  letter-spacing: -0.04em;
}

.ed__tracking-sample--correct {
  letter-spacing: 0.14em;
}

.ed__tracking-sample--loose {
  letter-spacing: 0.38em;
}

/* Интерлиньяж */
.ed__leading-heading {
  margin: 0 0 var(--space-4);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  white-space: pre-line;
}

.ed__leading-heading--bad {
  line-height: 0.82;
}

.ed__leading-heading--good {
  line-height: 1.15;
}

.ed__leading-body {
  margin: 0 0 var(--space-4);
  font-size: 14px;
}

.ed__leading-body--bad {
  line-height: 1.05;
}

.ed__leading-body--good {
  line-height: 1.55;
}

/* Компания */
.ed__company-name {
  margin: var(--space-3) 0 0;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text-primary);
}

.ed__company-wrong {
  margin: 0;
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 700;
  line-height: 1.15;
}

@media (max-width: 767px) {
  .ed__shortcuts {
    margin-top: var(--space-4);
  }
}
</style>
