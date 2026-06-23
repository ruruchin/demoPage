import type { BasicsGuideNavItem, BasicsGuidePage } from '~/types/guide'
import { brandElementsGuide } from '~/data/basics/brandElementsGuide'
import { brandTypographyGuide } from '~/data/basics/brandTypographyGuide'
import { colorsGuide } from '~/data/basics/colorsGuide'
import { digitalGuide } from '~/data/basics/digitalGuide'
import { editorialGuide } from '~/data/basics/editorialGuide'
import { layoutsGuide } from '~/data/basics/layoutsGuide'
import { logoGuide } from '~/data/basics/logoGuide'
import { mobileDesignGuide } from '~/data/basics/mobileDesignGuide'
import { productDesignGuide } from '~/data/basics/productDesignGuide'
import { typographyGuide } from '~/data/basics/typographyGuide'

export const basicsHomeGuides: BasicsGuidePage[] = [
  mobileDesignGuide,
  typographyGuide,
  productDesignGuide,
]

export const brandbookGuideNav: BasicsGuideNavItem[] = [
  { slug: 'logo', label: 'Логотип' },
  { slug: 'colors', label: 'Фирменные цвета' },
  { slug: 'brand-typography', label: 'Шрифты бренда' },
  { slug: 'brand-elements', label: 'Фирменные элементы' },
  { slug: 'editorial', label: 'Оформление текста' },
  { slug: 'layouts', label: 'Строение макетов' },
  { slug: 'digital', label: 'Digital' },
]

export const basicsGuideNav: BasicsGuideNavItem[] = [
  ...basicsHomeGuides.map(guide => ({ slug: guide.slug, label: guide.sidebarLabel })),
  ...brandbookGuideNav,
]

export const brandbookGuides: BasicsGuidePage[] = [
  logoGuide,
  colorsGuide,
  brandTypographyGuide,
  brandElementsGuide,
  editorialGuide,
  layoutsGuide,
  digitalGuide,
]

export const basicsGuides: BasicsGuidePage[] = [
  ...basicsHomeGuides,
  ...brandbookGuides,
]

export function getBasicsGuide(slug: string) {
  return basicsGuides.find(guide => guide.slug === slug)
}

export function getBasicsGuideSlugs() {
  return basicsGuides.map(guide => guide.slug)
}

export function getBasicsHomeCards() {
  return basicsHomeGuides.map(guide => ({
    title: guide.title,
    description: guide.cardDescription,
    image: guide.cardImage,
    video: guide.cardVideo,
    to: `/basics/${guide.slug}`,
  }))
}
