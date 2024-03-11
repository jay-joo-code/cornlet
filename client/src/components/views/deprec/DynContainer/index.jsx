import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 90%;
  
  @media (min-width: ${(props) => props.theme.md}px) {
    width: 70%;
  }
`;

const DynContainer = ({ children, ...rest }) => (
  <Wrapper>
    <Container {...rest}>
      {children}
    </Container>
  </Wrapper>
);

export default DynContainer;
