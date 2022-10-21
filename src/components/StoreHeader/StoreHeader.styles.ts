import styled from 'styled-components'

// Helpers
import { color, fontSize, fontTitle, spacing } from '@helpers/platipus'

// Types

// Core element styles
export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: ${spacing('lg')};
`

export const Logo = styled.figure`
  margin-right: ${spacing('lg')};
`

export const Info = styled.div``

export const Title = styled.h1`
  ${fontTitle('lg')};
  color: ${color('primary')};
`

export const Status = styled.p`
  font-size: ${fontSize('sm')};
  color: ${color('content-primary')};
  margin-bottom: ${spacing('md')};
`

export const Phone = styled.p`
  font-size: ${fontSize('lg')};
  color: ${color('content-primary')};
  margin-bottom: ${spacing('md')};
`
