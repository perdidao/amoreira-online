import { CategoryNavigation } from '@components'
import { HeroSection } from '@components/HeroSection'
import { StoreList } from '@components/StoreList'
import { DefaultLayout } from '@layouts/Default'
import type { NextPage } from 'next'

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
