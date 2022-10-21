import Moment from 'moment'

export const isStoreOpenToday = (workdays: string[]): boolean => {
  const day = Moment().format('dddd')

  return workdays.includes(day)
}

export const storeStatusText = (workdays: string[]): string => {
  const day = Moment().format('dddd')

  if (workdays.includes(day)) {
    return 'aberto'
  }

  return 'fechado'
}

export const productPriceFormatter = (price: number | null): string => {
  if (price === null) return ''

  return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}
