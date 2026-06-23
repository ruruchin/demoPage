<script setup lang="ts">
import type { GuideContentBlock } from '~/types/guide'
import {
  groupGuideSectionBlocks,
  isGuideEditorialTableDemo,
} from '~/utils/guideEditorialLayout'

const props = defineProps<{
  blocks: GuideContentBlock[]
  sectionId: string
  slug: string
}>()

const groups = computed(() => groupGuideSectionBlocks(props.blocks, props.slug))
</script>

<template>
  <template
    v-for="(group, groupIndex) in groups"
    :key="`${sectionId}-group-${groupIndex}`"
  >
    <article
      v-if="group.kind === 'editorial'"
      class="article-editorial-row guide-editorial-block"
      :class="{
        'guide-editorial-block--table': group.media.type === 'demo'
          && isGuideEditorialTableDemo(group.media.variant),
      }"
    >
      <div class="article-editorial-row__copy guide-editorial-block__copy">
        <template
          v-for="(block, blockIndex) in group.copy"
          :key="`${sectionId}-copy-${groupIndex}-${blockIndex}`"
        >
          <p
            v-if="block.type === 'text'"
            class="guide-section__paragraph guide-editorial-block__paragraph"
          >
            {{ block.content }}
            <template v-if="block.link">
              <a
                :href="block.link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="guide-section__inline-link"
              >{{ block.link.label }}</a>
            </template>
          </p>

          <h3
            v-else-if="block.type === 'heading'"
            class="guide-section__heading guide-editorial-block__heading"
          >
            {{ block.content }}
          </h3>

          <ul
            v-else-if="block.type === 'list'"
            class="guide-section__list guide-editorial-block__list"
          >
            <li
              v-for="(item, index) in block.items"
              :key="`${sectionId}-list-${groupIndex}-${index}`"
              class="guide-section__item"
            >
              <span class="guide-section__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="var(--color-green-primary)" />
                </svg>
              </span>
              <span class="guide-section__text">{{ item }}</span>
            </li>
          </ul>
        </template>
      </div>

      <div class="article-editorial-row__media guide-editorial-block__media">
        <GuideSectionFigure
          v-if="group.media.type === 'figure'"
          :figure="group.media"
          :slug="slug"
          editorial
        />
        <GuideBrandDemo
          v-else
          :variant="group.media.variant"
        />
      </div>
    </article>

    <template v-else-if="group.kind === 'copy'">
      <template
        v-for="(block, blockIndex) in group.blocks"
        :key="`${sectionId}-solo-copy-${groupIndex}-${blockIndex}`"
      >
        <p
          v-if="block.type === 'text'"
          class="guide-section__paragraph"
        >
          {{ block.content }}
          <template v-if="block.link">
            <a
              :href="block.link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="guide-section__inline-link"
            >{{ block.link.label }}</a>
          </template>
        </p>

        <h3
          v-else-if="block.type === 'heading'"
          class="guide-section__heading"
        >
          {{ block.content }}
        </h3>

        <ul
          v-else-if="block.type === 'list'"
          class="guide-section__list"
        >
          <li
            v-for="(item, index) in block.items"
            :key="`${sectionId}-solo-list-${groupIndex}-${index}`"
            class="guide-section__item"
          >
            <span class="guide-section__icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="var(--color-green-primary)" />
              </svg>
            </span>
            <span class="guide-section__text">{{ item }}</span>
          </li>
        </ul>
      </template>
    </template>

    <template v-else>
      <p
        v-if="group.block.type === 'text'"
        class="guide-section__paragraph"
      >
        {{ group.block.content }}
        <template v-if="group.block.link">
          <a
            :href="group.block.link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="guide-section__inline-link"
          >{{ group.block.link.label }}</a>
        </template>
      </p>

      <h3
        v-else-if="group.block.type === 'heading'"
        class="guide-section__heading"
      >
        {{ group.block.content }}
      </h3>

      <ul
        v-else-if="group.block.type === 'list'"
        class="guide-section__list"
      >
        <li
          v-for="(item, index) in group.block.items"
          :key="`${sectionId}-standalone-list-${index}`"
          class="guide-section__item"
        >
          <span class="guide-section__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="var(--color-green-primary)" />
            </svg>
          </span>
          <span class="guide-section__text">{{ item }}</span>
        </li>
      </ul>

      <GuideSectionFigure
        v-else-if="group.block.type === 'figure'"
        :figure="group.block"
        :slug="slug"
      />

      <GuideBrandDemo
        v-else-if="group.block.type === 'demo'"
        :variant="group.block.variant"
      />
    </template>
  </template>
</template>
