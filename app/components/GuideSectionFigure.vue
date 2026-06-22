<script setup lang="ts">
import type { GuideFigureBlock } from '~/types/guide'
import { getBasicsContentImagePath, getBasicsContentVideoPath } from '~/utils/basicsContentMedia'

const props = defineProps<{
  figure: GuideFigureBlock
  slug: string
}>()

const mediaError = ref(false)
const videoLoaded = ref(false)
const hasSource = computed(() => Boolean(props.figure.src))
const videoRef = ref<HTMLVideoElement | null>(null)
const showVideo = computed(() => props.figure.mediaKind === 'video' && hasSource.value && (!mediaError.value || videoLoaded.value))
const { paused: videosPaused, syncVideo } = useSiteVideosPaused()

const suggestedPath = computed(() =>
  props.figure.mediaKind === 'image'
    ? getBasicsContentImagePath(props.slug, props.figure.fileName)
    : getBasicsContentVideoPath(props.slug, props.figure.fileName),
)

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

  mediaError.value = true
}

watch(
  () => props.figure.src,
  () => {
    mediaError.value = false
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
  <figure class="guide-figure">
    <div
      class="guide-figure__frame"
      :class="{
        'guide-figure__frame--video': figure.mediaKind === 'video',
        'guide-figure__frame--placeholder': !hasSource || mediaError,
      }"
    >
      <video
        v-if="showVideo"
        :key="figure.src"
        ref="videoRef"
        class="guide-figure__media"
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
        v-else-if="figure.mediaKind === 'image' && hasSource && !mediaError"
        class="guide-figure__media"
        :src="figure.src"
        :alt="figure.alt ?? figure.label"
        @error="onMediaError"
      >

      <div v-else class="guide-figure__placeholder">
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
        <p class="guide-figure__placeholder-label">
          {{ figure.mediaKind === 'video' ? 'Видео' : 'Фото' }}: {{ figure.label }}
        </p>
        <p class="guide-figure__placeholder-path">
          {{ suggestedPath }}
        </p>
      </div>
    </div>

    <figcaption v-if="figure.caption" class="guide-figure__caption">
      {{ figure.caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.guide-figure {
  margin: 32px 0 0;
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

.guide-figure__frame--video {
  min-height: 360px;
}

.guide-figure__media {
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: block;
  object-fit: cover;
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

.guide-figure__caption {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-muted);
}

@media (max-width: 767px) {
  .guide-figure__frame {
    min-height: 240px;
  }

  .guide-figure__frame--video {
    min-height: 260px;
  }
}
</style>
