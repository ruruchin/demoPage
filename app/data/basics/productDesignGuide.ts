import type { BasicsGuidePage } from '~/types/guide'
import { basicsFigureImage, basicsFigureVideo } from '~/utils/basicsContentMedia'
import { getBasicsCardVideo, getBasicsHeroMedia } from '~/utils/basicsHeroMedia'

const slug = 'product-design'
const img = (name: string, label: string, caption?: string) => basicsFigureImage(slug, name, label, caption)
const vid = (name: string, label: string, caption?: string) => basicsFigureVideo(slug, name, label, caption)

export const productDesignGuide: BasicsGuidePage = {
  slug,
  title: 'Продуктовый дизайн',
  subtitle: 'Подходы к проектированию цифровых продуктов и пользовательского опыта в экосистеме «Центр-инвест»',
  sidebarLabel: 'Продуктовый дизайн',
  cardDescription: 'Подходы к проектированию цифровых продуктов и пользовательского опыта',
  cardImage: '/assets/images/Продуктовый дизайн.png',
  cardVideo: getBasicsCardVideo(slug),
  media: getBasicsHeroMedia(slug, 'Продуктовый дизайн'),
  tabs: [
    {
      id: 'overview',
      label: 'Обзор',
      sections: [
        {
          id: 'process',
          title: 'Процесс проектирования',
          blocks: [
            {
              type: 'text',
              content: 'Продуктовый дизайн в «Центр-инвест» — это цикл «исследование → гипотеза → прототип → проверка → релиз → метрики». Дизайн-система ускоряет этапы прототипирования и handoff, но не заменяет понимание пользовательской задачи.',
            },
            {
              type: 'list',
              items: [
                'Начинайте с Jobs-to-be-Done и ключевых метрик — дизайн должен решать измеримую задачу.',
                'Прототипируйте сценарии end-to-end, а не отдельные экраны в вакууме.',
                'Валидируйте решения с продуктом, разработкой и поддержкой до передачи в систему.',
                'Фиксируйте решения в ADR или design spec — чтобы через полгода было понятно «почему так».',
              ],
            },
            img('design-process', 'Диаграмма процесса', 'Discover → Define → Design → Deliver → Measure.'),
            vid('workshop-example', 'Продуктовый воркшоп', 'Как проходит сессия по CJM и приоритизации гипотез.'),
          ],
        },
        {
          id: 'ux',
          title: 'Пользовательский опыт',
          blocks: [
            {
              type: 'text',
              content: 'Пользователь не разделяет web, mobile и отделение банка — для него это один бренд. UX должен быть предсказуемым на всех точках контакта.',
            },
            {
              type: 'list',
              items: [
                'Сохраняйте преемственность между каналами: одни паттерны, одна терминология.',
                'Снижайте когнитивную нагрузку: прогрессивное раскрытие сложных функций.',
                'Закладывайте ошибки, пустые данные и восстановление с первого дня проектирования.',
                'Доверие в финтехе строится на прозрачности: показывайте комиссии, сроки и последствия действий заранее.',
              ],
            },
            img('cjm-overview', 'Customer Journey Map', 'Упрощённая CJM для сценария «Открытие вклада».'),
          ],
        },
        {
          id: 'metrics',
          title: 'Метрики и успех',
          blocks: [
            {
              type: 'text',
              content: 'Каждый значимый редизайн привязывается к метрикам: conversion, time-on-task, NPS, обращения в поддержку. Это помогает отличать «красиво» от «работает».',
            },
            {
              type: 'list',
              items: [
                'Определяйте primary metric до старта проектирования.',
                'Ставьте guardrail metrics — что нельзя ухудшить (например, ошибки в платежах).',
                'Сравнивайте A/B или до/после на достаточной выборке.',
                'Документируйте результат в wiki команды — даже если гипотеза не подтвердилась.',
              ],
            },
            vid('metrics-dashboard', 'Дашборд продуктовых метрик', 'Пример отслеживания conversion funnel после редизайна.'),
          ],
        },
      ],
      toc: [
        { id: 'process', label: 'Процесс', sectionId: 'process' },
        { id: 'ux', label: 'UX', sectionId: 'ux' },
        { id: 'metrics', label: 'Метрики', sectionId: 'metrics' },
      ],
    },
    {
      id: 'research',
      label: 'Исследования',
      sections: [
        {
          id: 'research-methods',
          title: 'Методы исследований',
          blocks: [
            {
              type: 'text',
              content: 'Исследования не обязаны быть длинными и дорогими. Даже 5 интервью или юзабилити-тест на прототипе часто экономят недели разработки не того решения.',
            },
            {
              type: 'list',
              items: [
                'Комбинируйте качественные интервью и количественную аналитику.',
                'Фиксируйте инсайты в формате, пригодном для backlog (job story, problem statement).',
                'Повторяйте проверки после релиза — UX не заканчивается на макете.',
                'Рекрутинг — из реальной аудитории продукта, с сегментацией по опыту и устройству.',
              ],
            },
            img('research-plan', 'План исследования', 'Цели, метод, выборка, сроки, артефакты на выходе.'),
            vid('interview-snippet', 'Фрагмент пользовательского интервью', 'Пример модерации и фиксации инсайтов (с блюром данных).'),
          ],
        },
        {
          id: 'synthesis',
          title: 'Синтез и приоритизация',
          blocks: [
            {
              type: 'text',
              content: 'После поля и интервью инсайты группируются в темы, связываются с метриками и попадают в roadmap через RICE, ICE или согласованную продуктом матрицу.',
            },
            {
              type: 'list',
              items: [
                'Affinity map — для группировки наблюдений.',
                'Opportunity solution tree — связь проблем и решений.',
                'Приоритизация — совместно с PM, не в изоляции дизайн-команды.',
              ],
            },
            img('affinity-map', 'Affinity map', 'Пример кластеризации инсайтов по сценарию «Переводы».'),
          ],
        },
      ],
      toc: [
        { id: 'research-methods', label: 'Методы', sectionId: 'research-methods' },
        { id: 'synthesis', label: 'Синтез', sectionId: 'synthesis' },
      ],
    },
    {
      id: 'handoff',
      label: 'Передача в разработку',
      sections: [
        {
          id: 'handoff-rules',
          title: 'Handoff и Design QA',
          blocks: [
            {
              type: 'text',
              content: 'Handoff — не «скинуть Figma-ссылку». Это спецификация: компоненты, состояния, edge cases, анимации, тексты ошибок и критерии приёмки.',
            },
            {
              type: 'list',
              items: [
                'Используйте компоненты и токены дизайн-системы — не рисуйте одноразовые элементы.',
                'Описывайте edge cases, анимации и responsive-поведение в спецификации.',
                'Сверяйте реализацию через design QA чек-лист до выхода в prod.',
                'Dev mode / Code Connect — для связи макета с кодом компонентов.',
              ],
            },
            img('handoff-checklist', 'Чек-лист handoff', 'States, tokens, a11y, copy, analytics events.'),
            vid('design-qa-flow', 'Design QA на staging', 'Сравнение макета и реализации в браузере и на устройстве.'),
          ],
        },
        {
          id: 'collaboration',
          title: 'Работа с командой',
          blocks: [
            {
              type: 'text',
              content: 'Дизайнер, аналитик, разработчик и тестировщик участвуют в ревью до merge. Это снижает количество «сюрпризов» на демо и в prod.',
            },
            {
              type: 'list',
              items: [
                'Design review — на ключевых вехах, не только в конце.',
                'Критерии готовности: все states, i18n, dark theme, a11y baseline.',
                'Retro по крупным фичам: что сработало в процессе, что улучшить.',
              ],
            },
            img('team-rituals', 'Ритуалы команды', 'Design critique, trio sync, pre-release QA.'),
          ],
        },
      ],
      toc: [
        { id: 'handoff-rules', label: 'Handoff', sectionId: 'handoff-rules' },
        { id: 'collaboration', label: 'Команда', sectionId: 'collaboration' },
      ],
    },
  ],
}
