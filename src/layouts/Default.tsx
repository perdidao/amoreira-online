import React from 'react'
import { ThemeProvider } from 'styled-components'

// i18n
import { useTranslations } from 'next-intl'

// Nextjs
import Head from 'next/head'

// Components
import { Header } from '@components'

// Types
import { LayoutProps } from '@layouts/Default.types'

// Styles
import { theme } from '@theme/default'
import * as Styled from './Default.styles'

const DefaultLayout = (props: LayoutProps) => {
  const {
    children,
    title,
    description,
    spaced,
    centered
  } = props

  const t = useTranslations('global')

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          {`${title} | Amoreira Online - ${t('heading')}`}
        </title>
        <meta
          name="description"
          content={description ? description : t('heading')}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title={title}
      />
      <Styled.PageWrapper
        spaced={spaced || false}
        centered={centered || false}
      >
        {children}
      </Styled.PageWrapper>
    </ThemeProvider>
  )
}

export { DefaultLayout }
