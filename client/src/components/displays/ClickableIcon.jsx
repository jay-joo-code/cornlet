import React from 'react'
import styled from 'styled-components'

const ClickableIcon = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  border-radius: 50%;
  background: ${(props) => props.theme.grey[100]};
  height: 42px;
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }

  &:hover {
    background: ${(props) => props.theme.grey[300]};
  }
`

export default ClickableIcon
