import axios from 'axios'

import {
  useQuery,
  UseQueryResult
} from 'react-query'

// TYPES
import { Category } from '@models/category'

const getCategory = async (): Promise<Category> => {
  const {
    data
  } = await axios.get(`https://run.mocky.io/v3/9dd605c2-c2bb-4f21-8b33-d46223ebeede`)

  return data
}

export const useGetCategory = (): UseQueryResult<Category> => {
  return useQuery<Category>(
    ['Category'],
    () => getCategory(),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  )
}
