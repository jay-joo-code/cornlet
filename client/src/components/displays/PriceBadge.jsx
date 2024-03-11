import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 1rem;
  right: .5rem;

  background: ${(props) => props.theme.primary};
  color: white;
  border-radius: 8px;

  font-weight: 400;
  font-size: 1.1rem;
  padding: .3rem .7rem;

  // alignTop
  bottom: ${(props) => (props.alignTop ? 'initial' : '')};
  top: ${(props) => (props.alignTop ? '1rem' : '')};

  // alignLeft
  right: ${props => props.alignLeft ? 'initial': ''};
  left: ${props => props.alignLeft ? '1rem' : ''};

  // lg
  font-size: ${(props) => (props.lg ? '1.2rem' : '')};
  padding: ${(props) => (props.lg ? '.5rem 1rem' : '')};
  right: ${(props) => (props.lg ? '1rem' : '')};
`;

const PriceBadge = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default PriceBadge;
