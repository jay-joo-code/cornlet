import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/fonts/Body';
import amenities from 'src/constants/amenities';
import AmenityGrp from 'src/components/displays/AmenityGrp';
import AmenitiesList from 'src/containers/AmenitiesList';

const Container = styled.div`

`;

const Amenities = ({ formik }) => {
  const toggle = (value) => {
    if (formik.values.amenities.includes(value)) {
      const newAmenities = [...formik.values.amenities];
      newAmenities.splice(formik.values.amenities.indexOf(value), 1);
      formik.setFieldValue('amenities', newAmenities);
    }
    else {
      formik.setFieldValue('amenities', [...formik.values.amenities, value]);
    }
  };

  return (
    <Container>
      <Body muted>Click on amenity icons to activate them</Body>
      <AmenitiesList>
        {amenities.map((amenity) => (
          <AmenityGrp
            key={amenity.value}
            icon={amenity.icon}
            label={amenity.label}
            active={formik.values.amenities.includes(amenity.value)}
            onClick={() => toggle(amenity.value)}
          />
        ))}
      </AmenitiesList>
    </Container>
  );
};

export default Amenities;
