<script setup lang="ts">
import {
  LAYOUT_TYPE_1,
  LAYOUT_TYPE_2,
  LAYOUT_TYPE_3,
} from '~/utils/brandbookLayouts'

const props = defineProps<{
  part: 'type-1' | 'type-2' | 'type-3'
}>()

const layouts = {
  'type-1': LAYOUT_TYPE_1,
  'type-2': LAYOUT_TYPE_2,
  'type-3': LAYOUT_TYPE_3,
} as const

const layout = computed(() => layouts[props.part])
</script>

<template>
  <article class="article-editorial-row layouts__row">
    <div class="article-editorial-row__copy">
      <p class="article-editorial-row__body">
        {{ layout.intro }}
      </p>
      <div
        v-for="item in layout.components"
        :key="item.title"
        class="layouts__component"
      >
        <h4 class="layouts__component-title">
          {{ item.title }}
        </h4>
        <p class="article-editorial-row__body">
          {{ item.text }}
        </p>
      </div>
    </div>

    <div class="article-editorial-row__media">
      <div class="article-editorial-media layouts__media">
        <img
          :src="layout.structure"
          :alt="`Строение макета — ${part}`"
          class="layouts__image"
          loading="lazy"
        >
      </div>
      <p class="article-editorial-media__caption">
        Схема строения макета
      </p>
    </div>
  </article>
</template>

<style scoped>
.layouts__row {
  padding-top: 0;
  border-top: none;
}

.layouts__component + .layouts__component {
  margin-top: var(--space-5);
}

.layouts__component-title {
  margin: 0 0 var(--space-2);
  font-size: var(--font-size-article-subheading);
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-text-primary);
}

.layouts__media {
  padding: 0;
  overflow: hidden;
}

.layouts__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
