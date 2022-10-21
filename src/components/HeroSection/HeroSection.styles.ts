import styled from 'styled-components'

// Helpers
import { centered, color, fontSize, fontWeight, mediaQuerie, spacing } from '@helpers/platipus'

// Types

// Core element styles
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: ${spacing('xl')};

  ${mediaQuerie('mobile', `
    flex-direction: column;
  `)};
`

export const Content = styled.div`
  max-width: 25vw;

  ${mediaQuerie('mobile', `
    max-width: 100%;
    margin-bottom: ${spacing('lg')};
  `)};
`

export const HeroTitle = styled.h2`
  font-size: ${fontSize('hero')};
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${color('content-secondary')};
  font-weight: ${fontWeight('normal')};
  margin-bottom: ${spacing('md')};

  strong {
    font-weight: ${fontWeight('normal')};
    color: ${color('primary')};
    text-decoration: underline;
  }
`

export const HeroText = styled.p`
  font-size: ${fontSize('lg')};
  line-height: 1.5;
`
