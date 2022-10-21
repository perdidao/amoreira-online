import styled, {
  css,
  keyframes,
  FlattenSimpleInterpolation
} from 'styled-components'

// HELPERS
import { spacing, toRem } from '@helpers/platipus';

// TYPES
import { ShimmerTypes } from './Shimmer.types';

const shine = keyframes`
  to {
    transform: translateX(100%);
  }
`

interface ShimmerProps extends ShimmerTypes {
  height?: string;
  width?: string;
}

export const Shimmer = styled.div<ShimmerProps>`
  position: relative;
  width: ${(props): string => (props.width ? props.width : '100%')};
  height: ${(props): string => (props.height ? props.height : '100%')};
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: ${spacing('md')};
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${`
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.04) 50.38%,
        rgba(255, 255, 255, 0) 100%
      )
    `};
    transform: translateX(-100%);
    animation: ${shine} 1.4s infinite;
    content: '';
  }

  ${(props): FlattenSimpleInterpolation | false =>
    props.type === 'text-block' &&
    css`
      & > .Shimmer {
        height: ${toRem(8)};
      }

      & > .Shimmer:first-child {
        width: 100%;
      }

      & > .Shimmer:nth-child(2) {
        width: 67%;
      }

      & > .Shimmer:nth-child(3) {
        width: 62%;
      }

      & > .Shimmer:nth-child(4) {
        width: 84%;
      }

      & > .Shimmer:last-child {
        width: 52%;
      }

      & > .Shimmer + .Shimmer {
        margin-top: ${spacing('xs')};
      }
    `};
`
