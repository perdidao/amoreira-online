import React from 'react'

// Helpers

// Components
import Image from 'next/future/image'

// Assets

// Env

// Types
import { CategoryHeaderProps as Props } from './CategoryHeader.types'

// Styles
import * as Styled from './CategoryHeader.styles'

const CategoryHeader = (props: Props): JSX.Element => {
  const {
    title,
    slug
  } = props

  return (
    <Styled.Container>
      <Styled.Title>
        <Image
          src={`/assets/icons/categories/${slug}.png`}
          alt={title}
          aria-hidden="true"
          width="48"
          height="48"
        />
        {title}
      </Styled.Title>
    </Styled.Container>
  )
}

export default CategoryHeader
