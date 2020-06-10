import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FilterRaw } from 'src/assets/svgs/filter.svg';
import Dropdown from 'src/components/views/Dropdown';
import FilterContents from './FilterContents';
import useIsDesktop from 'src/util/hooks/useIsDesktop';

const Container = styled.div`
  margin: 2rem 0 4rem 0;
  position: relative;
`;

const FilterBtn = styled.button`
  background: white;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
  border-radius: 4px;
  padding: .5rem 1rem;

  display: flex;
  align-items: center;
`

const FilterSVG = styled(FilterRaw)`
  height: 16px;
  width: 16px;
  margin-right: .5rem;
`

const Filters = () => {
  const [show, setShow] = useState(false);
  const isDesktop = useIsDesktop();
  const handleClick = () => {
    if (!isDesktop) window.scrollTo(0, 0);
    setShow(true);
  }

  return (
    <Container>
      <FilterBtn type='button' onClick={handleClick}>
        <FilterSVG /> Filters
      </FilterBtn>
      <Dropdown
        show={show}
        setShow={setShow}
        alignLeft
      > 
        <FilterContents />
      </Dropdown>
    </Container>
  )
};


/*
const Container = styled.div`
  margin: 2rem 0 4rem 0;
  display: flex;
  align-items: center;
  
  & > div, p {
    margin-right: .8rem;
  }
`;

<Container>
    <DateFilter
      name="start"
      placeholder="Start"
    />
    <DateFilter
      name="end"
      placeholder="End"
    />
    <Sort />
    <ClearFilters />
  </Container>
*/

export default Filters;
