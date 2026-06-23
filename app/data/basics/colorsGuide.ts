import type { BasicsGuidePage, BrandDemoVariant } from '~/types/guide'
import { brandbookFigure } from '~/utils/brandbookAssets'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'colors'
const demo = (variant: BrandDemoVariant) => ({ type: 'demo' as const, variant })

export const colorsGuide: BasicsGuidePage = {
  slug,
  title: 'Фирменные цвета',
  subtitle: 'Цветовая палитра фирменного стиля — брендбук v1.0.1',
  sidebarLabel: 'Цвета',
  cardDescription: 'Зелёный, чёрный, белый, жёлтый и пастельные оттенки',
  cardImage: '/assets/images/card-colors.svg',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Фирменные цвета'),
  tabs: [
    {
      id: 'palette',
      label: 'Палитра',
      sections: [
        {
          id: 'primary',
          title: 'Фирменные цвета',
          blocks: [
            {
              type: 'text',
              content: 'Пять основных цветов задают тон коммуникаций бренда.',
            },
            {
              type: 'text',
              content: 'Ниже — значения для копирования в макеты и код.',
            },
            demo('color-palette-primary'),
          ],
        },
        {
          id: 'pastel',
          title: 'Дополнительные пастельные цвета',
          blocks: [
            {
              type: 'text',
              content: 'Светлые оттенки для рекламы и digital — когда нужно разнообразить фон без ухода от фирменного стиля.',
            },
            demo('color-palette-pastel'),
          ],
        },
      ],
      toc: [
        { id: 'primary', label: 'Основные', sectionId: 'primary' },
        { id: 'pastel', label: 'Пастель', sectionId: 'pastel' },
      ],
    },
  ],
}
