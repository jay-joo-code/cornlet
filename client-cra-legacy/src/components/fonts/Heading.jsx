import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h2`
  opacity: .9;
  font-size: 1.5rem;
  font-weight: bold;
  color: '#3B454E';
`;

const Heading = ({ children, ...rest }) => (
  <StyledHeading {...rest}>
    {children}
  </StyledHeading>
);

export default Heading;
