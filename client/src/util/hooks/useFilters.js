import getNumericDate from '../helpers/getNumericDate'
import useRouter from './useRouter'

const useFilters = () => {
  const router = useRouter()
  const { query, updateQuery } = router
  const { minToCampus, maxToCampus, minPrice, maxPrice, start, end } = query

  const filters = []

  const removeFilters = (removedFilters) => {
    const data = {}
    removedFilters.forEach((filter) => {
      data[filter] = undefined
    })
    updateQuery(data)
  }

  if (start) {
    const filter = {
      type: 'date',
      text: `Starts ${getNumericDate(start)}`,
      cb: () => removeFilters(['start']),
    }
    filters.push(filter)
  }

  if (end) {
    const filter = {
      type: 'date',
      text: `Ends ${getNumericDate(end)}`,
      cb: () => removeFilters(['end']),
    }
    filters.push(filter)
  }

  if (minToCampus && maxToCampus) {
    const filter = {
      type: 'distance',
      text: `From campus: ${minToCampus} mins - ${maxToCampus} mins`,
      cb: () => removeFilters(['minToCampus', 'maxToCampus']),
    }
    filters.push(filter)
  }

  if (minPrice && maxPrice) {
    const filter = {
      type: 'price',
      text: `Price: $${minPrice} - $${maxPrice}`,
      cb: () => removeFilters(['minPrice', 'maxPrice']),
    }
    filters.push(filter)
  }

  return filters
}

export default useFilters
