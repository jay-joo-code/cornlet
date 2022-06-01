import React from 'react'
import styled from 'styled-components'
import useRouter from 'src/hooks/useRouter'

const Container = styled.div``

const SortBadge = styled.div`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  background-color: white;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.md}px) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  // default
  width: 3.5rem;
  background-color: inherit;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.2);

  // value set
  width: ${(props) => (props.value ? 'auto' : '')};
  background-color: ${(props) => (props.value ? props.theme.primary : '')};
  color: ${(props) => (props.value ? 'white' : '')};
  border: ${(props) => (props.value ? 'none' : '')};
`

const Sort = () => {
  const router = useRouter()
  const sortOpts = ['recent', 'price-asc', 'price-desc']

  const handleClick = () => {
    const currentI = sortOpts.indexOf(router.query.sort)
    const newI = currentI < 0 ? 1 : (currentI + 1) % sortOpts.length
    router.updateQuery({ sort: sortOpts[newI] })
  }

  const stateToString = {
    recent: 'Recent',
    'price-asc': 'Price: Ascending',
    'price-desc': 'Price: Descending',
  }

  return (
    <Container>
      <SortBadge onClick={handleClick} value={router.query.sort}>
        {router.query.sort ? `${stateToString[router.query.sort]}` : 'Sort'}
      </SortBadge>
    </Container>
  )
}

export default Sort
