
// i18n
import { useTranslations } from 'next-intl'

// Services
import { useGetStore } from '@services/useGetStore'

// Data
import { parseSlug } from '@lib/http'
import { getStoreBySlug } from '@lib/stores'

// Hooks
import { useRouter } from 'next/router'

// Layout
import { DefaultLayout } from '@layouts/Default'

// Components
import {
  Loader,
  StoreHeader
} from '@components'

// Types
import type { GetStaticPaths, NextPage } from 'next'
import { StoreMenu } from '@components/StoreMenu'

const StorePage: NextPage = () => {
  const router = useRouter()
  const t = useTranslations('errors')
  
  const {
    query: { slug },
  } = router

  const isSlug = typeof slug === "string"
  const currentStoreSlug = isSlug ? slug : ''

  const {
    data,
    isFetching,
    isError
  } = useGetStore(currentStoreSlug)

  if (isFetching) { 
    return (
      <DefaultLayout title={currentStoreSlug} centered={true} spaced={true}>
        <Loader size={40} />
      </DefaultLayout>
    )
  }

  if (isError || !data) {
    return (
      <DefaultLayout title={currentStoreSlug} centered={true} spaced={true}>
        {t('loadFailed')}
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout title={data.title}>
      <StoreHeader {...data} />
      <StoreMenu menus={data.menu ?? []} />
    </DefaultLayout>
  )
}

export async function getStaticProps({ locale, params }: any) {
  const slug = parseSlug(params?.slug)

  if (!slug || !getStoreBySlug(slug)) {
    return { notFound: true }
  }

  return {
    props: {
      messages: (await import(`@public/locales/${locale.toString()}.json`)).default
    }
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
      paths: [],
      fallback: 'blocking'
  }
}

export default StorePage
