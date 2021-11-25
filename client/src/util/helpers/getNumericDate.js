const getNumericDate = (dateString) => {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()
  const monthString = month.length === 1 ? `0${month}` : month
  const dayString = day.length === 1 ? `0${day}` : day
  return `${date.getFullYear()}/${monthString}/${dayString}`
}

export default getNumericDate
