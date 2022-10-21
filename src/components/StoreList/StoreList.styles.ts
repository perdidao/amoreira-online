import styled from 'styled-components'

// Helpers
import { mediaQuerie, spacing } from '@helpers/platipus'

// Types

// Core element styles
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: ${spacing('lg')};
  margin: ${spacing('lg')} 0;

  ${mediaQuerie('mobile', `
    grid-template-columns: repeat(2, 48%);
    grid-gap: 4%;
  `)};
`
