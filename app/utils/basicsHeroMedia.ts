import type { GuideMedia } from '~/types/guide'

/** Папка для видео страниц «Основы дизайна» (относительно public/) */
export const BASICS_VIDEOS_DIR = '/assets/videos/basics'

/** Запасной poster, если видео ещё не загружено или не воспроизводится */
export const BASICS_VIDEO_POSTER = '/assets/images/hero-pattern.svg'

/**
 * Имя видеофайла = slug страницы + .mp4
 * @example mobile-design → /assets/videos/basics/mobile-design.mp4
 */
export function getBasicsVideoSrc(slug: string) {
  return `${BASICS_VIDEOS_DIR}/${slug}.mp4`
}

export function getBasicsHeroMedia(slug: string, alt: string): GuideMedia {
  return {
    kind: 'video',
    src: getBasicsVideoSrc(slug),
    poster: BASICS_VIDEO_POSTER,
    autoplay: true,
    muted: true,
    loop: true,
    playsInline: true,
    alt,
  }
}

export function getBasicsCardVideo(slug: string) {
  return getBasicsVideoSrc(slug)
}
