import type { GuideFigureBlock } from '~/types/guide'

/** Inline-изображения в статьях: public/assets/images/basics/{slug}/{name}.png */
export function getBasicsContentImageSrc(slug: string, name: string) {
  return `/assets/images/basics/${slug}/${name}.png`
}

/** Inline-видео в статьях: public/assets/videos/basics/content/{slug}/{name}.mp4 */
export function getBasicsContentVideoSrc(slug: string, name: string) {
  return `/assets/videos/basics/content/${slug}/${name}.mp4`
}

export function getBasicsContentImagePath(slug: string, name: string) {
  return `public/assets/images/basics/${slug}/${name}.png`
}

export function getBasicsContentVideoPath(slug: string, name: string) {
  return `public/assets/videos/basics/content/${slug}/${name}.mp4`
}

export function basicsFigureImage(
  slug: string,
  name: string,
  label: string,
  caption?: string,
): GuideFigureBlock {
  return {
    type: 'figure',
    mediaKind: 'image',
    fileName: name,
    label,
    caption,
    src: getBasicsContentImageSrc(slug, name),
    alt: label,
  }
}

export function basicsFigureVideo(
  slug: string,
  name: string,
  label: string,
  caption?: string,
): GuideFigureBlock {
  return {
    type: 'figure',
    mediaKind: 'video',
    fileName: name,
    label,
    caption,
    src: getBasicsContentVideoSrc(slug, name),
    alt: label,
  }
}
