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
  } = await axios.get('/api/categories')

  return data
}

export const useGetCategories = (): UseQueryResult<Category[]> => {
  return useQuery<Category[]>(
    ['categories'],
    () => getCategories(),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
