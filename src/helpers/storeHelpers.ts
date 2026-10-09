export const storeStatusText = (isOpen: boolean): string => {
  return isOpen ? 'aberto' : 'fechado'
}

export const productPriceFormatter = (price: number | null): string => {
  if (price === null) return ''

  return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}
