import type { NextApiRequest, NextApiResponse } from 'next'

import { allowOnlyGet, ApiError } from '@lib/http'
import { getCategories } from '@lib/stores'

// Types
import type { Category } from '@models/category'

export default function handler(req: NextApiRequest, res: NextApiResponse<Category[] | ApiError>) {
  if (!allowOnlyGet(req, res)) return

  return res.status(200).json(getCategories())
}
