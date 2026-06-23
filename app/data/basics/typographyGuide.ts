import type { BasicsGuidePage } from '~/types/guide'
import { basicsFigureImage, basicsFigureVideo } from '~/utils/basicsContentMedia'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'typography'
const img = (name: string, label: string, caption?: string) => basicsFigureImage(slug, name, label, caption)
const vid = (name: string, label: string, caption?: string) => basicsFigureVideo(slug, name, label, caption)

export const typographyGuide: BasicsGuidePage = {
  slug,
  title: 'Типографика',
  subtitle: 'Гайд по использованию типографии на продуктах, использующих гайдлайны системы',
  sidebarLabel: 'Типографика',
  cardDescription: 'Правила работы со шрифтами и текстовыми стилями в дизайне',
  cardImage: '/assets/images/Типографика.png',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Типографика'),
  tabs: [
    {
      id: 'overview',
      label: 'Обзор',
      sections: [
        {
          id: 'scale',
          title: 'Типографика в системе',
          blocks: [
            {
              type: 'text',
              content: 'Типографика «Центр-инвест» строится на шкале токенов: от hero-заголовков до caption и меток. Произвольные размеры и начертания допустимы только в маркетинговых материалах вне UI.',
            },
            {
              type: 'list',
              items: [
                'Шкала включает стили для заголовков, подзаголовков, body, caption и меток — используйте готовые токены.',
                'На одном экране — не более двух семейств шрифтов; акценты через weight, а не через новое семейство.',
                'Цвет текста берите из токенов: primary, secondary, muted — для согласованности в light и dark theme.',
                'Заголовки сжимаются через clamp() на узких экранах, body сохраняет минимум 14 px.',
              ],
            },
            img('type-scale-overview', 'Полная типовая шкала', 'Все стили от Display до Caption с размерами и line-height.'),
            vid('type-in-context', 'Типографика на экране продукта', 'Как шкала применяется на реальном экране мобильного приложения.'),
          ],
        },
        {
          id: 'resources',
          title: 'Доступность и ресурсы',
          blocks: [
            {
              type: 'text',
              content: 'Читаемость — ключевой параметр финансовых интерфейсов. Пользователь должен без усилий различать суммы, даты, статусы и поясняющий текст даже при ярком солнечном свете или включённом dark mode.',
            },
            {
              type: 'list',
              items: [
                'Межстрочный интервал body — 1.45–1.55; заголовков — 1.05–1.2 в зависимости от размера.',
                'Не уменьшайте caption ниже 12 px; для критичного текста — regular или medium.',
                'Проверяйте читаемость на реальных устройствах и при увеличении системного масштаба шрифта.',
                'Длинные числа и IBAN форматируйте с неразрывными пробелами и tabular figures.',
              ],
            },
            img('readability-test', 'Тест читаемости на устройствах', 'Сравнение body 14 px и 16 px на OLED и LCD экранах.'),
          ],
        },
      ],
      toc: [
        { id: 'scale', label: 'Типографика', sectionId: 'scale' },
        { id: 'resources', label: 'Доступность', sectionId: 'resources' },
      ],
    },
    {
      id: 'fonts',
      label: 'Шрифты',
      sections: [
        {
          id: 'family',
          title: 'Шрифтовые семейства',
          blocks: [
            {
              type: 'text',
              content: 'Inter — основное UI-семейство для web, iOS (fallback) и документации. Оно нейтрально и хорошо работает с цифрами и кириллицей при правильных настройках feature settings.',
            },
            {
              type: 'list',
              items: [
                'Inter — для UI, документации и маркетинговых блоков внутри продукта.',
                'Для таблиц и финансовых данных включайте tabular-figures и lining figures.',
                'Variable font — предпочтительный формат; статические начертания — fallback.',
                'Сторонние шрифты подключайте только после согласования с командой дизайн-системы.',
              ],
            },
            img('inter-weights', 'Начертания Inter', 'Regular, Medium, Semibold — примеры на кириллице и латинице.'),
          ],
        },
        {
          id: 'pairing',
          title: 'Сочетания и акценты',
          blocks: [
            {
              type: 'text',
              content: 'Акцент в типографике создаётся размером, weight и цветом — не декоративными шрифтами. Это особенно важно для юридических текстов и условий обслуживания.',
            },
            {
              type: 'list',
              items: [
                'Заголовок + body: contrast по size и weight, не по семейству.',
                'Ссылки: primary color + medium weight; underline — только в длинных текстах.',
                'Цитаты и выноски: surface-muted фон + body secondary, без курсива по умолчанию.',
              ],
            },
            vid('font-pairing-demo', 'Акценты в типографике', 'Анимированное сравнение корректных и некорректных сочетаний.'),
          ],
        },
      ],
      toc: [
        { id: 'family', label: 'Шрифты', sectionId: 'family' },
        { id: 'pairing', label: 'Сочетания', sectionId: 'pairing' },
      ],
    },
    {
      id: 'tokens',
      label: 'Типовая шкала и токены',
      sections: [
        {
          id: 'tokens-list',
          title: 'Токены типографики',
          blocks: [
            {
              type: 'text',
              content: 'Токены типографики связаны с CSS-переменными проекта. В Figma используйте текстовые стили с теми же именами — так handoff остаётся однозначным.',
            },
            {
              type: 'list',
              items: [
                'hero-title, section-title — промо-блоки и названия разделов документации.',
                'hero-subtitle, card-description — основной и вторичный текст.',
                'Caption и label: 12–14 px, weight 400–500, цвет muted.',
                'Code и prop-названия: monospace stack, prop-code token для подсветки.',
              ],
            },
            img('token-table', 'Таблица токенов', 'Имя токена, size, weight, line-height, letter-spacing.'),
          ],
        },
      ],
      toc: [
        { id: 'tokens-list', label: 'Токены', sectionId: 'tokens-list' },
      ],
    },
    {
      id: 'usage',
      label: 'Применение типографики',
      sections: [
        {
          id: 'usage-rules',
          title: 'Правила применения',
          blocks: [
            {
              type: 'text',
              content: 'Иерархия заголовков помогает сканировать страницу. Пользователь за 3–5 секунд должен понять, где он находится и что можно сделать дальше.',
            },
            {
              type: 'list',
              items: [
                'Один h1 на экран; уровни h2, h3 — без пропусков иерархии.',
                'Кнопки и ссылки не стилизуйте только цветом — добавляйте weight или иконку.',
                'Длинные тексты разбивайте на абзацы; строка body — не более 70–80 символов.',
                'Числа в таблицах выравнивайте по правому краю с tabular figures.',
              ],
            },
            img('heading-hierarchy', 'Иерархия заголовков', 'Пример страницы документации с h1–h3.'),
          ],
        },
      ],
      toc: [
        { id: 'usage-rules', label: 'Применение', sectionId: 'usage-rules' },
      ],
    },
    {
      id: 'editorial',
      label: 'Редакционные решения',
      sections: [
        {
          id: 'editorial-rules',
          title: 'Редакция и тон',
          blocks: [
            {
              type: 'text',
              content: 'Тон коммуникации — деловой и спокойный. Мы объясняем сложные финансовые операции простым языком, не упрощая юридическую точность там, где она обязательна.',
            },
            {
              type: 'list',
              items: [
                'Избегайте канцеляризмов в UI; в документах — допустима формальная лексика.',
                'Числа, даты и валюты — формат ru-RU; суммы с пробелом тысяч и символом ₽.',
                'Сокращения расшифровывайте при первом упоминании в потоке текста.',
                'Error-сообщения: что случилось + что делать, без обвинения пользователя.',
              ],
            },
            vid('editorial-examples', 'Примеры редакционных формулировок', 'Do / Don\'t для ошибок, пустых состояний и успеха.'),
          ],
        },
      ],
      toc: [
        { id: 'editorial-rules', label: 'Редакция', sectionId: 'editorial-rules' },
      ],
    },
  ],
}
