import type { ApiIntegration, ApiPlatformBadge } from '~/types/apiPage'

export const apiIntegrationIcons = {
  overview: '/assets/icons/integrations/overview.svg',
  cursor: '/assets/icons/integrations/cursor.svg',
  claude: '/assets/icons/integrations/claude.svg',
  mcp: '/assets/icons/integrations/mcp.svg',
  agents: '/assets/icons/integrations/agents.svg',
  npm: '/assets/icons/integrations/npm.svg',
  rest: '/assets/icons/integrations/rest.svg',
} as const

export const apiPlatformBadges: ApiPlatformBadge[] = [
  { id: 'cursor', label: 'Cursor', icon: apiIntegrationIcons.cursor },
  { id: 'claude', label: 'Claude', icon: apiIntegrationIcons.claude },
  { id: 'mcp', label: 'MCP', icon: apiIntegrationIcons.mcp },
  { id: 'rest', label: 'REST', icon: apiIntegrationIcons.rest },
  { id: 'npm', label: 'npm', icon: apiIntegrationIcons.npm },
]

export const apiPageMeta = {
  title: 'API и интеграции',
  subtitle: 'Подключите дизайн-систему «Центр-инвест» к Cursor, Claude и другим AI-агентам — компоненты, токены и правила стилей в контексте разработки',
}

export const apiIntegrations: ApiIntegration[] = [
  {
    id: 'overview',
    label: 'Обзор',
    icon: apiIntegrationIcons.overview,
    sections: [
      {
        id: 'what-is',
        title: 'Зачем API дизайн-системы',
        blocks: [
          {
            type: 'text',
            content: 'API и машиночитаемые артефакты позволяют агентам и IDE генерировать интерфейсы по вашим правилам: те же токены, компоненты и паттерны, что в Figma и на сайте документации. Меньше расхождений между макетом и кодом.',
          },
          {
            type: 'list',
            items: [
              'Токены — цвета, типографика, отступы, радиусы в JSON и CSS variables.',
              'Компоненты — props, слоты, состояния и примеры использования.',
              'Правила — editorial guidelines, a11y, responsive breakpoints.',
              'Контекст для агентов — skills, MCP-серверы, project rules.',
            ],
          },
        ],
      },
      {
        id: 'architecture',
        title: 'Архитектура доступа',
        blocks: [
          {
            type: 'text',
            content: 'Данные публикуются в нескольких форматах: REST JSON для CI и скриптов, MCP для агентов в IDE, npm-пакет для Vue/Nuxt-приложений. Все источники синхронизированы из одного репозитория токенов.',
          },
          {
            type: 'list',
            items: [
              'GET /api/v1/tokens — design tokens (light / dark).',
              'GET /api/v1/components — каталог компонентов и metadata.',
              'GET /api/v1/rules — правила типографики, сетки, a11y.',
              'MCP tools — search_design_system, get_component, get_tokens.',
            ],
          },
          {
            type: 'code',
            title: 'Базовый запрос токенов',
            content: `fetch('https://design.center-invest.ru/api/v1/tokens?theme=dark')
  .then(res => res.json())
  .then(tokens => {
    document.documentElement.style.setProperty(
      '--color-green-primary',
      tokens.color.green.primary
    )
  })`,
          },
        ],
      },
    ],
    toc: [
      { id: 'what-is', label: 'Зачем API', sectionId: 'what-is' },
      { id: 'architecture', label: 'Архитектура', sectionId: 'architecture' },
    ],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    icon: apiIntegrationIcons.cursor,
    sections: [
      {
        id: 'cursor-intro',
        title: 'Cursor IDE',
        blocks: [
          {
            type: 'text',
            content: 'Cursor получает контекст дизайн-системы через MCP-сервер, project rules и skills. Агент сможет подбирать компоненты AsyncAttachFiles, FileUploader и применять токены вместо произвольных hex-значений.',
          },
          {
            type: 'list',
            items: [
              'Подключите MCP-сервер в Cursor Settings → MCP.',
              'Добавьте rule-файл с ссылкой на токены и naming conventions.',
              'Используйте @docs при промпте для явного контекста компонента.',
              'Skills из репозитория DS ускоряют типовые задачи (форма, таблица, modal).',
            ],
          },
        ],
      },
      {
        id: 'cursor-mcp',
        title: 'MCP в Cursor',
        blocks: [
          {
            type: 'code',
            title: '.cursor/mcp.json',
            content: `{
  "mcpServers": {
    "center-invest-ds": {
      "url": "https://design.center-invest.ru/mcp",
      "headers": {
        "Authorization": "Bearer \${DS_API_TOKEN}"
      }
    }
  }
}`,
          },
          {
            type: 'code',
            title: '.cursor/rules/design-system.mdc',
            content: `---
description: Center-Invest Design System
globs: **/*.{vue,ts,css}
---

- Use CSS variables from tokens.css; never hardcode colors.
- Import UI from @center-invest/ds; check /modules docs before creating new components.
- Spacing grid: 4px base; sidebar width --sidebar-width.
- Prefer NuxtLink over <a> for internal routes.`,
          },
        ],
      },
    ],
    toc: [
      { id: 'cursor-intro', label: 'Cursor IDE', sectionId: 'cursor-intro' },
      { id: 'cursor-mcp', label: 'MCP', sectionId: 'cursor-mcp' },
    ],
  },
  {
    id: 'claude',
    label: 'Claude',
    icon: apiIntegrationIcons.claude,
    sections: [
      {
        id: 'claude-intro',
        title: 'Claude и Claude Code',
        blocks: [
          {
            type: 'text',
            content: 'Anthropic Claude подключается через MCP (Desktop / Claude Code) или через CLAUDE.md в корне проекта. Агент читает правила DS и запрашивает компоненты через те же endpoints, что Cursor.',
          },
          {
            type: 'list',
            items: [
              'CLAUDE.md — краткий overview токенов, структуры app/components, conventions.',
              'MCP — те же tools: get_design_context, list_components.',
              'Для CI используйте Anthropic API + system prompt с JSON tokens snapshot.',
              'Не дублируйте компоненты — сначала search_design_system.',
            ],
          },
          {
            type: 'code',
            title: 'CLAUDE.md (фрагмент)',
            content: `# Center-Invest DS

Stack: Nuxt 4, Vue 3, CSS tokens in app/assets/styles/tokens.css.

Before UI work:
1. Read tokens.css for colors and spacing.
2. Check app/pages/modules.vue for existing components.
3. Match SidebarNav, PageFooter, DesignCard patterns.

Primary green: var(--color-green-primary) (#7fd087).
Never use inline #7fd087 — always the token.`,
          },
        ],
      },
    ],
    toc: [
      { id: 'claude-intro', label: 'Claude', sectionId: 'claude-intro' },
    ],
  },
  {
    id: 'mcp',
    label: 'MCP Server',
    icon: apiIntegrationIcons.mcp,
    sections: [
      {
        id: 'mcp-tools',
        title: 'MCP-инструменты',
        blocks: [
          {
            type: 'text',
            content: 'MCP-сервер дизайн-системы — основной способ отдать агенту актуальные компоненты и токены. Сервер read-only: агент не меняет Figma, только читает опубликованный каталог.',
          },
          {
            type: 'list',
            items: [
              'search_design_system — поиск по компонентам, токенам, правилам.',
              'get_component — props, slots, пример кода, ссылка на /modules.',
              'get_tokens — JSON/CSS variables для theme light | dark.',
              'get_rules — typography, grid, a11y checklist.',
            ],
          },
          {
            type: 'code',
            title: 'Пример вызова get_component',
            content: `// MCP tool response (сокращённо)
{
  "name": "AsyncAttachFiles",
  "props": ["name", "size", "disabled", "multiple"],
  "docsUrl": "/modules?component=AsyncAttachFiles",
  "example": "<AsyncAttachFiles name=\\"docs\\" size=\\"medium\\" />"
}`,
          },
        ],
      },
      {
        id: 'mcp-auth',
        title: 'Аутентификация',
        blocks: [
          {
            type: 'text',
            content: 'Публичный read-доступ к документации и tokens.open.json. Для MCP и повышенных лимитов REST — personal access token в кабинете разработчика (скоро).',
          },
          {
            type: 'list',
            items: [
              'DS_API_TOKEN — переменная окружения для локальной разработки.',
              'Rate limit: 120 req/min для authenticated, 30 для anonymous.',
              'Кэшируйте tokens.json в CI — TTL 24 часа.',
            ],
          },
        ],
      },
    ],
    toc: [
      { id: 'mcp-tools', label: 'Инструменты', sectionId: 'mcp-tools' },
      { id: 'mcp-auth', label: 'Auth', sectionId: 'mcp-auth' },
    ],
  },
  {
    id: 'agents',
    label: 'Другие агенты',
    icon: apiIntegrationIcons.agents,
    sections: [
      {
        id: 'agents-list',
        title: 'Copilot, Windsurf, Codex',
        blocks: [
          {
            type: 'text',
            content: 'Любой агент, поддерживающий MCP, OpenAI-compatible tools или plain context files, может использовать DS. Паттерн один: положить tokens snapshot + components index в контекст и сослаться на правила в промпте.',
          },
          {
            type: 'list',
            items: [
              'GitHub Copilot — .github/copilot-instructions.md со ссылкой на DS.',
              'Windsurf — mcp_config.json аналогично Cursor.',
              'OpenAI Codex / custom agents — tools schema из openapi.yaml.',
              'JetBrains AI — file-based rules в .junie или project prompts.',
            ],
          },
          {
            type: 'code',
            title: 'copilot-instructions.md',
            content: `This project uses Center-Invest Design System.

- Tokens: app/assets/styles/tokens.css
- Components docs: /modules route
- Use existing Vue SFCs in app/components/
- API reference: /api on design system site`,
          },
        ],
      },
    ],
    toc: [
      { id: 'agents-list', label: 'Агенты', sectionId: 'agents-list' },
    ],
  },
  {
    id: 'npm',
    label: 'npm и REST',
    icon: apiIntegrationIcons.npm,
    sections: [
      {
        id: 'npm-package',
        title: 'npm-пакет',
        blocks: [
          {
            type: 'text',
            content: 'Для продуктовых приложений на Vue/Nuxt — пакет с компонентами и composables. Агентам достаточно знать import path и peer dependencies.',
          },
          {
            type: 'code',
            title: 'Установка',
            content: `npm install @center-invest/ds

// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@center-invest/ds/tokens.css'],
})`,
          },
        ],
      },
      {
        id: 'rest-endpoints',
        title: 'REST endpoints',
        blocks: [
          {
            type: 'list',
            items: [
              'GET /api/v1/tokens?theme=light|dark',
              'GET /api/v1/components — список с pagination.',
              'GET /api/v1/components/:id — детали и props schema.',
              'GET /api/v1/rules/:topic — typography | layout | a11y.',
            ],
          },
          {
            type: 'code',
            title: 'OpenAPI фрагмент',
            content: `paths:
  /api/v1/components/{id}:
    get:
      summary: Get component metadata
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            example: AsyncAttachFiles`,
          },
        ],
      },
    ],
    toc: [
      { id: 'npm-package', label: 'npm', sectionId: 'npm-package' },
      { id: 'rest-endpoints', label: 'REST', sectionId: 'rest-endpoints' },
    ],
  },
]

export function getApiIntegration(id: string) {
  return apiIntegrations.find(item => item.id === id)
}
