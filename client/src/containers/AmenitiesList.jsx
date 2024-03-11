import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 370px;
`;

const AmenitiesList = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default AmenitiesList;
