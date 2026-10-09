import { describe, expect, it } from 'vitest'

import listCategories from '../../src/pages/api/categories/index'
import getCategory from '../../src/pages/api/categories/[slug]'
import { callHandler } from './callHandler'

describe('GET /api/categories', () => {
  it('lists categories with their store counts', async () => {
    const res = await callHandler(listCategories)

    expect(res.statusCode).toBe(200)
    expect(res.body).toContainEqual(expect.objectContaining({ slug: 'pizza', totalItems: 1 }))
  })

  it('only allows GET', async () => {
    const res = await callHandler(listCategories, { method: 'DELETE' })

    expect(res.statusCode).toBe(405)
  })
})

describe('GET /api/categories/[slug]', () => {
  it('returns the category', async () => {
    const res = await callHandler(getCategory, { query: { slug: 'pizza' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ slug: 'pizza', title: 'Pizza' })
  })

  it('returns 404 for an unknown category', async () => {
    const res = await callHandler(getCategory, { query: { slug: 'unknown' } })

    expect(res.statusCode).toBe(404)
  })

  it('returns 400 for an array slug', async () => {
    const res = await callHandler(getCategory, { query: { slug: ['pizza'] } })

    expect(res.statusCode).toBe(400)
  })
})
