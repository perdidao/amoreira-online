import categoriesData from '../data/categories.json'
import storesData from '../data/stores.json'

// Types
import type { Category } from '@models/category'
import type { Menu } from '@models/menu'
import type { Store } from '@models/store'

type StoreRecord = Omit<Store, 'isOpenToday'>
type CategoryRecord = Omit<Category, 'totalItems'>

interface StoreFilters {
  category?: string
}

const TIME_ZONE = 'America/Sao_Paulo'

const storeRecords: StoreRecord[] = storesData
const categoryRecords: CategoryRecord[] = categoriesData

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  timeZone: TIME_ZONE,
})

export const isOpenToday = (workdays: string[], now: Date = new Date()): boolean => {
  return workdays.includes(weekdayFormatter.format(now))
}

const normalizeMenus = (menus: Menu[]): Menu[] => {
  return [...menus]
    .sort((a, b) => a.priority - b.priority)
    .map((menu) => ({
      ...menu,
      items: menu.items.map((item) => ({
        ...item,
        discountPrice: item.discountPrice ? item.discountPrice : null,
      })),
    }))
}

const toStore = (record: StoreRecord, now: Date): Store => {
  const { menu, ...store } = record

  return {
    ...store,
    isOpenToday: isOpenToday(record.workdays, now),
    ...(menu ? { menu: normalizeMenus(menu) } : {}),
  }
}

export const getStores = (filters: StoreFilters = {}, now: Date = new Date()): Store[] => {
  const { category } = filters

  return storeRecords
    .filter((store) => !category || store.categories.includes(category))
    .map(({ menu, ...store }) => toStore(store, now))
}

export const getStoreBySlug = (slug: string, now: Date = new Date()): Store | null => {
  const record = storeRecords.find((store) => store.slug === slug)

  return record ? toStore(record, now) : null
}

const toCategory = (record: CategoryRecord): Category => ({
  ...record,
  totalItems: storeRecords.filter((store) => store.categories.includes(record.slug)).length,
})

export const getCategories = (): Category[] => {
  return categoryRecords.map(toCategory)
}

export const getCategoryBySlug = (slug: string): Category | null => {
  const record = categoryRecords.find((category) => category.slug === slug)

  return record ? toCategory(record) : null
}
