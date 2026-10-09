import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Store } from '@models/store'


const getStore = async (slug: string): Promise<Store> => {
  const {
    data
  } = await axios.get(`/api/stores/${encodeURIComponent(slug)}`)

  return data
}

export const useGetStore = (slug: string): UseQueryResult<Store> => {
  return useQuery<Store>(
    ['store', slug],
    () => getStore(slug),
    {
      enabled: !!slug,
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
