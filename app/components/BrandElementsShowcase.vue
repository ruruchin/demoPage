<script setup lang="ts">
import {
  BRAND_ELEMENTS_2D,
  BRAND_ELEMENTS_3D,
  BRAND_ELEMENTS_MESH,
} from '~/utils/brandbookElements'

defineProps<{
  part: '3d-primitives' | '3d-examples' | '2d' | 'mesh'
}>()
</script>

<template>
  <div class="brand-elements">
    <!-- 3D: ввод + примитивы -->
    <article
      v-if="part === '3d-primitives'"
      class="article-editorial-row brand-elements__row brand-elements__row--lead"
    >
      <div class="article-editorial-row__copy">
        <p class="article-editorial-row__body">
          {{ BRAND_ELEMENTS_3D.intro }}
        </p>
      </div>
      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-elements__media">
          <div
            class="brand-elements__primitives"
            role="list"
            aria-label="Примеры 3D-фигур"
          >
            <img
              v-for="item in BRAND_ELEMENTS_3D.primitives"
              :key="item.src"
              :src="item.src"
              :alt="item.alt"
              class="brand-elements__primitive"
              loading="lazy"
              role="listitem"
            >
          </div>
        </div>
        <p class="article-editorial-media__caption">
          Базовые 3D-формы: конус, тор, сфера, цилиндр
        </p>
      </div>
    </article>

    <!-- 3D: примеры в контексте -->
    <article
      v-else-if="part === '3d-examples'"
      class="article-editorial-row brand-elements__row brand-elements__row--split"
    >
      <div class="article-editorial-row__copy">
        <h3 class="article-editorial-row__title">
          {{ BRAND_ELEMENTS_3D.headline }}
        </h3>
        <p class="article-editorial-row__body">
          Примеры использования 3D-объектов в рекламных носителях и баннерах.
        </p>
      </div>
      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-elements__media brand-elements__media--photo">
          <img
            :src="BRAND_ELEMENTS_3D.scene"
            alt="3D-сцена: смартфон под защитным куполом"
            class="brand-elements__photo"
            loading="lazy"
          >
        </div>
        <p class="article-editorial-media__caption">
          3D-сцена с защитным куполом
        </p>
      </div>
    </article>

    <!-- 2D -->
    <article
      v-else-if="part === '2d'"
      class="article-editorial-row brand-elements__row"
    >
      <div class="article-editorial-row__copy">
        <p class="article-editorial-row__body">
          {{ BRAND_ELEMENTS_2D.intro }}
        </p>
      </div>
      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-elements__media brand-elements__media--photo">
          <img
            :src="BRAND_ELEMENTS_2D.illustration"
            alt="Пример 2D-иллюстрации"
            class="brand-elements__photo brand-elements__photo--2d"
            loading="lazy"
          >
        </div>
        <p class="article-editorial-media__caption">
          Стилизованные 2D-объекты и персонажи
        </p>
      </div>
    </article>

    <!-- Mesh -->
    <article
      v-else
      class="article-editorial-row brand-elements__row"
    >
      <div class="article-editorial-row__copy">
        <p
          v-for="(paragraph, index) in BRAND_ELEMENTS_MESH.paragraphs"
          :key="index"
          class="article-editorial-row__body"
        >
          {{ paragraph }}
        </p>
        <p class="article-editorial-row__body">
          {{ BRAND_ELEMENTS_MESH.toolPrefix }}
          <a
            :href="BRAND_ELEMENTS_MESH.toolUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="article-editorial-row__link article-editorial-row__link--inline"
          >
            {{ BRAND_ELEMENTS_MESH.toolLabel }}
          </a>
        </p>
      </div>
      <div class="article-editorial-row__media">
        <div class="article-editorial-media brand-elements__media brand-elements__media--mesh">
          <img
            :src="BRAND_ELEMENTS_MESH.images[0].src"
            :alt="BRAND_ELEMENTS_MESH.images[0].alt"
            class="brand-elements__photo brand-elements__photo--mesh-main"
            loading="lazy"
          >
          <div class="brand-elements__mesh-row">
            <img
              v-for="item in BRAND_ELEMENTS_MESH.images.slice(1)"
              :key="item.src"
              :src="item.src"
              :alt="item.alt"
              class="brand-elements__photo brand-elements__photo--mesh-thumb"
              loading="lazy"
            >
          </div>
        </div>
        <p class="article-editorial-media__caption">
          Мэш-градиенты на фирменной палитре
        </p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.brand-elements__row--lead {
  padding-top: 0;
  border-top: none;
}

.brand-elements__row--split {
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.brand-elements__media {
  padding: var(--space-5);
  overflow: hidden;
}

.brand-elements__media--photo {
  padding: 0;
  background: var(--color-card-bg);
}

.brand-elements__media--mesh {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.brand-elements__media--photo .brand-elements__photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0;
  min-height: 280px;
  max-height: 420px;
  object-fit: contain;
}

.brand-elements__photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.brand-elements__photo--2d {
  min-height: 320px;
  max-height: 480px;
  object-fit: contain;
}

.brand-elements__primitives {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: var(--space-3) var(--space-4);
  min-height: 120px;
}

.brand-elements__primitive {
  display: block;
  height: 72px;
  width: auto;
  max-width: 88px;
  object-fit: contain;
}

.brand-elements__photo--mesh-main {
  aspect-ratio: 16 / 10;
  max-height: none;
}

.brand-elements__mesh-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.brand-elements__photo--mesh-thumb {
  aspect-ratio: 1;
  max-height: 140px;
}

@media (max-width: 960px) {
  .brand-elements__primitive {
    height: 56px;
    max-width: 64px;
  }

  .brand-elements__mesh-row {
    grid-template-columns: 1fr;
  }
}
</style>
