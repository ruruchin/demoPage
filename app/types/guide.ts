export type GuideMedia =
  | {
    kind: 'image'
    src: string
    alt?: string
    fit?: 'cover' | 'contain'
  }
  | {
    kind: 'svg'
    src: string
    alt?: string
  }
  | {
    kind: 'video'
    src?: string
    poster?: string
    alt?: string
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    playsInline?: boolean
    controls?: boolean
  }

export interface GuideFigureBlock {
  type: 'figure'
  mediaKind: 'image' | 'video'
  fileName: string
  label: string
  caption?: string
  src?: string
  poster?: string
  alt?: string
}

export type BrandDemoVariant =
  | 'color-palette-primary'
  | 'color-palette-pastel'
  | 'color-usage'
  | 'logo-primary'
  | 'logo-versions'
  | 'logo-clear-space'
  | 'logo-donts'
  | 'typography-scale'
  | 'typography-accents'
  | 'brand-fonts'
  | 'editorial-dashes'
  | 'editorial-hyphenation'
  | 'editorial-quotes'
  | 'editorial-lists'
  | 'editorial-contrast'
  | 'editorial-tracking'
  | 'editorial-leading'
  | 'editorial-company-name'
  | 'layout-type-1'
  | 'layout-type-2'
  | 'layout-type-3'
  | 'brand-elements-3d-primitives'
  | 'brand-elements-3d-examples'
  | 'brand-elements-2d'
  | 'brand-elements-mesh'
  | 'digital-overview'

export type GuideContentBlock =
  | { type: 'text'; content: string; link?: { label: string; href: string } }
  | { type: 'heading'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'demo'; variant: BrandDemoVariant }
  | GuideFigureBlock

export interface GuideSection {
  id: string
  title?: string
  blocks: GuideContentBlock[]
}

export interface GuideTocItem {
  id: string
  label: string
  sectionId: string
}

export interface GuideTab {
  id: string
  label: string
  sections: GuideSection[]
  toc: GuideTocItem[]
}

export interface BasicsGuidePage {
  slug: string
  title: string
  subtitle: string
  sidebarLabel: string
  cardDescription: string
  cardImage: string
  cardVideo?: string
  media: GuideMedia
  tabs: GuideTab[]
}

export interface BasicsGuideNavItem {
  slug: string
  label: string
}
