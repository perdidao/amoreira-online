import { productPriceFormatter } from '@helpers/storeHelpers'
import { Menu, MenuItem } from '@models/menu'
import React from 'react'

// i18n
// import { useTranslations } from 'next-intl'

// Helpers

// Components

// Assets

// Env

// Types

// Styles
import * as Styled from './StoreMenu.styles'

const StoreMenu = (props: {
  menus: Menu[]
}): JSX.Element => {
  const {
    menus
  } = props

  const productHasDiscount = (item: MenuItem): boolean => {

    return (item.discountPrice && item.discountPrice !== 0) || false
  }

  return (
    <Styled.Container>
      {menus.map((menu) => {
        return (
          <Styled.Menu key={menu.title}>
            <Styled.MenuTitle>
              {menu.title}
            </Styled.MenuTitle>
            <Styled.MenuItemList>
              {menu.items.map((item) => {
                return (
                  <Styled.MenuItem key={item.name}>
                    <Styled.MenuItemInfo>
                      <Styled.MenuItemTitle>
                        {item.name}
                      </Styled.MenuItemTitle>
                      <Styled.MenuItemDescription>
                        {item.description}
                      </Styled.MenuItemDescription>
                    </Styled.MenuItemInfo>
                    <Styled.MenuItemPrices>
                      {productHasDiscount(item)
                        ? <Styled.MenuItemPrice>{productPriceFormatter(item.discountPrice)}</Styled.MenuItemPrice>
                        : <></>}
                      <Styled.MenuItemPrice isOldPrice={productHasDiscount(item)}>
                        {productPriceFormatter(item.price)}
                      </Styled.MenuItemPrice>
                    </Styled.MenuItemPrices>
                  </Styled.MenuItem>
                )
              })}
            </Styled.MenuItemList>
          </Styled.Menu>
        )
      })}
    </Styled.Container>
  )
}

export default StoreMenu
