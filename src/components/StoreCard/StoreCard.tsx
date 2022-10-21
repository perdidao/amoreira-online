import React from 'react'

// Helpers
import { isStoreOpenToday, storeStatusText } from '@helpers/storeHelpers'

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
    workdays,
    categories
  } = props

  const renderCategoryIcons = (): JSX.Element[] => {
    const categoryIcons: JSX.Element[] = []

    categories.map((category) => {
      categoryIcons.push(
        <Link
          href={`/categoria/${category}`}
          title={category}>
          <Image
            src={`/assets/icons/categories/${category}.png`}
            alt={category}
            width={24}
            height={24}
          />
        </Link>
      )
    })

    return categoryIcons
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
      <Styled.Status isActive={isStoreOpenToday(workdays)}>
        {storeStatusText(workdays)}
      </Styled.Status>
    </Styled.Container>
  )
}

export default StoreCard
