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
  } = await axios.get(`https://run.mocky.io/v3/5b06bf91-4ffe-46d2-b03d-6c0415986f8d`)

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
