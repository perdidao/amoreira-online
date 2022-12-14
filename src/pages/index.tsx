// Next
import type { NextPage } from 'next'

// Layout
import { DefaultLayout } from '@layouts/Default'

// Components
import {
  HeroSection,
  CategoryNavigation,
  StoreList
} from '@components'

const Home: NextPage = () => {
  return (
    <DefaultLayout title="Início">
      <HeroSection />
      <CategoryNavigation />
      <StoreList />
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

export default Home
