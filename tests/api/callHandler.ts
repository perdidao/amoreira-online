import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

interface FakeRequest {
  method?: string
  query?: NextApiRequest['query']
}

export interface FakeResponse {
  statusCode: number
  headers: Record<string, unknown>
  body: unknown
}

export const callHandler = async (
  handler: NextApiHandler,
  { method = 'GET', query = {} }: FakeRequest = {}
): Promise<FakeResponse> => {
  const result: FakeResponse = { statusCode: 200, headers: {}, body: undefined }

  const res = {
    status(code: number) {
      result.statusCode = code
      return res
    },
    json(body: unknown) {
      result.body = body
      return res
    },
    setHeader(name: string, value: unknown) {
      result.headers[name] = value
      return res
    },
  }

  await handler({ method, query } as NextApiRequest, res as unknown as NextApiResponse)

  return result
}
