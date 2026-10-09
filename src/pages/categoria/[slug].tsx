
// i18n
import { useTranslations } from 'next-intl'

// Services
import { useGetCategory } from '@services/useGetCategory'

// Data
import { parseSlug } from '@lib/http'
import { getCategoryBySlug } from '@lib/stores'

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
  const t = useTranslations('errors')
  
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

  if (categoryIsError || !categoryData) {
    return (
      <DefaultLayout title={currentCategorySlug} centered={true} spaced={true}>
        {t('loadFailed')}
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout title={categoryData.title}>
      <CategoryHeader {...categoryData} />
      <CategoryNavigation currentCategorySlug={currentCategorySlug} />
      <StoreList categorySlug={currentCategorySlug} />
    </DefaultLayout>
  )
}

export async function getStaticProps({ locale, params }: any) {
  const slug = parseSlug(params?.slug)

  if (!slug || !getCategoryBySlug(slug)) {
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

export default CategoryPage
