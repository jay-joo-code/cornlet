import formatDate from 'src/util/helpers/formatDate'
import getNumericDate from './getNumericDate'

const getDateString = (listing, options = {}) => {
  const { start, end } = listing
  const { isNumeric } = options

  if (isNumeric) {
    return `${getNumericDate(start)} - ${getNumericDate(end)}`
  }

  const startYear =
    new Date(start).getFullYear() !== new Date(end).getFullYear()
      ? `, ${new Date(start).getFullYear()}`
      : ''
  return `${formatDate(new Date(start), true)}${startYear} - ${formatDate(
    new Date(end),
    true
  )}, ${new Date(end).getFullYear()}`
}

export default getDateString
