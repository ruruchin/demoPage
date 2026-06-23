import type { GuideFigureBlock } from '~/types/guide'

const BRANDBOOK_BASE = '/assets/images/brandbook'

export function getBrandbookImageSrc(name: string) {
  return `${BRANDBOOK_BASE}/${name}.png`
}

export function brandbookFigure(
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
    src: getBrandbookImageSrc(name),
    alt: label,
  }
}

export function isBrandbookFigureSrc(src?: string) {
  return Boolean(src?.includes('/assets/images/brandbook/'))
}
