import styled from 'styled-components'

// Helpers
import { color, fontSize, fontWeight, spacing } from '@helpers/platipus'

// Types

// Core element styles
export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0;
  border-radius: ${spacing('md')};
  padding: ${spacing('sm')};
  margin: 0;
  background-image: linear-gradient(to right bottom, ${color('background-secondary')}, ${color('background-tertiary')});
  cursor: pointer;
  transition: opacity 300ms ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`

export const Title = styled.strong`
  display: block;
  margin-top: ${spacing('sm')};
  text-align: center;
  color: ${color('content-primary')};
  font-size: ${fontSize('md')};
  font-weight: ${fontWeight('normal')};
`

export const Quantity = styled.span`
  color: ${color('content-secondary')};
  font-size: ${fontSize('sm')};
`
