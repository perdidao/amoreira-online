import { toRem } from '@helpers/platipus'

export const fonts = {
  primary: '"Sora", sans-serif',
  secondary: '"Archivo", sans-serif',

  weight: {
    normal: '400',
    bold: '700'
  },

  size: {
    xxxs: toRem(6),
    xxs: toRem(8),
    xs: toRem(10),
    sm: toRem(12),
    md: toRem(16),
    lg: toRem(20),
    xl: toRem(24),
    xxl: toRem(32),
    xxxl: toRem(48),
    hero: toRem(74)
  },

  height: {
    xxxs: toRem(16),
    xxs: toRem(20),
    xs: toRem(24),
    sm: toRem(28),
    md: toRem(32),
    lg: toRem(40),
    xl: toRem(44),
    xxl: toRem(52),
    xxxl: toRem(60),
  },

  spacing: {
    xxxs: '-0.96px',
    xxs: '-0.64px',
    xs: '-0.32px',
    sm: '0.16px',
    md: '0.24px',
    lg: '0.32px',
    xl: '0.40px',
  },
}
