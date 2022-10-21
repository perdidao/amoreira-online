import styled from 'styled-components'

// Helpers
import { color, fontSize, fontWeight, spacing } from '@helpers/platipus'

// Types

// Core element styles
export const Container = styled.div`
  margin-bottom: ${spacing('xl')};
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${color('primary')};
  font-size:${fontSize('xxxl')};
  font-weight: ${fontWeight('normal')};

  img {
    display: block;
    margin-right: ${spacing('sm')};
  }
`
