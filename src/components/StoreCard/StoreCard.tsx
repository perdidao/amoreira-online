import React from 'react'

// i18n
// import { useTranslations } from 'next-intl'

// Helpers

// Components

// Assets

// Env

// Types
import { StoreCardProps as Props } from './StoreCard.types'

// Styles
import * as Styled from './StoreCard.styles'
import Image from 'next/future/image'
import { isStoreOpenToday, storeStatusText } from '@helpers/storeHelpers'
import Link from 'next/link'

const StoreCard = (props: Props): JSX.Element => {
  const {
    title,
    logo,
    workdays,
    categories
  } = props

  // const t = useTranslations()

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
        <Image
          src={logo}
          alt={title}
          width={240}
          height={240}
        />
      </Styled.Logo>
      <Styled.Info>
        <Styled.Title>
          {title}
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
