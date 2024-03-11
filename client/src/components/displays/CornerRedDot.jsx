import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: -2px;
  right: -1px;
  background: ${(props) => props.theme.danger};
  border-radius: 50%;
  padding: 4px;
  border: 2px solid white;
  z-index: 10;

  // lg
  padding: ${(props) => (props.lg ? '6px' : '')};
`;

const CornerRedDot = (props) => <Container {...props} />;

export default CornerRedDot;
