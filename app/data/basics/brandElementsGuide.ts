import type { BasicsGuidePage, BrandDemoVariant } from '~/types/guide'
import { BRAND_ELEMENTS_3D } from '~/utils/brandbookElements'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'brand-elements'
const demo = (variant: BrandDemoVariant) => ({ type: 'demo' as const, variant })

export const brandElementsGuide: BasicsGuidePage = {
  slug,
  title: 'Фирменные элементы',
  subtitle: '3D-объекты, 2D-иллюстрации и mesh-градиенты — брендбук v1.0.1',
  sidebarLabel: 'Элементы',
  cardDescription: '3D, 2D иллюстрации и градиенты бренда',
  cardImage: '/assets/images/card-elements.svg',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Фирменные элементы'),
  tabs: [
    {
      id: 'elements',
      label: 'Элементы',
      sections: [
        {
          id: '3d',
          title: '3D элементы',
          blocks: [
            demo('brand-elements-3d-primitives'),
            {
              type: 'list',
              items: [...BRAND_ELEMENTS_3D.rules],
            },
            demo('brand-elements-3d-examples'),
          ],
        },
        {
          id: '2d',
          title: '2D иллюстрации',
          blocks: [
            demo('brand-elements-2d'),
          ],
        },
        {
          id: 'mesh',
          title: 'Мэш-градиенты',
          blocks: [
            demo('brand-elements-mesh'),
          ],
        },
      ],
      toc: [
        { id: '3d', label: '3D', sectionId: '3d' },
        { id: '2d', label: '2D', sectionId: '2d' },
        { id: 'mesh', label: 'Градиенты', sectionId: 'mesh' },
      ],
    },
  ],
}
