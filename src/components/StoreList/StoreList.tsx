import React from 'react'

// Helpers

// Components

// Assets

// Env

// Types
import { StoreListProps as Props } from './StoreList.types'

// Styles
import * as Styled from './StoreList.styles'
import { useGetStores } from '@services/useGetStores'
import { Shimmer } from '..'
import { StoreCard } from '@components/StoreCard'

const StoreList = (props: Props): JSX.Element => {
  const {
    categorySlug
  } = props

  const {
    data,
    isFetching
  } = useGetStores()

  if (!data) {
    return <></>
  }

  if (isFetching) {
    const shimmers: JSX.Element[] = []

    for(let i = 0; i < 6; i++) {
      shimmers.push(
        <Shimmer
          width={200}
          height={272}
          key={i}
        />
      )
    }

    return (
      <Styled.Container>
        {shimmers}
      </Styled.Container>
    )
  }

  return (
    <Styled.Container>
      {data.map((store) =>
        <StoreCard key={store.id} {...store} />
      )}
    </Styled.Container>
  )
}

export default StoreList
