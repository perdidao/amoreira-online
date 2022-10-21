import React from 'react'

// i18n
import { useTranslations } from 'next-intl'

// Helpers
import { useRouter } from 'next/router'

// Components
import Link from 'next/link'
import Image from 'next/future/image'

// Types
import { HeaderProps as Props } from './Header.types'

// Styles
import * as Styled from './Header.styles'

const Header = (props: Props): JSX.Element => {
  const router = useRouter()

  const _handleRedirect = (): void => {
    router.push('/')
  }

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Logo onClick={(): void => _handleRedirect()}>
          <Image
            src="/assets/images/logo.svg"
            alt="Amoreira Foods"
            width={120}
            height={120}
          />
        </Styled.Logo>
        <Styled.Nav>
          <Link href="/">
            <Styled.NavLink
              title="Página inicial"
              active={router.pathname === '/'}
            >
              Início
            </Styled.NavLink>
          </Link>
          <Link href="/lojas">
            <Styled.NavLink
              title="Lojas"
              active={router.pathname.includes('/lojas')}
            >
              Lojas
            </Styled.NavLink>
          </Link>
          <Link href="/contato">
            <Styled.NavLink
              title="Entre em contato conosco"
              active={router.pathname === '/contato'}
            >
              Contato
            </Styled.NavLink>
          </Link>
        </Styled.Nav>
      </Styled.Wrapper>
    </Styled.Container>
  )
}

export default Header
