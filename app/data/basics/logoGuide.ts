import type { BasicsGuidePage, BrandDemoVariant } from '~/types/guide'
import { BRAND_LOGO_ALT, BRAND_LOGO_FULL } from '~/utils/brandAssets'
import { getBasicsCardVideo } from '~/utils/basicsHeroMedia'

const slug = 'logo'
const demo = (variant: BrandDemoVariant) => ({ type: 'demo' as const, variant })

export const logoGuide: BasicsGuidePage = {
  slug,
  title: 'Логотип',
  subtitle: 'Версии, охранное поле и правила использования — брендбук v1.0.1',
  sidebarLabel: 'Логотип',
  cardDescription: 'Основная, дополнительная и монохромная версии логотипа',
  cardImage: BRAND_LOGO_FULL,
  cardVideo: getBasicsCardVideo(slug),
  media: {
    kind: 'image',
    src: BRAND_LOGO_FULL,
    alt: BRAND_LOGO_ALT,
    fit: 'contain',
  },
  tabs: [
    {
      id: 'overview',
      label: 'Обзор',
      sections: [
        {
          id: 'brand-system',
          title: 'Бренд-система',
          blocks: [
            {
              type: 'text',
              content:
                'В основе визуального брендинга лежат несколько базовых составляющих: логотип, цвета, шрифт, фирменные элементы. Они служат отправной точкой при решении любых оформительских задач.',
            },
          ],
        },
        {
          id: 'structure',
          title: 'Логотип',
          blocks: [
            demo('logo-primary'),
          ],
        },
      ],
      toc: [
        { id: 'brand-system', label: 'Бренд-система', sectionId: 'brand-system' },
        { id: 'structure', label: 'Структура', sectionId: 'structure' },
      ],
    },
    {
      id: 'versions',
      label: 'Версии',
      sections: [
        {
          id: 'versions-all',
          title: 'Версии логотипа',
          blocks: [
            demo('logo-versions'),
          ],
        },
      ],
      toc: [
        { id: 'versions-all', label: 'Версии', sectionId: 'versions-all' },
      ],
    },
    {
      id: 'rules',
      label: 'Правила',
      sections: [
        {
          id: 'clear-space',
          title: 'Охранное поле',
          blocks: [
            demo('logo-clear-space'),
          ],
        },
        {
          id: 'donts',
          title: 'Недопустимые варианты использования логотипа',
          blocks: [
            demo('logo-donts'),
          ],
        },
      ],
      toc: [
        { id: 'clear-space', label: 'Охранное поле', sectionId: 'clear-space' },
        { id: 'donts', label: 'Запреты', sectionId: 'donts' },
      ],
    },
  ],
}
