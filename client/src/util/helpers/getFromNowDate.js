import moment from 'moment'
import formatDate from './formatDate'

const getFromNowDate = (date, options = {}) => {
  const { isUpdateString } = options
  const daysSince = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
  let dateString = daysSince > 3 ? formatDate(date, true) : moment(new Date(date)).fromNow()

  if (isUpdateString && daysSince > 3) {
    dateString = 'Updated ' + dateString
  }

  return dateString || ''
}

export default getFromNowDate
