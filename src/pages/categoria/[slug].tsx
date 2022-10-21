import { CategoryNavigation } from '@components'
import { DefaultLayout } from '@layouts/Default'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'

const CategoryPage: NextPage = () => {
  const router = useRouter()
  
  const {
    query: { slug },
  } = router

  const isSlug = typeof slug === "string"

  return (
    <DefaultLayout title={isSlug ? slug : ''}>
      <CategoryNavigation />
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
