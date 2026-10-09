
// Services
import { useGetCategory } from '@services/useGetCategory'

// Hooks
import { useRouter } from 'next/router'

// Layout
import { DefaultLayout } from '@layouts/Default'

// Components
import {
  CategoryNavigation,
  CategoryHeader,
  Loader,
  StoreList
} from '@components'

// Types
import type { GetStaticPaths, NextPage } from 'next'

const CategoryPage: NextPage = () => {
  const router = useRouter()
  
  const {
    query: { slug },
  } = router

  const isSlug = typeof slug === "string"
  const currentCategorySlug = isSlug ? slug : ''

  const {
    data: categoryData,
    isFetching: categoryIsFetching,
    isError: categoryIsError
  } = useGetCategory(currentCategorySlug)

  if (categoryIsFetching) { 
    return (
      <DefaultLayout title={currentCategorySlug} centered={true} spaced={true}>
        <Loader size={40} />
      </DefaultLayout>
    )
  }

  if (!categoryData) {
    router.push(`/categoria/${slug}`)
    return <></>
  }

  return (
    <DefaultLayout title={categoryData.title}>
      <CategoryHeader {...categoryData} />
      <CategoryNavigation currentCategorySlug={currentCategorySlug} />
      <StoreList categorySlug={currentCategorySlug} />
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
