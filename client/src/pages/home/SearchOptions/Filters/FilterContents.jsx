import React from 'react'
import styled from 'styled-components'
import Body from 'src/components/fonts/Body'
import DateFilter from 'src/components/filters/DateFilter'
import SliderFilter from 'src/components/filters/SliderFilter'
import { FlexRow } from 'src/components/layouts/Flex'
import theme from 'src/theme'
import Space from 'src/components/layouts/Space'
import Btn from 'src/components/buttons/Btn'
import TextBtn from 'src/components/buttons/TextBtn'
import useRouter from 'src/hooks/useRouter'
import Text from 'src/components/fonts/Text'

const FilterContents = ({ setShow }) => {
  const router = useRouter()

  const clearFilters = () => {
    router.updateQuery({}, true)
    setShow(false)
  }

  return (
    <Container>
      <Text variant='h5' fontWeight={500}>
        Date
      </Text>
      <Space margin='1rem 0' />
      <Row>
        <DateFilter name='start' placeholder='Start' />
        <Body>to</Body>
        <DateFilter name='end' placeholder='End' />
      </Row>
      <Space margin='2.5rem 0' />
      <Text variant='h5' fontWeight={500}>
        Price
      </Text>
      <SliderFilter
        startName='minPrice'
        endName='maxPrice'
        max={2000}
        step={50}
        startLabel='$0'
        endLabel='$2000'
      />
      <Space margin='2rem 0' />
      <Text variant='h5' fontWeight={500}>
        Minutes from campus
      </Text>
      <SliderFilter
        startName='minToCampus'
        endName='maxToCampus'
        max={30}
        step={2}
        startLabel='0 mins'
        endLabel='30 mins'
      />
      <Space margin='2rem 0' />
      <FlexRow alignCenter justifyEnd>
        <TextBtn colorHex={theme.grey[600]} onClick={clearFilters}>
          Clear
        </TextBtn>
        <Space margin='0 .5rem' />
        <Btn onClick={() => setShow(false)}>Apply filters</Btn>
      </FlexRow>
    </Container>
  )
}

const Container = styled.div`
  width: 300px;
  padding: 1.5rem 1rem;

  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 350px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 0.5rem;
  }
`

export default FilterContents
