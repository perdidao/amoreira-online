import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Store } from '@models/store'


const getStores = async (categorySlug?: string): Promise<Store[]> => {
  const {
    data
  } = await axios.get('/api/stores', {
    params: categorySlug ? { category: categorySlug } : {}
  })

  return data
}

export const useGetStores = (categorySlug?: string): UseQueryResult<Store[]> => {
  return useQuery<Store[]>(
    ['stores', categorySlug ?? 'all'],
    () => getStores(categorySlug),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
