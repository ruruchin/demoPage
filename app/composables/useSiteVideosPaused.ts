const STORAGE_KEY = 'site-videos-paused'

let pauseObserver: MutationObserver | null = null
let syncInitialized = false

function readStoredPaused(): boolean {
  if (!import.meta.client) {
    return false
  }

  return localStorage.getItem(STORAGE_KEY) === 'true'
}

function writeStoredPaused(value: boolean) {
  if (!import.meta.client) {
    return
  }

  localStorage.setItem(STORAGE_KEY, String(value))
}

function setAllVideosPaused(shouldPause: boolean) {
  if (!import.meta.client) {
    return
  }

  document.querySelectorAll('video').forEach((video) => {
    if (shouldPause) {
      video.pause()
      video.autoplay = false
    }
    else {
      video.autoplay = true
      void video.play().catch(() => {})
    }
  })
}

function pauseVideosInNode(node: Node) {
  if (node instanceof HTMLVideoElement) {
    node.pause()
    node.autoplay = false
    return
  }

  if (node instanceof Element) {
    node.querySelectorAll('video').forEach((video) => {
      video.pause()
      video.autoplay = false
    })
  }
}

function startPauseObserver() {
  if (!import.meta.client || pauseObserver) {
    return
  }

  pauseObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(pauseVideosInNode)
    }
  })

  pauseObserver.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

function stopPauseObserver() {
  pauseObserver?.disconnect()
  pauseObserver = null
}

export function useSiteVideosPaused() {
  const paused = useState('site-videos-paused', () => false)

  function applyLocal(shouldPause: boolean) {
    paused.value = shouldPause
    setAllVideosPaused(shouldPause)

    if (shouldPause) {
      startPauseObserver()
    }
    else {
      stopPauseObserver()
    }
  }

  function apply(shouldPause: boolean, options?: { persist?: boolean }) {
    applyLocal(shouldPause)

    if (options?.persist !== false) {
      writeStoredPaused(shouldPause)
    }
  }

  function toggle() {
    apply(!paused.value)
  }

  function syncVideo(video: HTMLVideoElement | null | undefined) {
    if (!video || !import.meta.client) {
      return
    }

    if (paused.value) {
      video.autoplay = false
      video.pause()
      return
    }

    video.autoplay = true

    if (video.paused) {
      void video.play().catch(() => {})
    }
  }

  function initSync() {
    if (!import.meta.client || syncInitialized) {
      return
    }

    syncInitialized = true

    const stored = readStoredPaused()
    if (stored !== paused.value) {
      applyLocal(stored)
    }
    else if (stored) {
      setAllVideosPaused(true)
      startPauseObserver()
    }

    window.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEY || event.newValue === null) {
        return
      }

      const next = event.newValue === 'true'
      if (next === paused.value) {
        return
      }

      applyLocal(next)
    })
  }

  initSync()

  return {
    paused,
    toggle,
    apply,
    syncVideo,
  }
}
