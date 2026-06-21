import type { BasicsGuideNavItem, BasicsGuidePage } from '~/types/guide'
import { mobileDesignGuide } from '~/data/basics/mobileDesignGuide'
import { productDesignGuide } from '~/data/basics/productDesignGuide'
import { typographyGuide } from '~/data/basics/typographyGuide'

export const basicsGuideNav: BasicsGuideNavItem[] = [
  { slug: 'mobile-design', label: 'Дизайн мобильных продуктов' },
  { slug: 'typography', label: 'Типографика' },
  { slug: 'product-design', label: 'Продуктовый дизайн' },
]

export const basicsGuides: BasicsGuidePage[] = [
  mobileDesignGuide,
  typographyGuide,
  productDesignGuide,
]

export function getBasicsGuide(slug: string) {
  return basicsGuides.find(guide => guide.slug === slug)
}

export function getBasicsGuideSlugs() {
  return basicsGuides.map(guide => guide.slug)
}

export function getBasicsHomeCards() {
  return basicsGuides.map(guide => ({
    title: guide.title,
    description: guide.cardDescription,
    image: guide.cardImage,
    to: `/basics/${guide.slug}`,
  }))
}
