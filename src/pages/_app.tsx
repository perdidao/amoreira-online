// i18n
import { NextIntlProvider } from 'next-intl'

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
  const queryClient = new QueryClient()
  
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </NextIntlProvider>
  )
}

export default MyApp
