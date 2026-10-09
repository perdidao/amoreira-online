import type { NextApiRequest, NextApiResponse } from 'next'

import { allowOnlyGet, ApiError, parseSlug } from '@lib/http'
import { getCategoryBySlug } from '@lib/stores'

// Types
import type { Category } from '@models/category'

export default function handler(req: NextApiRequest, res: NextApiResponse<Category | ApiError>) {
  if (!allowOnlyGet(req, res)) return

  const slug = parseSlug(req.query.slug)

  if (!slug) {
    return res.status(400).json({ error: 'Invalid slug' })
  }

  const category = getCategoryBySlug(slug)

  if (!category) {
    return res.status(404).json({ error: 'Category not found' })
  }

  return res.status(200).json(category)
}
