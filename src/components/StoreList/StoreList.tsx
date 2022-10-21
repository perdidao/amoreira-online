import React from 'react'

// Components
import { StoreCard, Shimmer } from '@components'

// Services
import { useGetStores } from '@services/useGetStores'

// Types
import { StoreListProps as Props } from './StoreList.types'

// Styles
import * as Styled from './StoreList.styles'

const StoreList = (props: Props): JSX.Element => {
  const {
    categorySlug
  } = props

  const {
    data,
    isFetching
  } = useGetStores()

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

  if (!data) {
    return <></>
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
