import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Category } from '@models/category'

const getCategory = async (slug: string): Promise<Category> => {
  const {
    data
  } = await axios.get(`/api/categories/${encodeURIComponent(slug)}`)

  return data
}

export const useGetCategory = (slug: string): UseQueryResult<Category> => {
  return useQuery<Category>(
    ['category', slug],
    () => getCategory(slug),
    {
      enabled: !!slug,
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
