import React from 'react'
import { Circle, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import { compose, withProps } from 'recompose'
import theme from 'src/theme'
import useIsMobile from 'src/util/hooks/useIsMobile'
import Body from '../fonts/Body'
import { FlexColumn } from '../layouts/Flex'
import Space from '../layouts/Space'

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${import.meta.env.VITE_MAP_KEY}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ lat, lng }) => {
  const isMobile = useIsMobile()

  return (
    <FlexColumn>
      <GoogleMap
        defaultZoom={isMobile ? 15 : 16}
        defaultCenter={{ lat, lng }}
        options={{ mapTypeControl: false, streetViewControl: false, gestureHandling: 'greedy' }}>
        <Circle
          defaultCenter={{
            lat: lat,
            lng: lng,
          }}
          radius={120}
          options={{
            strokeColor: theme.brand300,
            fillColor: theme.brand100,
          }}
        />
      </GoogleMap>
    </FlexColumn>
  )
})

const Map = ({ lat, lng }) => (
  <FlexColumn alignCenter>
    <MapComponent lat={lat} lng={lng} />
    <Space margin='.3rem 0' />
    <div>
      <Body muted sm style={{ marginLeft: '.5rem' }}>
        The exact location will be provided once you message the host
      </Body>
    </div>
  </FlexColumn>
)

export default Map
