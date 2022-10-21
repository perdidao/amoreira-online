import styled from 'styled-components'

// Helpers
import { color, fontSize, spacing } from '@helpers/platipus'

// Types
interface PriceProps {
  isOldPrice?: boolean
}

// Core element styles
export const Container = styled.div``

export const Menu = styled.div`
  margin-bottom: ${spacing('lg')};
`

export const MenuTitle = styled.h2`
  font-size: ${fontSize('xxl')};
  color: ${color('primary')};
  margin-bottom: ${spacing('md')};
`

export const MenuItemList = styled.ul`
  list-style: none;
`

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing('md')};
  padding-bottom: ${spacing('md')};
  border-bottom: 1px solid ${color('border-tertiary')};

  &:last-child {
    border:0;
  }
`

export const MenuItemInfo = styled.div``

export const MenuItemTitle = styled.h3`
  color: ${color('content-secondary')};
  font-size: ${fontSize('lg')};
  margin-bottom: ${spacing('xs')};
`

export const MenuItemDescription = styled.p`
  font-size: ${fontSize('md')};
`

export const MenuItemPrices = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const MenuItemPrice = styled.p<PriceProps>`
  color: ${({ isOldPrice }): string => isOldPrice ? color('feedback-error') : color('feedback-success')};
  ${({ isOldPrice }): string => isOldPrice ? 'text-decoration: line-through' : ''};
  font-size: ${fontSize('xl')};
`
