// Next
import type { NextPage } from 'next'

// Layout
import { DefaultLayout } from '@layouts/Default'

// Components
import {
  StoreList,
  CategoryNavigation
} from '@components'

const StoresPage: NextPage = () => {
  return (
    <DefaultLayout title="Lojas">
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

export default StoresPage
