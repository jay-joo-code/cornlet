import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import useScript from 'src/util/hooks/useScript';
import Input from 'src/components/inputs/Input';
import styled from 'styled-components';
import LoadingDots from '../displays/LoadingDots';
import Dropdown from '../views/Dropdown';
import calcDistance from 'src/util/helpers/calcDistance';
import Body from '../fonts/Body';

export const Container = styled.div`
  width: 100%;
`;

export const DropdownContainer = styled.div`
  position: relative;
  margin-top: 4px;
`;

export const Suggestion = styled.div`
  padding: .5rem 1rem;
  cursor: pointer;

  // active
  background: ${props => props.active ? 'rgba(0, 0, 0, .1)' : ''};
`;
 
const AddrInput = ({ formik, name, label }) => { 
  const [loaded, error] = useScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBNzB0_auwxJb4jpXqMWz2Hc2aOxcs21vw&libraries=places");
  
  const handleChange = address => {
    formik.setFieldValue(name, address);
  };
 
  const handleSelect = address => {
    handleChange(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const minDistance = Math.min(calcDistance(42.443147, -76.485249, latLng.lat, latLng.lng), calcDistance(42.447549, -76.487739, latLng.lat, latLng.lng))
        formik.setFieldValue('toCampus', Math.round(minDistance * 10) / 10);
        formik.setFieldValue('lat', latLng.lat);
        formik.setFieldValue('lng', latLng.lng);
      })
      .catch(error => console.error('Error', error));
  };

  if (!loaded || error) return <div />;
 
  return (
    <PlacesAutocomplete
      value={formik.values[name]}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Container>
          <Input
            formik={formik}
            name={name}
            label={label}
            {...getInputProps({})}
          />
          {formik.values.toCampus && <Body muted>{formik.values.toCampus} km to campus</Body>}
          <DropdownContainer>
            <Dropdown 
              show={suggestions.length}
              setShow={(bool) => {if (!bool) suggestions = []}}
              alignLeft
              alignTop
            >
              {loading && <LoadingDots />}
              {suggestions.map(suggestion => (
                  <Suggestion
                    {...getSuggestionItemProps(suggestion)}
                    active={suggestion.active}
                  >
                    <span>{suggestion.description}</span>
                  </Suggestion>
              ))}
            </Dropdown>
          </DropdownContainer>
        </Container>
      )}
    </PlacesAutocomplete>
  );
}

export default AddrInput;