import styled from 'styled-components'

// Helpers
import { media, spacing, toRem } from '@helpers/platipus'

interface PageStyleProps {
  centered: boolean
  spaced: boolean
}

export const PageWrapper = styled.div<PageStyleProps>`
  width: 90vw;
  max-width: calc(${media('notebook')} - ${toRem(40)});
  margin: ${({ spaced }) => spaced ? spacing('lg') : '0'} auto;

  ${({ centered }): string => {
    if (centered) {
      return `
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `
    }

    return ''
  }}
`
