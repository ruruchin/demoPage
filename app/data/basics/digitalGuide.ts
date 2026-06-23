import type { BasicsGuidePage } from '~/types/guide'
import { brandbookFigure } from '~/utils/brandbookAssets'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'digital'
const bb = brandbookFigure

export const digitalGuide: BasicsGuidePage = {
  slug,
  title: 'Digital-коммуникация',
  subtitle: 'Мессенджеры, соцсети, баннеры и презентации — брендбук v1.0.1',
  sidebarLabel: 'Digital',
  cardDescription: 'Правила digital-носителей и презентаций',
  cardImage: '/assets/images/card-digital.svg',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Digital-коммуникация'),
  tabs: [
    {
      id: 'channels',
      label: 'Каналы',
      sections: [
        {
          id: 'messenger',
          title: 'Баннер для мессенджеров',
          blocks: [
            {
              type: 'text',
              content: 'Квадратные публикации для мессенджеров с фирменными элементами, шрифтами и иллюстрациями.',
            },
            bb('digital-messenger', 'Баннер для мессенджеров'),
          ],
        },
        {
          id: 'vk',
          title: 'VK',
          blocks: [
            {
              type: 'text',
              content: 'Оформление сообщества: 3D-элементы и знак в аватаре.',
            },
            bb('digital-vk', 'VK'),
          ],
        },
        {
          id: 'instagram',
          title: 'Instagram',
          blocks: [
            {
              type: 'text',
              content: 'Аватар со знаком и 3D-иллюстрации для актуальных историй.',
            },
            bb('digital-instagram', 'Instagram'),
          ],
        },
        {
          id: 'ok',
          title: 'ОК',
          blocks: [
            {
              type: 'text',
              content: 'Оформление профиля в стиле бренда с акцентом на объёмные элементы.',
            },
            bb('digital-ok', 'ОК'),
          ],
        },
        {
          id: 'rsya',
          title: 'Баннеры РСЯ',
          blocks: [
            {
              type: 'text',
              content: 'Интернет-реклама с 3D, 2D и фотографическими материалами.',
            },
            bb('digital-rsya', 'Баннеры РСЯ'),
          ],
        },
        {
          id: 'wallpaper',
          title: 'Заставка на компьютер',
          blocks: [
            {
              type: 'text',
              content: 'Обои рабочего стола на базе фирменного цвета, логотипа и иллюстраций.',
            },
            bb('digital-wallpaper', 'Заставка на компьютер'),
          ],
        },
        {
          id: 'app-icon',
          title: 'Иконка приложения',
          blocks: [
            {
              type: 'text',
              content: 'В иконке приложения используется знаковая часть логотипа.',
            },
            bb('digital-app-icon', 'Иконка приложения'),
          ],
        },
      ],
      toc: [
        { id: 'messenger', label: 'Мессенджеры', sectionId: 'messenger' },
        { id: 'vk', label: 'VK', sectionId: 'vk' },
        { id: 'instagram', label: 'Instagram', sectionId: 'instagram' },
        { id: 'ok', label: 'ОК', sectionId: 'ok' },
        { id: 'rsya', label: 'РСЯ', sectionId: 'rsya' },
        { id: 'wallpaper', label: 'Заставка', sectionId: 'wallpaper' },
        { id: 'app-icon', label: 'Иконка', sectionId: 'app-icon' },
      ],
    },
    {
      id: 'presentations',
      label: 'Презентации',
      sections: [
        {
          id: 'overview',
          title: 'Шаблон презентации',
          blocks: [
            {
              type: 'text',
              content: 'Готовая система слайдов для деловых коммуникаций в фирменном стиле.',
            },
            bb('digital-presentation-1', 'Шаблон презентации'),
          ],
        },
        {
          id: 'colors',
          title: 'Цвета и изображения',
          blocks: [
            {
              type: 'text',
              content: 'Баланс светлой основы, акцентных цветов и работа с изображениями на слайдах.',
            },
            bb('digital-presentation-2', 'Шаблон презентации — цвета'),
          ],
        },
        {
          id: 'typography',
          title: 'Шрифты и текст',
          blocks: [
            {
              type: 'text',
              content: 'Montserrat как основной шрифт, Arial как запасной, оформление текстовых блоков и иллюстраций.',
            },
            bb('digital-presentation-3', 'Шаблон презентации — шрифты'),
          ],
        },
        {
          id: 'tables',
          title: 'Таблицы',
          blocks: [
            {
              type: 'text',
              content: 'Таблицы и информативные слайды с пиктограммами и подложками под текст.',
            },
            bb('digital-presentation-4', 'Шаблон презентации — таблицы'),
          ],
        },
      ],
      toc: [
        { id: 'overview', label: 'Обзор', sectionId: 'overview' },
        { id: 'colors', label: 'Цвета', sectionId: 'colors' },
        { id: 'typography', label: 'Шрифты', sectionId: 'typography' },
        { id: 'tables', label: 'Таблицы', sectionId: 'tables' },
      ],
    },
  ],
}
