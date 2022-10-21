// TYPES
import { ShimmerProps as Props } from './Shimmer.types'

// STYLES
import * as Styled from './Shimmer.styles'

const Shimmer = ({
  type = 'rectangle',
  width,
  height,
  ...rest
}: Props): JSX.Element => {
  if (type === 'text-block') {
    return (
      <Styled.Shimmer
        type="text-block"
        width={typeof width === 'number' ? `${width}px` : width}
        height={typeof height === 'number' ? `${height}px` : height}
        {...rest}
      >
        <Styled.Shimmer className="Shimmer"
          type="text-block" />

        <Styled.Shimmer className="Shimmer"
          type="text-block" />

        <Styled.Shimmer className="Shimmer"
          type="text-block" />

        <Styled.Shimmer className="Shimmer"
          type="text-block" />

        <Styled.Shimmer className="Shimmer"
          type="text-block" />
      </Styled.Shimmer>
    )
  }

  return (
    <Styled.Shimmer
      type={type}
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      {...rest}
    >
    </Styled.Shimmer>
  )
}

export default Shimmer
