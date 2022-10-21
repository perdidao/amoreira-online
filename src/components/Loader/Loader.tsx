import React from 'react'

// TYPES
import { LoaderProps as Props } from './Loader.types'

// STYLES
import * as Styled from './Loader.styles'

const Loader = (props: Props): JSX.Element => {
  const { size } = props

  // Calculates each pinball size based on total component size
  const itemSize: number = size ? size / 5 : 4

  return (
    <Styled.Container size={size || 20}>
      <Styled.Pinball size={itemSize} delay={0} />
      <Styled.Pinball size={itemSize} delay={1} />
      <Styled.Pinball size={itemSize} delay={2} />
    </Styled.Container>
  )
}

export default Loader
