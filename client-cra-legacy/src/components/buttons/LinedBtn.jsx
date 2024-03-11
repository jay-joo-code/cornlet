import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 8px;
  border: solid 1px #a8a29b;
  background: none;
  color: #808d87;
  padding: .8rem 1rem;
`;

const OutlinedButton = (props) => (
  <Button {...props}>
    {props.children}
  </Button>
);

export default OutlinedButton;
