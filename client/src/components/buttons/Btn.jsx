import React from 'react'
import styled from 'styled-components'

const Btn = ({ children, color, inverted, type, ...rest }) => (
  <Button color={color} inverted={inverted} type={type || 'button'} {...rest}>
    {children}
  </Button>
)

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.9rem;

  font-size: 0.9rem;
  font-weight: 400;

  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background: ${(props) => props.theme.brand};
  color: white;

  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 0.5rem 0.8rem;
  }

  // fullWidth
  width: ${(props) => props.fullWidth && '100%'};

  // background
  background: ${(props) => props.background && props.background};

  // disabled
  background: ${(props) => props.disabled && props.theme.grey[400]};
`

export default Btn
