import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.md}px) {
    //justify-content: flex-start;
  }
`;

const DynCardList = ({ children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Container>
        {children}
      </Container>
    </Wrapper>
  )
};

export default DynCardList;
