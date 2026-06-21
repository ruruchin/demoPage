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

export type GuideContentBlock =
  | { type: 'text'; content: string }
  | { type: 'list'; items: string[] }
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
  media: GuideMedia
  tabs: GuideTab[]
}

export interface BasicsGuideNavItem {
  slug: string
  label: string
}
