export type BrandColorGroup = 'primary' | 'pastel'

export interface BrandColorToken {
  id: string
  name: string
  role: string
  hex: string
  rgb: string
  cmyk: string
  pantone: string | null
  group: BrandColorGroup
}

export const brandColorTokens: BrandColorToken[] = [
  {
    id: 'green',
    name: 'Зелёный',
    role: 'Основной',
    hex: '#50B848',
    rgb: '80, 184, 72',
    cmyk: '68 0 87 0',
    pantone: '362 C',
    group: 'primary',
  },
  {
    id: 'black',
    name: 'Чёрный',
    role: 'Основной',
    hex: '#0E100F',
    rgb: '14, 16, 15',
    cmyk: '35 25 25 100',
    pantone: 'Black 6 C',
    group: 'primary',
  },
  {
    id: 'white',
    name: 'Белый',
    role: 'Основной',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    cmyk: '0 0 0 0',
    pantone: null,
    group: 'primary',
  },
  {
    id: 'aqua',
    name: 'Светло-аквамариновый',
    role: 'Основной',
    hex: '#E5F6F4',
    rgb: '229, 246, 244',
    cmyk: '13 0 6 0',
    pantone: 'P 133-9 U',
    group: 'primary',
  },
  {
    id: 'yellow',
    name: 'Жёлтый',
    role: 'Акцент',
    hex: '#F9E300',
    rgb: '249, 227, 0',
    cmyk: '6 4 95 0',
    pantone: 'P 4-8 U',
    group: 'primary',
  },
  {
    id: 'mint',
    name: 'Мятный',
    role: 'Пастель',
    hex: '#E8FEEB',
    rgb: '232, 254, 235',
    cmyk: '13 0 17 0',
    pantone: 'P 142-1 U',
    group: 'pastel',
  },
]

export function getBrandColorsByGroup(group: BrandColorGroup) {
  return brandColorTokens.filter(color => color.group === group)
}
