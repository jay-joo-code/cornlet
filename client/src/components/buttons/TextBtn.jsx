import React from 'react'
import styled from 'styled-components'

const TextBtn = ({ children, ...rest }) => {
  return <StyledTextBtn {...rest}>{children}</StyledTextBtn>
}

const StyledTextBtn = styled.button`
  font-weight: 500;
  font-size: 0.9rem;

  color: ${(props) => props.theme.brand.gradient};
  background: ${(props) => props.theme.brand[25]};

  padding: 0.6rem 0.9rem;
  border-radius: 8px;

  // colorHex
  color: ${(props) => props.colorHex && props.colorHex};

  @media (min-width: ${(props) => props.theme.md}px) {
    &:hover {
      background: ${(props) => props.theme.brand[50]};
    }
  }
`

export default TextBtn
