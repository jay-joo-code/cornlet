import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Container = styled.div`
  cursor: pointer;
  text-align: center;
  border: 1px solid ${(props) => (props.active ? theme.green : 'rgb(176, 176, 176)')};
  outline: currentcolor none medium;
  margin: 0 .2rem;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  color: ${(props) => (props.active ? theme.green : 'black')};
  position: relative;
  padding: .5rem 1rem;
  font-size: .6rem;
`;

const Btn = ({ children, active, ...rest }) => {
  const [highlight, setHighlight] = useState(false);
  useEffect(() => {
    if (active) setHighlight(true);
  }, [active]);
  return (
    <Container {...rest} active={highlight}>
      {children}
    </Container>
  );
};

export default Btn;
