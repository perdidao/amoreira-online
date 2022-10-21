import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Category } from '@models/categories'

const getCategories = async (): Promise<Category[]> => {
  const {
    data
  } = await axios.get(`https://run.mocky.io/v3/d900359e-2cf0-498b-b773-c895e2ad8227`)

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
