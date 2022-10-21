import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Category } from '@models/category'

const getCategories = async (): Promise<Category[]> => {
  const {
    data
  } = await axios.get(`https://run.mocky.io/v3/3a62cfc3-7db9-4857-acc0-7823cf3b82f1`)

  return data
}

export const useGetCategories = (): UseQueryResult<Category[]> => {
  return useQuery<Category[]>(
    ['Categories'],
    () => getCategories(),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
