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
  } = await axios.get(`https://run.mocky.io/v3/e8cb9c93-d4a5-4718-b7bb-9341f6b359b9`)

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
