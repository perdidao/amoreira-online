import styled from 'styled-components'

// Helpers
import { color, fontBody, fontSize, media, spacing } from '@helpers/platipus'

// Types
interface NavLinkProps {
  active: boolean
}

// Core element styles
export const Container = styled.header`
  padding: ${spacing('md')} 0;
  margin-bottom: ${spacing('lg')};
`

export const Wrapper = styled.section`
  width: 90vw;
  max-width: calc(${media('notebook')} - 40px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.h1`
  transition: opacity 300ms ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
`

export const NavLink = styled.a<NavLinkProps>`
  display: block;
  margin-left: ${spacing('lg')};
  font-size: ${fontSize('lg')};
  font-weight: ${({ active, theme }): string => active ? theme.fonts.weight.semibold : theme.fonts.weight.normal};
  color: ${({ active }): string => active ? color('primary') : 'inherit'};
  cursor: pointer;
  transition: color 300ms ease-in-out;

  &:hover {
    color: ${color('primary')};
  }
`
