import { CategoryNavigation } from '@components'
import { CategoryHeader } from '@components/CategoryHeader'
import { Loader } from '@components/Loader'
import { DefaultLayout } from '@layouts/Default'
import { useGetCategory } from '@services/useGetCategory'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'

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
  } = useGetCategory()

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
