import React from 'react'

// Components
import { CategoryButton, Shimmer } from '..'


// Hooks
import { useGetCategories } from '@services/useGetCategories'

// Styles
import * as Styled from './CategoryNavigation.styles'

const CategoryNavigation = (props: {
  currentCategorySlug?: string
}): JSX.Element => {
  const {
    currentCategorySlug
  } = props

  const {
    data,
    isFetching,
    isError
  } = useGetCategories()

  const renderCategoriesContent = (): JSX.Element | JSX.Element[] => {
    if (isFetching) {
      const shimmers: JSX.Element[] = []
  
      for(let i = 0; i < 7; i++) {
        shimmers.push(
          <Shimmer
            width={168}
            height={96}
            key={i}
          />
        )
      }

      return shimmers
    }

    if (!data || isError) {
      return <></>
    }

    return (
      <>
        {data.map((category) =>
          <CategoryButton
            {...category}
            active={currentCategorySlug === category.slug}
            key={category.id}
          />
        )}
      </>
    )
  }

  return (
    <Styled.Container>
      {renderCategoriesContent()}
    </Styled.Container>
  )
}

export default CategoryNavigation
