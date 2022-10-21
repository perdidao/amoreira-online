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
  } = await axios.get(`https://run.mocky.io/v3/2baf33bf-e5d0-4293-9429-81dd3d9c1645`)

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
