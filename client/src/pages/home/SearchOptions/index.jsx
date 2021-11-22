import React from 'react'
import styled from 'styled-components'
import SortBy from './SortBy'
import Filters from './Filters'

const SearchOptions = () => {
  return (
    <Wrapper>
      <Container>
        <Filters />
        <SortBy />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > div {
    margin: 0 !important;
  }

  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 0 1rem;
    width: ${(props) => `${props.theme.md}px`};
  }
`

export default SearchOptions
