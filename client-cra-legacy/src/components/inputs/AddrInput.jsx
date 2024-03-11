import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import useScript from 'src/util/hooks/useScript'
import Input from 'src/components/inputs/Input'
import styled from 'styled-components'
import calcDistance from 'src/util/helpers/calcDistance'
import log from 'src/util/log'
import LoadingDots from '../displays/LoadingDots'
import Dropdown from '../views/Dropdown'
import Body from '../fonts/Body'
import ErrMsg from '../fonts/ErrMsg'
import ListingLocation from '../displays/ListingLocation'

const AddrInput = ({ formik, name, label }) => {
  const [loaded, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&libraries=places`
  )

  const handleChange = (address) => {
    formik.setFieldValue(name, address)
    formik.setFieldTouched('toCampus', true)

    // reset values on addr change
    const { lat, lng, toCampus } = formik.values
    if (lat !== '') formik.setFieldValue('lat', '')
    if (lng !== '') formik.setFieldValue('lng', '')
    if (toCampus !== '') formik.setFieldValue('toCampus', '')
  }

  const handleSelect = (address) => {
    handleChange(address)
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const minDistance = Math.min(
          calcDistance(42.443147, -76.485249, latLng.lat, latLng.lng), // collegetown
          calcDistance(42.447549, -76.487739, latLng.lat, latLng.lng), // west
          calcDistance(42.451288, -76.482072, latLng.lat, latLng.lng) // north
        )
        formik.setFieldValue('toCampus', Math.round(minDistance * 10) / 10)
        formik.setFieldValue('lat', latLng.lat)
        formik.setFieldValue('lng', latLng.lng)
      })
      .catch((e) => log('AddrInput', e))
  }

  if (!loaded || error) return <div />

  return (
    <PlacesAutocomplete value={formik.values[name]} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Container>
          <Input
            formik={formik}
            name={name}
            label={label}
            {...getInputProps({})}
            autoComplete='off'
          />
          <ListingLocation
            lat={formik.values.lat}
            lng={formik.values.lng}
            toCampus={formik.values.toCampus}
          />
          <ErrMsg formik={formik} name='toCampus' />
          <DropdownContainer>
            <Dropdown
              show={suggestions.length}
              setShow={(bool) => {
                if (!bool) suggestions = []
              }}
              alignLeft
              alignTop>
              <DropdownContent>
                {loading ? (
                  <LoadingDots />
                ) : (
                  suggestions.map((suggestion) => (
                    <Suggestion
                      key={suggestion.description}
                      {...getSuggestionItemProps(suggestion)}
                      active={suggestion.active}>
                      <Body ellipsis>{suggestion.description}</Body>
                    </Suggestion>
                  ))
                )}
              </DropdownContent>
            </Dropdown>
          </DropdownContainer>
        </Container>
      )}
    </PlacesAutocomplete>
  )
}

const Container = styled.div`
  width: 100%;
`

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 6px;
`

const DropdownContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const Suggestion = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  // active
  background: ${(props) => (props.active ? 'rgba(0, 0, 0, .1)' : '')};
`

export default AddrInput
