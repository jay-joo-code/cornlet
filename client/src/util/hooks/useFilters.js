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
      text: `Starts ${getNumericDate(start)}`,
      cb: () => removeFilters(['start']),
    }
    filters.push(filter)
  }

  if (end) {
    const filter = {
      text: `Ends ${getNumericDate(end)}`,
      cb: () => removeFilters(['end']),
    }
    filters.push(filter)
  }

  if (minToCampus && maxToCampus) {
    const filter = {
      text: `Distance: ${minToCampus} km - ${maxToCampus} km`,
      cb: () => removeFilters(['minToCampus', 'maxToCampus']),
    }
    filters.push(filter)
  }

  if (minPrice && maxPrice) {
    const filter = {
      text: `Price: $${minPrice} - $${maxPrice}`,
      cb: () => removeFilters(['minPrice', 'maxPrice']),
    }
    filters.push(filter)
  }

  return filters
}

export default useFilters
