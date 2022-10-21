import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Store } from '@models/store'


const getStore = async (): Promise<Store> => {
  const {
    data
  } = await axios.get(`https://run.mocky.io/v3/2067d46a-e3b3-4eef-ad33-1f80d43297b9`)

  return data
}

export const useGetStore = (): UseQueryResult<Store> => {
  return useQuery<Store>(
    ['Store'],
    () => getStore(),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
