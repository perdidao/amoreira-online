import { theme } from '@theme/default'
import { spacing as sizes } from '@theme/spacing'
import { fonts } from '@theme/fonts' 
import { FontPresetSize, FontSize, FontWeight, MediaSize, Size } from '@theme/types'

/**
 * Helper to convert pixel to rem
 * @param value pixel value without extension (px)
 * @returns the converted value with rem extension (ex.: 0.75rem)
 * @example toRem(20)
 */
export function toRem(value: string | number): string {
  const parsedValue = Number(value.toString().replace('px', ''))

  return `${parsedValue / 16}rem`
}

/**
 * Shortcut to provide rem spacing from Platipus
 * @param size size name (ex.: nano, tiny, xxxs, etc...)
 * @returns the rem value associated to the size name (ex.: 1rem)
 * @example spacing('sm')
 * xs: 5
 * sm: 10
 * md: 20
 * lg: 40
 * xl: 80
 * xxl: 100
 * xxxl: 160
 */
export function spacing(size: Size): string {
  return sizes[size]
}

/**
 * Shortcut to provide rem font-size from Platipus
 * @param size size name (ex.: xxxs, xxs, xs, etc...)
 * @returns the rem value associated to the size name (ex.: 1rem)
 * @example fontSize('sm')
 * xxxs: 6
 * xxs: 8
 * xs: 10
 * sm: 12
 * md: 16
 * lg: 20
 * xl: 24
 * xxl: 32
 * xxxl: 48
 * hero: 74
 */
export function fontSize(size: FontSize): string {
  return fonts.size[size]
}

/**
 * Shortcut to provide font-weight from Platipus
 * @param weight weight key (normal, medium or semibold)
 * @returns the weight associated to the weight key (ex.: 400)
 * @example fontWeight('normal')
 */
export function fontWeight(weight: FontWeight): string {
  return fonts.weight[weight]
}

/**
 * Shortcut to provide media defaults from Platipus
 * @param device device name (mobile, tablet, notebook, desktop)
 * @returns the integer width of the device (ex.: 1rem)
 * @example media('notebook')
 */
export function media(device: MediaSize) {
  return toRem(theme.media[device])
}

/**
 * Helper to provide the desired theme color
 * @param color a string of the desired color category and name splitted by a dash (surface-highlight)
 * @returns the color string associated to the Family/Color
 * @example color('brand-primary') for Platipus's Brand/Primary
 */
export function color(color: string): string {
  const colorCodes: string[] = color.split('-')

  if (colorCodes.length > 1) {
    return theme.colors[colorCodes[0]][colorCodes[1]]
  }

  return theme.colors[colorCodes[0]]
}

/**
 * Helper to provide the media querie block
 * @param size the style's target size
 * @param content the styles string from styled-components
 * @returns the media querie block with the styles
 * @example mediaQuery('tablet', `background-color: #F00;`)
 */
export function mediaQuerie(size: MediaSize, content: string): string {
  switch (size) {
    case 'desktop':
      return `
        @media (max-width: ${theme.media.notebook}px) {
          ${content};
        }
      `
    case 'tablet':
      return `
        @media (max-width: ${theme.media.tablet}px) {
          ${content};
        }
      `
    default:
      return `
        @media (max-width: ${theme.media.mobile}px) {
          ${content};
        }
      `
  }
}

/**
 * Helper to provide the font styles associated to the Display font preset
 * @param size the non-required font preset size (sm, md, lg). If none is provided, defaults to md
 * @returns a string with the associated font styles
 * @example fontDisplay('lg')
 */
export function fontDisplay(size?: FontPresetSize): string {
  let mutableProps = ''

  switch (size) {
    case 'sm':
      mutableProps = `
        font-size: ${theme.fonts.size.xl};
        line-height: ${theme.fonts.height.xl};
        letter-spacing: ${theme.fonts.spacing.xs};
      `
      break

    case 'lg':
      mutableProps = `
        font-size: ${theme.fonts.size.xxxl};
        line-height: ${theme.fonts.height.xxxl};
        letter-spacing: ${theme.fonts.spacing.xxxs};
      `
      break

    default:
      mutableProps = `
        font-size: ${theme.fonts.size.xxl};
        line-height: ${theme.fonts.height.xxl};
        letter-spacing: ${theme.fonts.spacing.xxs};
      `
  }

  return `
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fonts.weight.medium};
    ${mutableProps}
  `
}

/**
 * Helper to provide the font styles associated to the Title font preset
 * @param size the non-required font preset size (sm, md, lg). If none is provided, defaults to md
 * @returns a string with the associated font styles
 * @example fontTitle('lg')
 */
export function fontTitle(size?: FontPresetSize): string {
  let mutableProps = ''

  switch (size) {
    case 'sm':
      mutableProps = `
        font-size: ${theme.fonts.size.xl};
        line-height: ${theme.fonts.height.xl};
      `
      break

    case 'lg':
      mutableProps = `
        font-size: ${theme.fonts.size.hero};
        line-height: ${theme.fonts.height.hero};
      `
      break

    default:
      mutableProps = `
        font-size: ${theme.fonts.size.md};
        line-height: ${theme.fonts.height.md};
      `
  }

  return `
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fonts.weight.bold};
    ${mutableProps}
  `
}

/**
 * Helper to provide the font styles associated to the Subtitle font preset
 * @param size the non-required font preset size (sm, md, lg). If none is provided, defaults to md
 * @returns a string with the associated font styles
 * @function fontDisplay('lg')
 */
export function fontSubtitle(size?: FontPresetSize): string {
  let mutableProps = ''

  switch (size) {
    case 'sm':
      mutableProps = `
        font-size: ${theme.fonts.size.xxxs};
        line-height: ${theme.fonts.height.xxxs};
        letter-spacing: ${theme.fonts.spacing.sm};
      `
      break

    case 'lg':
      mutableProps = `
        font-size: ${theme.fonts.size.xs};
        line-height: ${theme.fonts.height.xs};
        letter-spacing: ${theme.fonts.spacing.lg};
      `
      break

    default:
      mutableProps = `
        font-size: ${theme.fonts.size.xxs};
        line-height: ${theme.fonts.height.xxs};
        letter-spacing: ${theme.fonts.spacing.md};
      `
  }

  return `
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fonts.weight.semibold};
    text-transform: uppercase;
    ${mutableProps}
  `
}

/**
 * Helper to provide the font styles associated to the Label font preset
 * @param size the non-required font preset size (sm, md, lg). If none is provided, defaults to md
 * @returns a string with the associated font styles
 * @example fontLabel('lg')
 */
export function fontLabel(size?: FontPresetSize): string {
  let mutableProps = ''

  switch (size) {
    case 'sm':
      mutableProps = `
        font-size: ${theme.fonts.size.xxxs};
        line-height: ${theme.fonts.height.xxxs};
        letter-spacing: ${theme.fonts.spacing.xl};
      `
      break

    case 'lg':
      mutableProps = `
        font-size: ${theme.fonts.size.xs};
        line-height: ${theme.fonts.height.xs};
        letter-spacing: ${theme.fonts.spacing.md};
      `
      break

    default:
      mutableProps = `
        font-size: ${theme.fonts.size.xxs};
        line-height: ${theme.fonts.height.xxs};
        letter-spacing: ${theme.fonts.spacing.lg};
      `
  }

  return `
    font-family: ${theme.fonts.secondary};
    font-weight: ${theme.fonts.weight.semibold};
    ${mutableProps}
  `
}

/**
 * Helper to provide the font styles associated to the Body font preset
 * @param size the non-required font preset size (sm, md, lg). If none is provided, defaults to md
 * @returns a string with the associated font styles
 * @example fontBody('lg')
 */
export function fontBody(size?: FontPresetSize): string {
  let mutableProps = ''

  switch (size) {
    case 'sm':
      mutableProps = `
        font-size: ${theme.fonts.size.xxxs};
        line-height: ${theme.fonts.height.xxs};
        letter-spacing: ${theme.fonts.spacing.xl};
      `
      break

    case 'lg':
      mutableProps = `
        font-size: ${theme.fonts.size.xs};
        line-height: ${theme.fonts.height.sm};
        letter-spacing: ${theme.fonts.spacing.md};
      `
      break

    default:
      mutableProps = `
        font-size: ${theme.fonts.size.xxs};
        line-height: ${theme.fonts.height.xs};
        letter-spacing: ${theme.fonts.spacing.lg};
      `
  }

  return `
    font-family: ${theme.fonts.secondary};
    font-weight: ${theme.fonts.weight.normal};
    ${mutableProps}
  `
}


// Page Helper
export function centered(spaced?: boolean): string {
  return `
    width: 90vw;
    max-width: calc(${media('notebook')} - ${toRem(40)});
    margin: ${spaced ? spacing('lg') : '0'} auto;
  `
}
