import React, { useState } from 'react'
import { ReactComponent as FilterRaw } from 'src/assets/svgs/filter.svg'
import Dropdown from 'src/components/views/Dropdown'
import useFilters from 'src/util/hooks/useFilters'
import styled from 'styled-components'
import FilterContents from './FilterContents'
import FilterStatus from './FilterStatus'

const Filters = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(true)
  }
  const filters = useFilters()

  return (
    <Container>
      <Row>
        <FilterBtn type='button' onClick={handleClick}>
          <FilterSVG />
          Filters
          {filters.length > 0 && <FilterCounter>{filters.length}</FilterCounter>}
        </FilterBtn>
        <FilterStatus />
      </Row>
      <Dropdown show={show} setShow={setShow} alignLeft>
        <FilterContents setShow={setShow} />
      </Dropdown>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  overflow: visible;
`

const Row = styled.div`
  padding: 0.2rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

const FilterBtn = styled.button`
  background: white;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.textLight};

  display: flex;
  align-items: center;
`

const FilterSVG = styled(FilterRaw)`
  height: 1.3rem;
  margin-right: 0.3rem;
  fill: ${(props) => props.theme.textLight};
`

const FilterCounter = styled.div`
  height: 1.3rem;
  width: 1.3rem;
  margin-left: 0.5rem;

  font-size: 0.8rem;
  font-weight: 500;

  border-radius: 50%;
  background: ${(props) => props.theme.brand500};
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 1.2rem;
    width: 1.2rem;
  }
`

export default Filters
