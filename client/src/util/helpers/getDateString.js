import formatDate from 'src/util/helpers/formatDate'

const getDateString = (listing, options = {}) => {
  const { start, end } = listing
  const { isNumeric } = options

  if (isNumeric) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return `${`${startDate.getMonth() + 1}/${startDate.getDate()}`} - ${`${
      endDate.getMonth() + 1
    }/${endDate.getDate()}`}, ${endDate.getFullYear()}`
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
