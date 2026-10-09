import type { NextApiRequest, NextApiResponse } from 'next'

const SLUG_PATTERN = /^[a-z0-9-]{1,100}$/

export interface ApiError {
  error: string
}

export const parseSlug = (value: unknown): string | null => {
  return typeof value === 'string' && SLUG_PATTERN.test(value) ? value : null
}

export const allowOnlyGet = (req: NextApiRequest, res: NextApiResponse<ApiError>): boolean => {
  if (req.method === 'GET') return true

  res.setHeader('Allow', 'GET')
  res.status(405).json({ error: 'Method not allowed' })

  return false
}
