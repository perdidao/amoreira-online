import styled, { keyframes } from 'styled-components'

// HELPERS
import { color, toRem } from '@helpers/platipus'

// Type declarations
interface StyleProps {
  size: number
  delay?: number
}

// Animation keyframe
const load = keyframes`
  0% {
    transform: scale(1);
  }
  
  50% {
    transform: scale(1.5);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
`

// Core element styles
export const Container = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ size }) => `${toRem(size)}`};
`

export const Pinball = styled.div<StyleProps>`
  width: ${({ size }) => `${toRem(size)}`};
  height: ${({ size }) => `${toRem(size)}`};
  border-radius: 50%;
  background-color: ${color('content-primary')};
  opacity: 0.4;
  animation: ${load} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: ${({ delay }) => (delay ? delay * 0.12 : 0)}s;
`
