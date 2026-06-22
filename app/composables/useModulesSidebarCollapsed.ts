const STORAGE_KEY = 'ci-ds-modules-sidebar-collapsed'

export function useModulesSidebarCollapsed() {
  const collapsed = useState<boolean>('modules-sidebar-collapsed', () => false)
  const initialized = useState('modules-sidebar-collapsed-init', () => false)

  function apply(value: boolean) {
    collapsed.value = value

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
    }
  }

  function toggle() {
    apply(!collapsed.value)
  }

  function init() {
    if (!import.meta.client || initialized.value) {
      return
    }

    initialized.value = true
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === '1') {
      apply(true)
    }
  }

  onMounted(init)

  return {
    collapsed,
    toggle,
  }
}
