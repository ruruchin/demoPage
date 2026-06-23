<script setup lang="ts">
import type { GuideFigureBlock } from '~/types/guide'
import { getBasicsGuide } from '~/data/basicsGuides'
import { getBasicsContentImagePath, getBasicsContentVideoPath } from '~/utils/basicsContentMedia'
import { BASICS_VIDEO_POSTER } from '~/utils/basicsHeroMedia'
import { tieHangingWords } from '~/utils/russianTypography'

const t = tieHangingWords

const props = defineProps<{
  figure: GuideFigureBlock
  slug: string
  editorial?: boolean
  hideCaption?: boolean
}>()

const mediaError = ref(false)
const fallbackError = ref(false)
const videoLoaded = ref(false)
const hasSource = computed(() => Boolean(props.figure.src))
const videoRef = ref<HTMLVideoElement | null>(null)
const showVideo = computed(() => props.figure.mediaKind === 'video' && hasSource.value && (!mediaError.value || videoLoaded.value))
const { paused: videosPaused, syncVideo } = useSiteVideosPaused()

const fallbackSrc = computed(() => {
  return props.figure.poster
    ?? getBasicsGuide(props.slug)?.cardImage
    ?? BASICS_VIDEO_POSTER
})

const showPrimaryImage = computed(() => props.figure.mediaKind === 'image' && hasSource.value && !mediaError.value)
const showFallbackImage = computed(() => {
  return props.figure.mediaKind === 'image'
    && (mediaError.value || !hasSource.value)
    && Boolean(fallbackSrc.value)
    && !fallbackError.value
})

const suggestedPath = computed(() => {
  if (props.figure.src?.includes('/assets/images/brandbook/')) {
    return `public/assets/images/brandbook/${props.figure.fileName}.png`
  }

  return props.figure.mediaKind === 'image'
    ? getBasicsContentImagePath(props.slug, props.figure.fileName)
    : getBasicsContentVideoPath(props.slug, props.figure.fileName)
})

const isBrandbook = computed(() => props.figure.src?.includes('/assets/images/brandbook/') ?? false)

async function ensureVideoPlayback(video: HTMLVideoElement) {
  if (videosPaused.value) {
    video.pause()
    return
  }

  video.loop = true
  video.muted = true
  try {
    if (video.paused) {
      await video.play()
      videoLoaded.value = true
      video.removeAttribute('poster')
    }
  }
  catch {
    // ignore autoplay restrictions
  }
}

function onVideoLoadedData(event: Event) {
  const video = event.target as HTMLVideoElement
  videoLoaded.value = true
  video.removeAttribute('poster')
  void ensureVideoPlayback(video)
}

function onMediaError(event: Event) {
  const target = event.target as HTMLVideoElement | HTMLImageElement
  if (target instanceof HTMLVideoElement) {
    if (videosPaused.value || target.error?.code === MediaError.MEDIA_ERR_ABORTED || videoLoaded.value) {
      return
    }
  }

  if (target.dataset.fallback === 'true') {
    fallbackError.value = true
    return
  }

  mediaError.value = true
}

watch(
  () => props.figure.src,
  () => {
    mediaError.value = false
    fallbackError.value = false
    videoLoaded.value = false
  },
)

watch(videosPaused, () => {
  syncVideo(videoRef.value)
})

onMounted(() => {
  syncVideo(videoRef.value)
})
</script>

<template>
  <figure class="guide-figure" :class="{ 'guide-figure--editorial': editorial }">
    <div
      class="guide-figure__frame"
      :class="{
        'guide-figure__frame--video': figure.mediaKind === 'video',
        'guide-figure__frame--brandbook': isBrandbook,
        'guide-figure__frame--placeholder': !showVideo && !showPrimaryImage && !showFallbackImage,
      }"
    >
      <video
        v-if="showVideo"
        :key="figure.src"
        ref="videoRef"
        class="guide-figure__media"
        :class="{ 'guide-figure__media--contain': isBrandbook || editorial }"
        :src="figure.src"
        :poster="videoLoaded ? undefined : figure.poster"
        :autoplay="!videosPaused"
        muted
        loop
        playsinline
        preload="auto"
        :aria-label="figure.alt ?? figure.label"
        @canplay="(e) => ensureVideoPlayback(e.target as HTMLVideoElement)"
        @loadeddata="onVideoLoadedData"
        @error="onMediaError"
      />

      <img
        v-else-if="showPrimaryImage"
        class="guide-figure__media"
        :class="{ 'guide-figure__media--contain': isBrandbook || editorial }"
        :src="figure.src"
        :alt="figure.alt ?? figure.label"
        @error="onMediaError"
      >

      <img
        v-else-if="showFallbackImage"
        class="guide-figure__media"
        :class="{ 'guide-figure__media--contain': true }"
        :src="fallbackSrc"
        data-fallback="true"
        :alt="figure.alt ?? figure.label"
        @error="onMediaError"
      >

      <div
        v-else
        class="guide-figure__placeholder"
        :class="{ 'guide-figure__placeholder--editorial': editorial }"
      >
        <span class="guide-figure__placeholder-icon" aria-hidden="true">
          <svg
            v-if="figure.mediaKind === 'video'"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15" stroke="var(--color-green-primary)" stroke-width="2"/>
            <path d="M13 10L22 16L13 22V10Z" fill="var(--color-green-primary)"/>
          </svg>
          <svg
            v-else
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="7" width="24" height="18" rx="3" stroke="var(--color-green-primary)" stroke-width="2"/>
            <circle cx="12" cy="14" r="2.5" fill="var(--color-green-primary)"/>
            <path d="M4 22L11 15L16 19L22 13L28 22" stroke="var(--color-green-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <p v-if="!editorial" class="guide-figure__placeholder-label">
          {{ figure.mediaKind === 'video' ? 'Видео' : 'Фото' }}: {{ figure.label }}
        </p>
        <p v-if="!editorial" class="guide-figure__placeholder-path">
          {{ suggestedPath }}
        </p>
      </div>
    </div>

    <figcaption v-if="figure.caption && !hideCaption" class="guide-figure__caption">
      {{ t(figure.caption) }}
    </figcaption>
  </figure>
</template>

<style scoped>
.guide-figure {
  margin: var(--article-space-media-top) 0 0;
  max-width: 100%;
}

.guide-figure--editorial {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.guide-figure--editorial .guide-figure__frame {
  min-height: 0;
  aspect-ratio: auto;
  background: transparent;
  border: none;
  border-radius: 0;
}

.guide-figure--editorial .guide-figure__frame--video {
  aspect-ratio: 16 / 10;
  min-height: 0;
}

.guide-figure--editorial .guide-figure__media {
  width: 100%;
  height: auto;
  min-height: 0;
  max-height: 360px;
  object-fit: contain;
}

.guide-figure__frame {
  position: relative;
  width: 100%;
  min-height: 320px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
}

.guide-figure__caption {
  margin: var(--space-3) 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-muted);
  max-width: 72ch;
}

.guide-figure__frame--video {
  min-height: 360px;
}

.guide-figure__frame--brandbook {
  min-height: 0;
  aspect-ratio: 16 / 9;
  background: var(--color-card-bg);
}

.guide-figure__media {
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: block;
  object-fit: cover;
}

.guide-figure__media--contain {
  object-fit: contain;
}

.guide-figure__placeholder {
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 24px;
  text-align: center;
  background:
    linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-muted) 100%);
}

.guide-figure__placeholder--editorial {
  min-height: 200px;
  padding: var(--space-6);
}

.guide-figure__placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--color-accent-soft);
}

.guide-figure__placeholder-label {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  max-width: 480px;
}

.guide-figure__placeholder-path {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--color-text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  word-break: break-all;
  max-width: 520px;
}

@media (max-width: 767px) {
  .guide-figure__frame {
    min-height: 240px;
  }

  .guide-figure__frame--video {
    min-height: 260px;
  }

  .guide-figure--editorial .guide-figure__media {
    max-height: 280px;
  }
}
</style>
