import type { Menu } from "./menu"

export interface Store {
  id: string
  title: string
  logo: string
  banner?: string
  slug: string
  phone: string
  whatsapp: string
  workdays: string[]
  categories: number[]
  menu?: Menu;
}
