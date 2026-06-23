import type { GuideTocItem } from '~/types/guide'

interface UseGuideTocScrollSpyOptions {
  toc: ComputedRef<GuideTocItem[] | undefined>
  sectionIdPrefix: string
  activeTocId: Ref<string>
  contentKey?: Ref<string>
  scrollOffset?: number
}

export function useGuideTocScrollSpy({
  toc,
  sectionIdPrefix,
  activeTocId,
  contentKey,
  scrollOffset = 120,
}: UseGuideTocScrollSpyOptions) {
  let scrollLock = false
  let scrollLockTimer: ReturnType<typeof setTimeout> | undefined
  let ticking = false

  function updateActiveToc() {
    if (scrollLock) return

    const items = toc.value
    if (!items?.length) return

    let current = items[0].id

    for (const item of items) {
      const element = document.getElementById(`${sectionIdPrefix}${item.sectionId}`)
      if (!element) continue

      if (element.getBoundingClientRect().top <= scrollOffset) {
        current = item.id
      }
    }

    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
    if (nearBottom) {
      current = items[items.length - 1].id
    }

    if (activeTocId.value !== current) {
      activeTocId.value = current
    }
  }

  function onScroll() {
    if (ticking) return

    ticking = true
    requestAnimationFrame(() => {
      updateActiveToc()
      ticking = false
    })
  }

  function lockScrollSpy(duration = 900) {
    scrollLock = true
    if (scrollLockTimer) clearTimeout(scrollLockTimer)
    scrollLockTimer = setTimeout(() => {
      scrollLock = false
      updateActiveToc()
    }, duration)
  }

  function scrollToSection(sectionId: string, tocId: string) {
    activeTocId.value = tocId
    lockScrollSpy()
    document.getElementById(`${sectionIdPrefix}${sectionId}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function setup() {
    nextTick(() => {
      updateActiveToc()
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    setup()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (scrollLockTimer) clearTimeout(scrollLockTimer)
  })

  watch(toc, setup)
  if (contentKey) {
    watch(contentKey, () => {
      setup()
      setTimeout(setup, 300)
    })
  }

  return {
    scrollToSection,
    updateActiveToc,
  }
}
