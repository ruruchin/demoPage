export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'ci-ds-theme'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  function applyTheme(value: Theme) {
    theme.value = value

    if (import.meta.client) {
      document.documentElement.dataset.theme = value
      localStorage.setItem(THEME_STORAGE_KEY, value)
    }
  }

  function toggleTheme() {
    applyTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  function initTheme() {
    if (!import.meta.client) {
      return
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(stored ?? (prefersDark ? 'dark' : 'light'))
  }

  return {
    theme,
    applyTheme,
    toggleTheme,
    initTheme,
  }
}
