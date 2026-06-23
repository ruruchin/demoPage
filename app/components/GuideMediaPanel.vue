<script setup lang="ts">
import type { GuideMedia } from '~/types/guide'

const props = defineProps<{
  media: GuideMedia
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const videoError = ref(false)
const videoLoaded = ref(false)
const hasVideoSource = computed(() => props.media.kind === 'video' && Boolean(props.media.src))
const showVideo = computed(() => props.media.kind === 'video' && hasVideoSource.value && (!videoError.value || videoLoaded.value))
const { paused: videosPaused, syncVideo } = useSiteVideosPaused()

function markVideoLoaded() {
  videoLoaded.value = true
  const video = videoRef.value
  if (video) {
    video.removeAttribute('poster')
  }
}

async function ensurePlayback() {
  const video = videoRef.value
  if (!video || (videoError.value && !videoLoaded.value)) {
    return
  }

  if (videosPaused.value) {
    video.pause()
    return
  }

  if (!video.paused) {
    markVideoLoaded()
  }

  video.loop = props.media.kind === 'video' ? (props.media.loop ?? true) : true
  video.muted = props.media.kind === 'video' ? (props.media.muted ?? true) : true

  try {
    if (video.paused) {
      await video.play()
      markVideoLoaded()
    }
  }
  catch {
    // Autoplay can be blocked until user interaction.
  }
}

function onVideoError(event: Event) {
  const video = event.target as HTMLVideoElement
  if (videosPaused.value || video.error?.code === MediaError.MEDIA_ERR_ABORTED) {
    return
  }

  if (videoLoaded.value) {
    return
  }

  videoError.value = true
}

function onVideoLoadedData() {
  markVideoLoaded()
  void ensurePlayback()
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
  if (document.visibilityState === 'visible' && !videosPaused.value) {
    void ensurePlayback()
  }
}

watch(videosPaused, () => {
  syncVideo(videoRef.value)
})

watch(
  () => props.media,
  () => {
    videoError.value = false
    videoLoaded.value = false
    nextTick(() => {
      void ensurePlayback()
    })
  },
  { deep: true },
)

onMounted(() => {
  syncVideo(videoRef.value)
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
      v-if="showVideo"
      :key="media.src"
      ref="videoRef"
      class="guide-media-panel__video"
      :src="media.src"
      :poster="videoLoaded ? undefined : media.poster"
      :autoplay="!videosPaused"
      muted
      loop
      playsinline
      disablepictureinpicture
      preload="auto"
      :aria-label="media.alt"
      @canplay="ensurePlayback"
      @loadeddata="onVideoLoadedData"
      @ended="onVideoEnded"
      @error="onVideoError"
    />

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

.guide-media-panel--image {
  background: #fff;
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
