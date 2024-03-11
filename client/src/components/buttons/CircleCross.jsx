import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CrossRaw } from 'src/assets/svgs/close.svg';

const Container = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  cursor: pointer;
  
  width: 24px;
  height: 24px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  flex-grow: 0;
  flex-shrink: 0;
`;

const Cross = styled(CrossRaw)`
  height: 10px;
  width: 10px;
  opacity: .6;
  
  &:hover {
    opacity: .9;
  }
`;

const CircleCross = (props) => (
  <Container {...props}>
    <Cross />
  </Container>
);

export default CircleCross;
