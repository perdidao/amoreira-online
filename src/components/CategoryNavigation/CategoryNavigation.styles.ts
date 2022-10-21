import styled from 'styled-components'

// Helpers
import { centered, mediaQuerie, spacing } from '@helpers/platipus'

// Core element styles
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 12%);
  grid-gap: ${spacing('md')};

  ${mediaQuerie('mobile', `
    grid-template-columns: repeat(3, 30%);
  `)};
`
