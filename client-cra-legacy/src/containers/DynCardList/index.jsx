import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 1565px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    & > div {
      padding-left: .5rem !important;
      padding-right: .5rem !important;
    }

    & > div:nth-child(odd) {
      padding-left: 0;
    }

    & > div:nth-child(even) {
      padding-right: 0;
    }
  }
`;

const DynCardList = ({ children, listings, ...rest }) => (
  <Wrapper {...rest}>
    <Container>
      {children}
      <div style={{ width: '43vw' }} />
    </Container>
  </Wrapper>
);

export default DynCardList;
