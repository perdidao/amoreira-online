import styled from 'styled-components'

// Helpers
import { color, fontSize, fontWeight, spacing } from '@helpers/platipus'

// Types
interface StatusProps {
  isActive: boolean
}

// Core element styles
export const Container = styled.div`
  background-color: ${color('background-secondary')};
  border-radius: ${spacing('md')};
  overflow: hidden;
  position: relative;
`

export const Logo = styled.figure`
  cursor: pointer;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`

export const Info = styled.div`
  padding: ${spacing('sm')};
`

export const Title = styled.h3`
  font-size: ${fontSize('lg')};
  font-weight: ${fontWeight('normal')};
  color: ${color('content-secondary')};
  margin-bottom: ${spacing('xs')};

  a {
    color: inherit;
    text-decoration: none;
  }
`

export const Categories = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img{
    display: block;
    margin-right: ${spacing('xs')};
    cursor: pointer;
  }
`

export const Status = styled.p<StatusProps>`
  position: absolute;
  top: ${spacing('sm')};
  right: ${spacing('sm')};
  background-color: ${({ isActive }): string => isActive ? color('feedback-success') : color('feedback-error')};
  font-size: ${fontSize('xs')};
  text-transform: uppercase;
  padding: ${spacing('xs')};
  color: ${color('white')};
  font-weight: ${fontWeight('bold')};
  border-radius: ${spacing('xs')};
`
