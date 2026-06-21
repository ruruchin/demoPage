<script setup lang="ts">
interface Props {
  visible?: boolean
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  opacity: 0.5,
})
</script>

<template>
  <div v-if="visible" class="design-overlay" aria-hidden="true">
    <img
      class="design-overlay__image"
      src="/assets/overlay/frame-1920.png"
      alt=""
      :style="{ opacity: props.opacity }"
    >
    <p class="design-overlay__hint">
      Overlay mode · opacity {{ props.opacity }} · add <code>?overlayOpacity=0.6</code> to tune
    </p>
  </div>
</template>

<style scoped>
.design-overlay {
  position: absolute;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.design-overlay__image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.design-overlay__hint {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-family: var(--font-family);
  font-size: 12px;
  line-height: 1.4;
  pointer-events: none;
}

.design-overlay__hint code {
  font-family: var(--font-family);
  font-size: 11px;
}
</style>
