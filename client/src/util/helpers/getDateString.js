import formatDate from 'src/util/helpers/formatDate'
import getNumericDate from './getNumericDate'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getDateString = (listing, options = {}) => {
  const { start, end } = listing
  const { isNumeric, isAbbrev } = options

  if (isNumeric) {
    return `${getNumericDate(start)} - ${getNumericDate(end)}`
  } else if (isAbbrev) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const endYearString =
      endDate.getFullYear() !== new Date().getFullYear() ? `, ${endDate.getFullYear()}` : ''
    return `${months[startDate.getMonth()]} ${startDate.getDate()} - ${
      months[endDate.getMonth()]
    } ${endDate.getDate()}${endYearString}`
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
