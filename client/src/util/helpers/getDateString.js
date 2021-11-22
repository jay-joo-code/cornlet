import formatDate from 'src/util/helpers/formatDate'

const numericDate = (dateString) => {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()
  const monthString = month.length === 1 ? `0${month}` : month
  const dayString = day.length === 1 ? `0${day}` : day
  return `${monthString}/${dayString}/${date.getFullYear()}`
}

const getDateString = (listing, options = {}) => {
  const { start, end } = listing
  const { isNumeric } = options

  if (isNumeric) {
    return `${numericDate(start)} - ${numericDate(end)}`
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
