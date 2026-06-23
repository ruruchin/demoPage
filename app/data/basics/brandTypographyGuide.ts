import type { BasicsGuidePage, BrandDemoVariant } from '~/types/guide'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'brand-typography'
const demo = (variant: BrandDemoVariant) => ({ type: 'demo' as const, variant })

export const brandTypographyGuide: BasicsGuidePage = {
  slug,
  title: 'Фирменные шрифты',
  subtitle: 'Montserrat и Roboto — брендбук v1.0.1',
  sidebarLabel: 'Шрифты бренда',
  cardDescription: 'Шрифты Montserrat и Roboto, заголовки и акценты',
  cardImage: '/assets/images/card-brand-typography.svg',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Фирменные шрифты'),
  tabs: [
    {
      id: 'fonts',
      label: 'Шрифты',
      sections: [
        {
          id: 'families',
          title: 'Фирменный шрифт',
          blocks: [
            demo('brand-fonts'),
          ],
        },
      ],
      toc: [
        { id: 'families', label: 'Шрифты', sectionId: 'families' },
      ],
    },
    {
      id: 'headings',
      label: 'Заголовки',
      sections: [
        {
          id: 'hierarchy',
          title: 'Оформление заголовков и основного текста',
          blocks: [
            {
              type: 'heading',
              content: 'Текст заголовка',
            },
            {
              type: 'text',
              content:
                'Заголовки — наиболее бросающиеся в глаза части каталога; они должны быть удобочитаемыми. Рекомендуется использовать шрифт кеглем от 18pt.',
            },
            {
              type: 'heading',
              content: 'Текст подзаголовка',
            },
            {
              type: 'text',
              content:
                'Подзаголовок не должен являться большим блоком текста. Рекомендуемый объём — не более 4–5 строк текста. Рекомендуется использовать шрифт кеглем от 14pt.',
            },
            {
              type: 'heading',
              content: 'Основной текст',
            },
            {
              type: 'text',
              content:
                'Рекомендуется использовать шрифт кеглем от 12pt. В редких случаях допустим кегль 10pt. Для основного текста как в digital, так и в печатной продукции рекомендуется интерлиньяж в 15pt.',
            },
            demo('typography-scale'),
          ],
        },
        {
          id: 'accents',
          title: 'Акцентирование текста',
          blocks: [
            {
              type: 'text',
              content:
                'Для акцентирования текста допустимо выделение текста с помощью цвета, рамки или подложки под текст.',
            },
            demo('typography-accents'),
          ],
        },
      ],
      toc: [
        { id: 'hierarchy', label: 'Иерархия', sectionId: 'hierarchy' },
        { id: 'accents', label: 'Акценты', sectionId: 'accents' },
      ],
    },
  ],
}
