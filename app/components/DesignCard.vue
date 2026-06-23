<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  imageAlt?: string
  video?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  video: '',
  to: '',
})

const videoRef = ref<HTMLVideoElement | null>(null)
const videoError = ref(false)
const videoLoaded = ref(false)
const showVideo = computed(() => Boolean(props.video) && !videoError.value)
const { paused: videosPaused, syncVideo } = useSiteVideosPaused()

async function ensurePlayback() {
  const video = videoRef.value
  if (!video || videoError.value) {
    return
  }

  if (videosPaused.value) {
    video.pause()
    return
  }

  video.muted = true
  video.loop = true

  try {
    if (video.paused) {
      await video.play()
      videoLoaded.value = true
      video.removeAttribute('poster')
    }
  }
  catch {
    // Autoplay can be blocked until user interaction.
  }
}

function onVideoError(event: Event) {
  const video = event.target as HTMLVideoElement
  if (videosPaused.value || video.error?.code === MediaError.MEDIA_ERR_ABORTED || videoLoaded.value) {
    return
  }

  videoError.value = true
}

function onVideoLoadedData() {
  videoLoaded.value = true
  videoRef.value?.removeAttribute('poster')
  void ensurePlayback()
}

watch(videosPaused, () => {
  syncVideo(videoRef.value)
})

watch(() => props.video, () => {
  videoError.value = false
  videoLoaded.value = false
  nextTick(() => {
    syncVideo(videoRef.value)
    void ensurePlayback()
  })
})

onMounted(() => {
  syncVideo(videoRef.value)
  void ensurePlayback()
})
</script>

<template>
  <article class="design-card">
    <div class="design-card__media">
      <video
        v-if="showVideo"
        ref="videoRef"
        class="design-card__video"
        :src="video"
        :poster="videoLoaded ? undefined : image"
        :autoplay="!videosPaused"
        muted
        loop
        playsinline
        preload="auto"
        :aria-label="imageAlt || title"
        @canplay="ensurePlayback"
        @loadeddata="onVideoLoadedData"
        @error="onVideoError"
      />

      <img
        v-else
        class="design-card__image"
        :src="image"
        :alt="imageAlt || title"
      >
    </div>

    <div class="design-card__body">
      <h3 class="design-card__title">
        {{ title }}
      </h3>
      <p class="design-card__description">
        {{ description }}
      </p>
      <NuxtLink
        v-if="to"
        :to="to"
        class="design-card__button"
      >
        Открыть
      </NuxtLink>
      <button
        v-else
        class="design-card__button"
        type="button"
      >
        Открыть
      </button>
    </div>
  </article>
</template>

<style scoped>
.design-card {
  width: 100%;
  max-width: 429px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

@media (max-width: 1279px) {
  .design-card {
    max-width: none;
  }
}

.design-card__media {
  height: 240px;
  flex-shrink: 0;
  background: var(--color-surface);
  overflow: hidden;
}

.design-card__video,
.design-card__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.design-card__video {
  background: var(--color-surface);
}

.design-card__body {
  padding: 24px;
}

.design-card__title {
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.2px;
  color: var(--color-text-primary);
}

.design-card__description {
  margin-top: 8px;
  font-family: var(--font-family);
  font-size: var(--font-size-card-description);
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

.design-card__button {
  width: 100%;
  height: 52px;
  margin-top: 24px;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  background: var(--color-button-muted-bg);
  color: var(--color-button-muted-text);
  border: 1px solid var(--color-border-light);
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-sizing: border-box;
}

.design-card__button:hover {
  transform: translateY(-1px);
  background: var(--color-green-light);
  border-color: var(--color-green-light);
  color: var(--color-text-primary);
}

@media (min-width: 2560px) {
  .design-card {
    max-width: none;
    min-height: 480px;
  }

  .design-card__media {
    height: 280px;
  }

  .design-card__body {
    padding: 32px;
  }

  .design-card__title {
    font-size: 24px;
  }
}
</style>
