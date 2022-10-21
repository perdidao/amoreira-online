import React from 'react'

// Helpers

// Components
import Image from 'next/future/image'

// Helpers
import { storeStatusText } from '@helpers/storeHelpers'

// Env

// Types
import { StoreHeaderProps as Props } from './StoreHeader.types'

// Styles
import * as Styled from './StoreHeader.styles'

const StoreHeader = (props: Props): JSX.Element => {
  const {
    title,
    logo,
    phone,
    whatsapp,
    workdays
  } = props

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
        <Styled.Status>Este restaurante está {storeStatusText(workdays)} hoje</Styled.Status>
        <Styled.Phone>{phone === whatsapp ? '': phone}</Styled.Phone>
        <Styled.Phone>{whatsapp}</Styled.Phone>
      </Styled.Info>
    </Styled.Container>
  )
}

export default StoreHeader
