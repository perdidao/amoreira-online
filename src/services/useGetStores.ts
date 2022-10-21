import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Store } from '@models/store'


const getStores = async (): Promise<Store[]> => {
  const {
    data
  } = await axios.get(`https://run.mocky.io/v3/8a3721ac-c265-4a81-9267-53c4e09ea469`)

  return data
}

export const useGetStores = (): UseQueryResult<Store[]> => {
  return useQuery<Store[]>(
    ['Store'],
    () => getStores(),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
