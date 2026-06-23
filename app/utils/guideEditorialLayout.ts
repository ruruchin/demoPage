import type { BrandDemoVariant, GuideContentBlock } from '~/types/guide'

export type GuideCopyBlock =
  | Extract<GuideContentBlock, { type: 'text' }>
  | Extract<GuideContentBlock, { type: 'heading' }>
  | Extract<GuideContentBlock, { type: 'list' }>

export type GuideMediaBlock =
  | Extract<GuideContentBlock, { type: 'figure' }>
  | Extract<GuideContentBlock, { type: 'demo' }>

export type GuideBlockGroup =
  | { kind: 'copy'; blocks: GuideCopyBlock[] }
  | { kind: 'standalone'; block: GuideContentBlock }
  | { kind: 'editorial'; copy: GuideCopyBlock[]; media: GuideMediaBlock }

/** Демо с собственным editorial-layout или full-width сеткой — не оборачиваем снаружи. */
const STANDALONE_DEMOS = new Set<BrandDemoVariant>([
  'color-palette-primary',
  'color-palette-pastel',
  'brand-fonts',
  'brand-elements-3d-primitives',
  'brand-elements-3d-examples',
  'brand-elements-2d',
  'brand-elements-mesh',
  'layout-type-1',
  'layout-type-2',
  'layout-type-3',
  'logo-primary',
  'logo-versions',
  'logo-donts',
  'logo-clear-space',
  'editorial-dashes',
  'color-usage',
  'digital-overview',
])

const EDITORIAL_TABLE_DEMOS = new Set<BrandDemoVariant>([
  'editorial-hyphenation',
  'editorial-quotes',
  'editorial-lists',
  'editorial-contrast',
  'editorial-tracking',
  'editorial-leading',
  'editorial-company-name',
])

export function isGuideEditorialTableDemo(variant: BrandDemoVariant): boolean {
  return EDITORIAL_TABLE_DEMOS.has(variant)
}

function isCopyBlock(block: GuideContentBlock): block is GuideCopyBlock {
  return block.type === 'text' || block.type === 'heading' || block.type === 'list'
}

function isMediaBlock(block: GuideContentBlock): block is GuideMediaBlock {
  return block.type === 'figure' || block.type === 'demo'
}

function isStandaloneBlock(block: GuideContentBlock, slug: string): boolean {
  if (slug === 'digital') {
    return true
  }

  if (block.type === 'demo') {
    return STANDALONE_DEMOS.has(block.variant)
  }

  return false
}

export function groupGuideSectionBlocks(
  blocks: GuideContentBlock[],
  slug: string,
): GuideBlockGroup[] {
  if (slug === 'digital') {
    return blocks.map(block => ({ kind: 'standalone', block }))
  }

  const groups: GuideBlockGroup[] = []
  let index = 0

  while (index < blocks.length) {
    const block = blocks[index]

    if (isCopyBlock(block)) {
      const copy: GuideCopyBlock[] = []

      while (index < blocks.length && isCopyBlock(blocks[index])) {
        copy.push(blocks[index] as GuideCopyBlock)
        index++
      }

      const next = blocks[index]
      if (next && isMediaBlock(next) && !isStandaloneBlock(next, slug)) {
        groups.push({ kind: 'editorial', copy, media: next })
        index++
      }
      else {
        groups.push({ kind: 'copy', blocks: copy })
      }
      continue
    }

    groups.push({ kind: 'standalone', block })
    index++
  }

  return groups
}
