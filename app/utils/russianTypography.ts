const NBSP = '\u00A0'

/** Предлоги, союзы, частицы. */
const HANGING_FUNCTION_WORDS = [
  'или', 'обо', 'без', 'для', 'при', 'про', 'над', 'под', 'из', 'от', 'до', 'на', 'не', 'ни', 'по', 'за',
  'об', 'со', 'ко', 'во', 'как', 'что', 'ли', 'же', 'бы', 'но', 'то', 'и', 'а', 'в', 'к', 'с', 'у', 'о',
] as const

/** Местоимения, указательные и короткие наречия — тоже не оставляем в конце строки. */
const HANGING_PRONOUNS = [
  'это', 'эта', 'этот', 'эти', 'эту', 'этом', 'этой',
  'все', 'всё', 'вся', 'весь',
  'уже', 'еще', 'ещё',
  'так', 'там', 'тут', 'здесь',
  'его', 'её', 'ее', 'их', 'ему', 'ей', 'им',
  'он', 'она', 'они', 'мы', 'вы', 'ты',
] as const

const HANGING_WORDS = [...HANGING_FUNCTION_WORDS, ...HANGING_PRONOUNS]
  .sort((a, b) => b.length - a.length)

const HANGING_PATTERN = new RegExp(
  `(\\s)(${HANGING_WORDS.join('|')})\\s+(?=\\S)`,
  'gi',
)

/** «слово / слово» и «слово — слово». */
const SLASH_PATTERN = /\s+\/\s+/g
const EM_DASH_PATTERN = /\s+—\s+/g
const EN_DASH_PATTERN = /\s+–\s+/g

/** Число + единица измерения. */
const UNIT_PATTERN = /(\d+(?:[.,]\d+)?(?:[×x]\d+(?:[.,]\d+)?)?)\s+(px|pt|em|rem|dp|sp|%)\b/gi

/** Сокращения: и т. д., т. п. */
const ABBR_PATTERNS: Array<[RegExp, string]> = [
  [/\sи\s+т\.\s+д\./gi, `${NBSP}и${NBSP}т.${NBSP}д.`],
  [/\sи\s+т\.\s+п\./gi, `${NBSP}и${NBSP}т.${NBSP}п.`],
  [/\sт\.\s+д\./gi, `${NBSP}т.${NBSP}д.`],
  [/\sт\.\s+п\./gi, `${NBSP}т.${NBSP}п.`],
]

/**
 * Подставляет неразрывные пробелы после коротких служебных слов,
 * местоимений и указательных («это», «все», «его»…),
 * чтобы не было «висячих» слов в конце строки.
 * Не меняет ширину колонок — только точки переноса внутри текста.
 */
export function tieHangingWords(text: string): string {
  if (!text) {
    return text
  }

  let result = text

  for (const [pattern, replacement] of ABBR_PATTERNS) {
    result = result.replace(pattern, replacement)
  }

  result = result
    .replace(SLASH_PATTERN, `${NBSP}/${NBSP}`)
    .replace(EM_DASH_PATTERN, `${NBSP}—${NBSP}`)
    .replace(EN_DASH_PATTERN, `${NBSP}–${NBSP}`)
    .replace(UNIT_PATTERN, `$1${NBSP}$2`)
    .replace(HANGING_PATTERN, `$1$2${NBSP}`)

  return result
}
