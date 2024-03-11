import React from 'react';
import styled from 'styled-components';
import Body from '../fonts/Body';
import { Link } from 'react-router-dom';

const PolicyDisclaimer = ({ action, ...rest}) => {
  return (
    <Container>
      <div>
      <StyledBody muted>By {action || 'using Cornlet'}, you agree to its</StyledBody>
      <StyledBody><StyledLink to='/terms-conditions'>Terms of Service</StyledLink> and <StyledLink to='/privacy-policy'>Privacy Policy</StyledLink></StyledBody>
      </div>
    </Container>
  )
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & p {
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const StyledBody = styled(Body)`
  font-size: .8rem;
`;

export default PolicyDisclaimer;
