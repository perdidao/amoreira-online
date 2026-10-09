import type { NextApiRequest, NextApiResponse } from 'next'

import { allowOnlyGet, ApiError, parseSlug } from '@lib/http'
import { getStoreBySlug } from '@lib/stores'

// Types
import type { Store } from '@models/store'

export default function handler(req: NextApiRequest, res: NextApiResponse<Store | ApiError>) {
  if (!allowOnlyGet(req, res)) return

  const slug = parseSlug(req.query.slug)

  if (!slug) {
    return res.status(400).json({ error: 'Invalid slug' })
  }

  const store = getStoreBySlug(slug)

  if (!store) {
    return res.status(404).json({ error: 'Store not found' })
  }

  return res.status(200).json(store)
}
