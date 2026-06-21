<script setup lang="ts">
const props = defineProps<{
  title?: string
  content: string
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.content)
    copied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    copied.value = false
  }
}

onUnmounted(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <div class="api-code">
    <div v-if="title" class="api-code__header">
      <span class="api-code__title">{{ title }}</span>
      <button
        type="button"
        class="api-code__copy"
        @click="copyCode"
      >
        {{ copied ? 'Скопировано' : 'Копировать' }}
      </button>
    </div>
    <pre class="api-code__pre"><code>{{ content }}</code></pre>
  </div>
</template>

<style scoped>
.api-code {
  margin-top: 24px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.api-code__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  background: var(--color-panel-bg);
  border-bottom: 1px solid var(--color-border-light);
}

.api-code__title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.api-code__copy {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-primary);
  background: var(--color-surface-muted);
  transition: background-color 0.2s ease;
}

.api-code__copy:hover {
  background: var(--color-accent-soft);
}

.api-code__pre {
  margin: 0;
  padding: 20px 24px;
  background: var(--color-code-bg);
  color: var(--color-code-text);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.55;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.api-code__pre code {
  font-family: inherit;
}
</style>
