import { colors } from './colors'
import { fonts } from './fonts'
import { spacing } from './spacing'

export const theme: any = {
  fonts: fonts,
  colors: colors,
  spacing: spacing,
  animation: {
    bezier: '200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    easeInOut: '200ms ease-in-out',
  },
  media: {
    mobile: 768,
    tablet: 1024,
    notebook: 1440,
    desktop: 1920
  }
}
