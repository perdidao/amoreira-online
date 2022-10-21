
// Services
import { useGetStore } from '@services/useGetStore'

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

const CategoryPage: NextPage = () => {
  const router = useRouter()
  
  const {
    query: { slug },
  } = router

  const isSlug = typeof slug === "string"
  const currentStoreSlug = isSlug ? slug : ''

  const {
    data,
    isFetching,
    isError
  } = useGetStore()

  if (isFetching) { 
    return (
      <DefaultLayout title={currentStoreSlug} centered={true} spaced={true}>
        <Loader size={40} />
      </DefaultLayout>
    )
  }

  if (!data || !data.menu) {
    router.push(`/`)
    return <></>
  }

  return (
    <DefaultLayout title={data.title}>
      <StoreHeader {...data} />
      <StoreMenu menus={data.menu} />
    </DefaultLayout>
  )
}

export async function getStaticProps({ locale }: any) {
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

export default CategoryPage
