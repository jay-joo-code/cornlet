import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 50%;
  cursor: pointer;
  padding: .2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${(props) => props.theme.md}px) {
    &:hover {
      background: rgba(0, 0, 0, .05);
    }
  }

  // padding
  padding: ${props => props.padding && props.padding};
`;

const IconContainer = ({ children, padding }) => {
  return (
    <Container padding={padding}>
      {children}
    </Container>
  )
}

export default IconContainer
