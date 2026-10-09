// i18n
import { NextIntlProvider } from 'next-intl'

// React
import { useState } from 'react'

// Nextjs
import type { AppProps } from 'next/app'

// React Query
import { QueryClient, QueryClientProvider } from 'react-query'

// Styles
import '@theme/global.css'

interface CustomPageProps {
  messages: any
}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </NextIntlProvider>
  )
}

export default MyApp
