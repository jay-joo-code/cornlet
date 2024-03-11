import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 1.7rem;
  width: 1.7rem;
  font-size: 1rem;

  border-radius: 50%;
  background: ${props => props.theme.primary};
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  // sm
  height: ${props => props.sm && '1.2rem'};
  width: ${props => props.sm && '1.2rem'};
  font-size: ${props => props.sm && '.7rem'};
`;

const NotifCounter = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
};

export default NotifCounter;
