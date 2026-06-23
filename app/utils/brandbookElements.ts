const ELEMENTS_BASE = '/assets/images/brandbook/elements'

export const BRAND_ELEMENTS_3D = {
  intro:
    'В оформлении рекламных носителей могут быть использованы 3D элементы. Это могут быть как абстрактные фигуры, так и реалистичные объекты.',
  rules: [
    'В качестве цветов объектов могут быть использованы цветные, прозрачные и голографические материалы.',
    'Допустимо добавление текстуры.',
    'Следует избегать острых углов и жестких теней.',
  ],
  headline: 'Безопасность — на первом месте',
  /** Порядок слева направо, как в брендбуке */
  primitives: [
    { src: `${ELEMENTS_BASE}/3d-4.png`, alt: '3D конус с голографической текстурой' },
    { src: `${ELEMENTS_BASE}/3d-2.png`, alt: '3D тор зелёного цвета' },
    { src: `${ELEMENTS_BASE}/3d-3.png`, alt: '3D сфера жёлтого цвета' },
    { src: `${ELEMENTS_BASE}/3d-1.png`, alt: '3D цилиндр' },
  ],
  scene: `${ELEMENTS_BASE}/3d-5.jpeg`,
  banner: `${ELEMENTS_BASE}/3d-6.png`,
} as const

export const BRAND_ELEMENTS_2D = {
  intro:
    'В оформлении рекламных носителей могут быть использованы 2D иллюстрации. Это могут быть как абстрактные фигуры, так и стилизованные объекты, люди.',
  illustration: `${ELEMENTS_BASE}/2d-1.png`,
} as const

export const BRAND_ELEMENTS_MESH = {
  paragraphs: [
    'В оформлении рекламных носителей могут быть использованы мэш градиенты.',
    'В градиентах могут быть использованы фирменные цвета или близкие к ним оттенки. Также могут быть использованы дополнительные цвета.',
  ],
  toolPrefix: 'Градиенты можно создавать с помощью сторонних инструментов, например,',
  toolUrl: 'https://meshgradient.com',
  toolLabel: 'meshgradient.com',
  images: [
    { src: `${ELEMENTS_BASE}/mesh-1.png`, alt: 'Пример мэш-градиента' },
    { src: `${ELEMENTS_BASE}/mesh-2.png`, alt: 'Пример мэш-градиента' },
    { src: `${ELEMENTS_BASE}/mesh-3.png`, alt: 'Пример мэш-градиента' },
  ],
} as const
