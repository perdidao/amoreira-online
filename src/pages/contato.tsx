// Next
import type { NextPage } from 'next'

// Layout
import { DefaultLayout } from '@layouts/Default'

const ContactPage: NextPage = () => {
  return (
    <DefaultLayout title="Contato">
      Bem-vindo à página de contato
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

export default ContactPage
