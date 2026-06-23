import type { BasicsGuidePage, BrandDemoVariant } from '~/types/guide'
import {
  EDITORIAL_COMPANY,
  EDITORIAL_CONTRAST,
  EDITORIAL_HYPHENATION,
  EDITORIAL_LEADING,
  EDITORIAL_LISTS,
  EDITORIAL_QUOTES,
  EDITORIAL_TRACKING,
} from '~/utils/brandbookEditorial'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'editorial'
const demo = (variant: BrandDemoVariant) => ({ type: 'demo' as const, variant })

export const editorialGuide: BasicsGuidePage = {
  slug,
  title: 'Оформление текста',
  subtitle: 'Общие правила оформления текста — брендбук v1.0.1',
  sidebarLabel: 'Редакция',
  cardDescription: 'Правила набора текста по брендбуку',
  cardImage: '/assets/images/card-editorial.svg',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Оформление текста'),
  tabs: [
    {
      id: 'punctuation',
      label: 'Знаки',
      sections: [
        {
          id: 'dashes',
          title: 'Дефис и тире',
          blocks: [demo('editorial-dashes')],
        },
        {
          id: 'hyphenation',
          title: 'Переносы',
          blocks: [
            {
              type: 'text',
              content: EDITORIAL_HYPHENATION.intro,
            },
            {
              type: 'list',
              items: [...EDITORIAL_HYPHENATION.rules],
            },
            {
              type: 'text',
              content: EDITORIAL_HYPHENATION.toolNote,
            },
            demo('editorial-hyphenation'),
          ],
        },
        {
          id: 'quotes',
          title: 'Кавычки',
          blocks: [
            ...EDITORIAL_QUOTES.paragraphs.map(content => ({ type: 'text' as const, content })),
            demo('editorial-quotes'),
          ],
        },
      ],
      toc: [
        { id: 'dashes', label: 'Тире', sectionId: 'dashes' },
        { id: 'hyphenation', label: 'Переносы', sectionId: 'hyphenation' },
        { id: 'quotes', label: 'Кавычки', sectionId: 'quotes' },
      ],
    },
    {
      id: 'layout',
      label: 'Вёрстка',
      sections: [
        {
          id: 'lists',
          title: 'Списки',
          blocks: [
            ...EDITORIAL_LISTS.paragraphs.map(content => ({ type: 'text' as const, content })),
            demo('editorial-lists'),
          ],
        },
        {
          id: 'contrast',
          title: 'Контрастность текста',
          blocks: [
            ...EDITORIAL_CONTRAST.paragraphs.map(content => ({ type: 'text' as const, content })),
            demo('editorial-contrast'),
          ],
        },
        {
          id: 'tracking',
          title: 'Разрядка (трекинг)',
          blocks: [
            {
              type: 'text',
              content: EDITORIAL_TRACKING.intro,
            },
            demo('editorial-tracking'),
          ],
        },
        {
          id: 'leading',
          title: 'Интерлиньяж (кернинг)',
          blocks: [
            ...EDITORIAL_LEADING.paragraphs.map(content => ({ type: 'text' as const, content })),
            demo('editorial-leading'),
          ],
        },
      ],
      toc: [
        { id: 'lists', label: 'Списки', sectionId: 'lists' },
        { id: 'contrast', label: 'Контраст', sectionId: 'contrast' },
        { id: 'tracking', label: 'Разрядка', sectionId: 'tracking' },
        { id: 'leading', label: 'Интерлиньяж', sectionId: 'leading' },
      ],
    },
    {
      id: 'naming',
      label: 'Название',
      sections: [
        {
          id: 'company',
          title: 'Написание компании',
          blocks: [
            ...EDITORIAL_COMPANY.sections.flatMap(section => [
              { type: 'heading' as const, content: section.title },
              { type: 'text' as const, content: section.text },
            ]),
            {
              type: 'heading',
              content: 'Написание через дефис',
            },
            demo('editorial-company-name'),
          ],
        },
      ],
      toc: [
        { id: 'company', label: 'Название', sectionId: 'company' },
      ],
    },
  ],
}
