import moment from 'moment'
import formatDate from './formatDate'

const getFromNowDate = (date) => {
  const daysSince = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
  const dateString = daysSince > 3 ? formatDate(date, true) : moment(new Date(date)).fromNow()
  return dateString || ''
}

export default getFromNowDate
