import theme from 'src/theme'
import calcDistance from './calcDistance'

const regions = {
  north: {
    lat: 42.451288,
    lng: -76.482072,
    label: 'North campus',
    color: theme.north,
    background: theme.northBg,
  },
  west: {
    lat: 42.447549,
    lng: -76.487739,
    label: 'West campus',
    color: theme.west,
    background: theme.westBg,
  },
  collegetown: {
    lat: 42.443147,
    lng: -76.485249,
    label: 'Collegetown',
    color: theme.collegetown,
    background: theme.collegetownBg,
  },
}

const getRegion = ({ lat, lng }) => {
  let minDistance = null
  let closestRegion = null

  Object.values(regions).forEach((region) => {
    const distanceFromRegion = Math.abs(calcDistance(lat, lng, region.lat, region.lng))
    if (!minDistance) {
      minDistance = distanceFromRegion
      closestRegion = region
    } else {
      if (distanceFromRegion < minDistance) {
        minDistance = distanceFromRegion
        closestRegion = region
      }
    }
  })

  return closestRegion
}

export default getRegion
