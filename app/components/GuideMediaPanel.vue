<script setup lang="ts">
import type { GuideMedia } from '~/types/guide'

const props = defineProps<{
  media: GuideMedia
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const videoError = ref(false)
const hasVideoSource = computed(() => props.media.kind === 'video' && Boolean(props.media.src))

async function ensurePlayback() {
  const video = videoRef.value
  if (!video || videoError.value) {
    return
  }

  video.loop = props.media.kind === 'video' ? (props.media.loop ?? true) : true
  video.muted = props.media.kind === 'video' ? (props.media.muted ?? true) : true

  try {
    if (video.paused) {
      await video.play()
    }
  }
  catch {
    // Autoplay can be blocked until user interaction.
  }
}

function onVideoError() {
  videoError.value = true
}

function onVideoEnded() {
  const video = videoRef.value
  if (!video) {
    return
  }

  video.currentTime = 0
  void ensurePlayback()
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    void ensurePlayback()
  }
}

watch(
  () => props.media,
  () => {
    videoError.value = false
    nextTick(() => {
      void ensurePlayback()
    })
  },
  { deep: true },
)

onMounted(() => {
  void ensurePlayback()
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <div class="guide-media-panel" :class="`guide-media-panel--${media.kind}`">
    <video
      v-if="media.kind === 'video' && hasVideoSource && !videoError"
      :key="media.src"
      ref="videoRef"
      class="guide-media-panel__video"
      :src="media.src"
      :poster="media.poster"
      autoplay
      muted
      loop
      playsinline
      disablepictureinpicture
      preload="auto"
      :aria-label="media.alt"
      @canplay="ensurePlayback"
      @loadeddata="ensurePlayback"
      @ended="onVideoEnded"
      @error="onVideoError"
    />

    <img
      v-else-if="media.kind === 'video' && media.poster"
      class="guide-media-panel__image guide-media-panel__image--cover"
      :src="media.poster"
      :alt="media.alt ?? ''"
    >

    <img
      v-else-if="media.kind === 'image' || media.kind === 'svg'"
      class="guide-media-panel__image"
      :class="{
        'guide-media-panel__image--cover': media.kind === 'svg' || media.kind === 'image' && (media.fit === 'cover' || !media.fit),
        'guide-media-panel__image--contain': media.kind === 'image' && media.fit === 'contain',
      }"
      :src="media.src"
      :alt="media.alt ?? ''"
    >
  </div>
</template>

<style scoped>
.guide-media-panel {
  width: 100%;
  height: 100%;
  min-height: 280px;
  overflow: hidden;
  background: var(--color-hero-bg);
}

.guide-media-panel__video,
.guide-media-panel__image {
  width: 100%;
  height: 100%;
  display: block;
}

.guide-media-panel__video {
  object-fit: cover;
  background: var(--color-hero-bg);
}

.guide-media-panel__image--cover {
  object-fit: cover;
}

.guide-media-panel__image--contain {
  object-fit: contain;
  object-position: center;
  padding: 24px;
  box-sizing: border-box;
}

@media (max-width: 767px) {
  .guide-media-panel {
    min-height: 220px;
  }

  .guide-media-panel__image--contain {
    padding: 16px;
  }
}
</style>
