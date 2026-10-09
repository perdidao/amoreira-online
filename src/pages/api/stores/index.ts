import type { NextApiRequest, NextApiResponse } from 'next'

import { allowOnlyGet, ApiError, parseSlug } from '@lib/http'
import { getStores } from '@lib/stores'

// Types
import type { Store } from '@models/store'

export default function handler(req: NextApiRequest, res: NextApiResponse<Store[] | ApiError>) {
  if (!allowOnlyGet(req, res)) return

  const { category } = req.query

  if (category === undefined) {
    return res.status(200).json(getStores())
  }

  const categorySlug = parseSlug(category)

  if (!categorySlug) {
    return res.status(400).json({ error: 'Invalid category' })
  }

  return res.status(200).json(getStores({ category: categorySlug }))
}
