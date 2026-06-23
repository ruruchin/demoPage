<script setup lang="ts">
import type { BrandColorGroup } from '~/data/brandColors'
import { getBrandColorsByGroup } from '~/data/brandColors'

const props = defineProps<{
  group: BrandColorGroup
}>()

const colors = computed(() => getBrandColorsByGroup(props.group))
const copiedKey = ref<string | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | undefined

type CopyField = 'hex' | 'rgb' | 'cmyk' | 'pantone'

const copyLabels: Record<CopyField, string> = {
  hex: 'HEX',
  rgb: 'RGB',
  cmyk: 'CMYK',
  pantone: 'PANTONE',
}

async function copyValue(colorId: string, field: CopyField, value: string | null) {
  if (!value) {
    return
  }

  try {
    await navigator.clipboard.writeText(value)
    copiedKey.value = `${colorId}-${field}`
    if (resetTimer) {
      clearTimeout(resetTimer)
    }
    resetTimer = setTimeout(() => {
      copiedKey.value = null
    }, 2000)
  }
  catch {
    copiedKey.value = null
  }
}

function chipAriaLabel(colorName: string, field: CopyField, value: string | null) {
  if (!value) {
    return undefined
  }

  return `Скопировать ${copyLabels[field]} цвета «${colorName}»: ${value}`
}

function chipCopyHint(colorName: string, field: CopyField, value: string | null) {
  if (!value) {
    return undefined
  }

  return `${colorName} · ${copyLabels[field]}: ${value}`
}

function isCopied(colorId: string, field: CopyField) {
  return copiedKey.value === `${colorId}-${field}`
}

onUnmounted(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})
</script>

<template>
  <div class="brand-color-palette" :class="`brand-color-palette--${group}`">
    <article
      v-for="color in colors"
      :key="color.id"
      class="brand-color-card"
    >
      <div
        class="brand-color-card__sample"
        :class="{ 'brand-color-card__sample--border': color.id === 'white' }"
        :style="{ background: color.hex }"
      />

      <div class="brand-color-card__body">
        <div class="brand-color-card__header">
          <h4 class="brand-color-card__name">{{ color.name }}</h4>
          <span class="brand-color-card__role">{{ color.role }}</span>
        </div>

        <div class="brand-color-card__chips">
          <button
            v-for="field in (['hex', 'rgb', 'cmyk', 'pantone'] as const)"
            :key="field"
            type="button"
            class="brand-color-chip"
            :class="{ 'brand-color-chip--copied': isCopied(color.id, field) }"
            :disabled="field === 'pantone' && !color.pantone"
            :aria-label="chipAriaLabel(color.name, field, field === 'pantone' ? color.pantone : color[field])"
            :data-copy-hint="chipCopyHint(color.name, field, field === 'pantone' ? color.pantone : color[field])"
            @click="copyValue(color.id, field, field === 'pantone' ? color.pantone : color[field])"
          >
            <span class="brand-color-chip__label">{{ copyLabels[field] }}</span>
            <span class="brand-color-chip__value">
              {{ field === 'pantone' ? (color.pantone ?? '—') : color[field] }}
            </span>
            <span class="brand-color-chip__trailing" aria-hidden="true">
              <svg
                v-if="isCopied(color.id, field)"
                class="brand-color-chip__icon brand-color-chip__icon--done"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg
                v-else
                class="brand-color-chip__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5V9.5A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.brand-color-palette {
  display: grid;
  gap: 16px;
}

.brand-color-palette--primary {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.brand-color-palette--pastel {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 720px;
}

.brand-color-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
  background: var(--color-card-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.brand-color-card__sample {
  height: 220px;
  flex-shrink: 0;
}

.brand-color-card__sample--border {
  border-bottom: 1px solid var(--color-border-light);
}

.brand-color-card__body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: visible;
}

.brand-color-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.brand-color-card__name {
  margin: 0;
  font-family: var(--font-family);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.brand-color-card__role {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.brand-color-card__chips {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brand-color-chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-light);
  background: var(--color-surface-muted);
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.brand-color-chip::after {
  content: attr(data-copy-hint);
  position: absolute;
  left: 12px;
  right: 12px;
  top: calc(100% + 6px);
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--color-text-primary);
  color: var(--color-page-bg);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.35;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  z-index: 2;
}

.brand-color-chip:hover:not(:disabled)::after,
.brand-color-chip:focus-visible:not(:disabled)::after {
  opacity: 1;
  transform: translateY(0);
}

.brand-color-chip:hover:not(:disabled) {
  background: var(--color-brand-green);
  border-color: var(--color-brand-green);
}

.brand-color-chip:hover:not(:disabled) .brand-color-chip__label,
.brand-color-chip:hover:not(:disabled) .brand-color-chip__value,
.brand-color-chip:hover:not(:disabled) .brand-color-chip__icon {
  color: var(--color-white);
}

.brand-color-chip:focus-visible {
  outline: 2px solid var(--color-brand-green);
  outline-offset: 2px;
}

.brand-color-chip--copied::after {
  content: 'Скопировано';
}

.brand-color-chip:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.brand-color-chip--copied {
  background: var(--color-brand-green);
  border-color: var(--color-brand-green);
}

.brand-color-chip--copied .brand-color-chip__label,
.brand-color-chip--copied .brand-color-chip__value,
.brand-color-chip--copied .brand-color-chip__icon,
.brand-color-chip--copied .brand-color-chip__icon--done {
  color: var(--color-white);
}

.brand-color-chip__label {
  flex: 0 0 52px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--color-text-muted);
}

.brand-color-chip__value {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-color-chip__trailing {
  flex: 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-color-chip__icon {
  color: var(--color-text-muted);
  transition: color 0.15s ease;
}

.brand-color-chip__icon--done {
  color: var(--color-brand-green);
}

.brand-color-chip:hover:not(:disabled) .brand-color-chip__icon,
.brand-color-chip--copied .brand-color-chip__icon {
  color: var(--color-white);
}

@media (max-width: 767px) {
  .brand-color-palette--primary,
  .brand-color-palette--pastel {
    grid-template-columns: 1fr;
  }

  .brand-color-card__sample {
    height: 180px;
  }
}
</style>
