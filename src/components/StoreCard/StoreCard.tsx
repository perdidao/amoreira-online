import React from 'react'

// Helpers
import { storeStatusText } from '@helpers/storeHelpers'

// Components
import Image from 'next/future/image'
import Link from 'next/link'

// Types
import { StoreCardProps as Props } from './StoreCard.types'

// Styles
import * as Styled from './StoreCard.styles'

const StoreCard = (props: Props): JSX.Element => {
  const {
    title,
    slug,
    logo,
    isOpenToday,
    categories
  } = props

  const renderCategoryIcons = (): JSX.Element[] => {
    return categories.map((category) => (
      <Link
        href={`/categoria/${category}`}
        title={category}
        key={category}>
        <Image
          src={`/assets/icons/categories/${category}.png`}
          alt={category}
          width={24}
          height={24}
        />
      </Link>
    ))
  }

  return (
    <Styled.Container>
      <Styled.Logo>
        <Link
          href={`/lojas/${slug}`}
          title={title}>
          <Image
            src={logo}
            alt={title}
            width={240}
            height={240}
          />
        </Link>
      </Styled.Logo>
      <Styled.Info>
        <Styled.Title>
          <Link
            href={`/lojas/${slug}`}
            title={title}>
            {title}
          </Link>
        </Styled.Title>
        <Styled.Categories>
          {renderCategoryIcons()}
        </Styled.Categories>
      </Styled.Info>
      <Styled.Status isActive={isOpenToday}>
        {storeStatusText(isOpenToday)}
      </Styled.Status>
    </Styled.Container>
  )
}

export default StoreCard
