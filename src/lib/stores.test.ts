import { describe, expect, it } from 'vitest'

import {
  getCategories,
  getCategoryBySlug,
  getStoreBySlug,
  getStores,
  isOpenToday,
} from './stores'

// 01:00 UTC on Saturday is still 22:00 on Friday in São Paulo
const fridayNightInSaoPaulo = new Date('2026-10-10T01:00:00Z')
const mondayNoon = new Date('2026-10-12T15:00:00Z')

describe('isOpenToday', () => {
  it('uses the São Paulo weekday, not the UTC one', () => {
    expect(isOpenToday(['Friday'], fridayNightInSaoPaulo)).toBe(true)
    expect(isOpenToday(['Saturday'], fridayNightInSaoPaulo)).toBe(false)
  })
})

describe('getStores', () => {
  it('lists every store without its menu', () => {
    const stores = getStores()

    expect(stores).toHaveLength(5)
    stores.forEach((store) => expect(store).not.toHaveProperty('menu'))
  })

  it('filters by category', () => {
    expect(getStores({ category: 'pizza' }).map((store) => store.slug)).toEqual([
      'pizzaria-forno-de-pedra',
    ])
    expect(getStores({ category: 'unknown' })).toEqual([])
  })

  it('computes whether each store is open', () => {
    const kmBurguer = getStores({}, mondayNoon).find((store) => store.slug === 'km-burguer')

    expect(kmBurguer?.isOpenToday).toBe(false)
  })
})

describe('getStoreBySlug', () => {
  it('returns null for an unknown slug', () => {
    expect(getStoreBySlug('unknown')).toBeNull()
  })

  it('sorts menus by priority', () => {
    const store = getStoreBySlug('km-burguer')

    expect(store?.menu?.map((menu) => menu.title)).toEqual(['Lanches', 'Porções', 'Bebidas'])
  })

  it('treats a zero discount price as no discount', () => {
    const items = getStoreBySlug('km-burguer')?.menu?.flatMap((menu) => menu.items) ?? []
    const discountOf = (name: string) => items.find((item) => item.name === name)?.discountPrice

    expect(discountOf('Suco natural')).toBeNull()
    expect(discountOf('X-Bacon')).toBe(25.9)
  })
})

describe('categories', () => {
  it('counts the stores in each category', () => {
    const totals = Object.fromEntries(
      getCategories().map((category) => [category.slug, category.totalItems])
    )

    expect(totals.bebidas).toBe(4)
    expect(totals.porcoes).toBe(2)
  })

  it('returns null for an unknown category', () => {
    expect(getCategoryBySlug('unknown')).toBeNull()
    expect(getCategoryBySlug('pizza')?.totalItems).toBe(1)
  })
})
