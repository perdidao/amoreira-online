import React from 'react'

// i18n
// import { useTranslations } from 'next-intl'

// Helpers

// Components

// Assets
import Image from 'next/future/image'

// Env

// Types
import { HeroSectionProps as Props } from './HeroSection.types'

// Styles
import * as Styled from './HeroSection.styles'

const HeroSection = (props: Props): JSX.Element => {
  const {
    title
  } = props

  // const t = useTranslations()

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.HeroTitle>
          Encontre <strong>tudo</strong> o que tem pra comer aqui
        </Styled.HeroTitle>
        <Styled.HeroText>
          Navegue pelos cardápios, saiba se o bar, lanchonete, petiscaria,
          pizzaria ou restaurante está atendendo e entre em contato
        </Styled.HeroText>
      </Styled.Content>
      <Image
        src="/assets/images/hero-illustration.svg"
        alt="Imagem que ilustra uma mulher indecisa sobre o que comer, mostrando várias opções. Entre elas, um hamburguer, salada, sucos, peixe, donut, sanduíche e maçã."
        width="540"
        height="540"
      />
    </Styled.Container>
  )
}

export default HeroSection
