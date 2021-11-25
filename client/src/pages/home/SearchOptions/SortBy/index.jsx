import React from 'react'
import styled from 'styled-components'
import Body from 'src/components/fonts/Body'
import Select from 'src/components/inputs/Select'
import useRouter from 'src/util/hooks/useRouter'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const SortBy = () => {
  const router = useRouter()
  const { query, updateQuery } = router

  const opts = [
    {
      value: 'recent',
      label: 'Recent',
    },
    {
      value: 'price-asc',
      label: 'Price: Low to High',
    },
    {
      value: 'price-dec',
      label: 'Price: High to Low',
    },
    {
      value: 'to-campus',
      label: 'Distance to Campus',
    },
  ]

  const handleChange = (e) => {
    updateQuery({ sort: e.target.value })
  }

  return (
    <Container>
      <Select opts={opts} value={query.sort || 'recent'} onChange={handleChange} />
    </Container>
  )
}

export default SortBy
