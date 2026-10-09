import { describe, expect, it } from 'vitest'

import listStores from '../../src/pages/api/stores/index'
import getStore from '../../src/pages/api/stores/[slug]'
import { callHandler } from './callHandler'

describe('GET /api/stores', () => {
  it('lists stores filtered by category', async () => {
    const res = await callHandler(listStores, { query: { category: 'sorvetes' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([{ slug: 'sorveteria-gelato-bom' }])
  })

  it.each([
    ['an array', ['pizza', 'bebidas']],
    ['unexpected characters', '../pizza'],
    ['an empty value', ''],
  ])('rejects a category that is %s', async (_, category) => {
    const res = await callHandler(listStores, { query: { category } })

    expect(res.statusCode).toBe(400)
  })

  it('only allows GET', async () => {
    const res = await callHandler(listStores, { method: 'POST' })

    expect(res.statusCode).toBe(405)
    expect(res.headers.Allow).toBe('GET')
  })
})

describe('GET /api/stores/[slug]', () => {
  it('returns the store with its menu', async () => {
    const res = await callHandler(getStore, { query: { slug: 'bar-do-ze' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ slug: 'bar-do-ze', isOpenToday: expect.any(Boolean) })
    expect(res.body).toHaveProperty('menu')
  })

  it('returns 404 for an unknown store', async () => {
    const res = await callHandler(getStore, { query: { slug: 'unknown' } })

    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ error: 'Store not found' })
  })

  it('returns 400 for an invalid slug', async () => {
    const res = await callHandler(getStore, { query: { slug: 'Bar Do Zé' } })

    expect(res.statusCode).toBe(400)
  })
})
