import type { BasicsGuidePage, BrandDemoVariant } from '~/types/guide'
import { LAYOUTS_OVERVIEW } from '~/utils/brandbookLayouts'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'layouts'
const demo = (variant: BrandDemoVariant) => ({ type: 'demo' as const, variant })

export const layoutsGuide: BasicsGuidePage = {
  slug,
  title: 'Строение макетов',
  subtitle: 'Три вида компоновки рекламных макетов — брендбук v1.0.1',
  sidebarLabel: 'Макеты',
  cardDescription: 'Три вида строения рекламных макетов',
  cardImage: '/assets/images/card-product.svg',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Строение макетов'),
  tabs: [
    {
      id: 'types',
      label: 'Виды',
      sections: [
        {
          id: 'overview',
          title: 'Строение макетов',
          blocks: [
            {
              type: 'text',
              content: LAYOUTS_OVERVIEW.intro,
            },
            {
              type: 'text',
              content: LAYOUTS_OVERVIEW.note,
            },
            ...LAYOUTS_OVERVIEW.types.flatMap(item => [
              { type: 'heading' as const, content: item.title },
              { type: 'text' as const, content: item.summary },
            ]),
          ],
        },
      ],
      toc: [
        { id: 'overview', label: 'Обзор', sectionId: 'overview' },
      ],
    },
    {
      id: 'components',
      label: 'Состав',
      sections: [
        {
          id: 'type-1',
          title: 'Вид 1',
          blocks: [demo('layout-type-1')],
        },
        {
          id: 'type-2',
          title: 'Вид 2',
          blocks: [demo('layout-type-2')],
        },
        {
          id: 'type-3',
          title: 'Вид 3',
          blocks: [demo('layout-type-3')],
        },
      ],
      toc: [
        { id: 'type-1', label: 'Вид 1', sectionId: 'type-1' },
        { id: 'type-2', label: 'Вид 2', sectionId: 'type-2' },
        { id: 'type-3', label: 'Вид 3', sectionId: 'type-3' },
      ],
    },
  ],
}
