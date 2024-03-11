import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: .4rem .6rem;
  background-color: white;
  display: inline-block;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  font-size: .8rem;
  
  // color
  background-color: ${(props) => (props.inverted ? props.theme[props.color] : '')};
  color: ${(props) => props.theme[props.color]};
  
  // size: sm
  font-size: ${(props) => (props.size === 'sm' ? '.7rem' : '')};
  padding: ${(props) => (props.size === 'sm' ? '.3rem .5rem' : '')};
  
  // inverted
  color: ${(props) => (props.inverted ? 'white' : '')};
  background-color: ${(props) => (props.inverted ? props.theme[props.color] : '')};
`;

const Badge = ({
  children, color, inverted, size, ...rest
}) => (
  <Container
    color={color}
    inverted={inverted}
    size={size}
    {...rest}
  >
    {children}
  </Container>
);

export default Badge;
