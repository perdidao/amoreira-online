import React from 'react'

// Hooks
import { useRouter } from 'next/router'

// Components
import Image from 'next/image'

// Types
import { CategoryButtonProps as Props } from './CategoryButton.types'

// Styles
import * as Styled from './CategoryButton.styles'

const CategoryButton = (props: Props): JSX.Element => {
  const router = useRouter()
  
  const {
    slug,
    title,
    totalItems,
    active
  } = props

  const _handleRedirect = (): void => {
    router.push(`/categoria/${slug}`)
  }

  return (
    <Styled.Container
      onClick={(): void => _handleRedirect()}
      active={active}
    >
      <Image
        src={`/assets/icons/categories/${slug}.png`}
        alt={title}
        width={48}
        height={48}
      />
      <Styled.Title>
        {title}{' '}
        <Styled.Quantity>({totalItems})</Styled.Quantity>
      </Styled.Title>
    </Styled.Container>
  )
}

export default CategoryButton
