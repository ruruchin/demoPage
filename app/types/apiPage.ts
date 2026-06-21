export interface ApiTocItem {
  id: string
  label: string
  sectionId: string
}

export type ApiContentBlock =
  | { type: 'text'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; title?: string; content: string }

export interface ApiSection {
  id: string
  title?: string
  blocks: ApiContentBlock[]
}

export interface ApiIntegration {
  id: string
  label: string
  icon: string
  sections: ApiSection[]
  toc: ApiTocItem[]
}

export interface ApiPlatformBadge {
  id: string
  label: string
  icon: string
}
