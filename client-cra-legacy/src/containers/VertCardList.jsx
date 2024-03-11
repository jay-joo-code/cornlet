import React from 'react'
import styled from 'styled-components'

const VertCardList = ({ children, listings, ...rest }) => (
  <Wrapper {...rest}>
    <Container>{children}</Container>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  @media (min-width: ${(props) => props.theme.md}px) {
    width: ${(props) => `${props.theme.md}px`};
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    & > div {
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }

    & > div:nth-child(odd) {
      padding-left: 0;
    }

    & > div:nth-child(even) {
      padding-right: 0;
    }
  }
`

export default VertCardList
