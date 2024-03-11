import moment from 'moment'

const formatDate = (date, isText) => {
  const d = new Date(date)
  if (isText) {
    return moment(d).format('MMM D')
  }
  const dateString = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  return dateString
}

export default formatDate
