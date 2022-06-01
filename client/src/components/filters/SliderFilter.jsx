import React, { useEffect } from 'react'
import styled from 'styled-components'
import useRouter from 'src/hooks/useRouter'
import Slider from '@material-ui/core/Slider'
import { FlexRow } from '../layouts/Flex'
import Text from '../fonts/Text'

const SliderFilter = ({ startName, endName, max, step, startLabel, endLabel }) => {
  const router = useRouter()
  const [value, setValue] = React.useState([0, max])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeCommitted = (event, newValue) => {
    const query = {}
    // eslint-disable-next-line prefer-destructuring
    query[startName] = newValue[0]
    // eslint-disable-next-line prefer-destructuring
    query[endName] = newValue[1]
    router.updateQuery(query)
  }

  function valuetext(val) {
    return `$${val}`
  }

  useEffect(() => {
    if (router.query[startName] && router.query[endName]) {
      setValue([Number(router.query[startName]), Number(router.query[endName])])
    } else {
      setValue([0, max])
    }
  }, [router.query[startName], router.query[endName]])

  return (
    <Container>
      <SliderContainer>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          getAriaValueText={valuetext}
          max={max}
          step={step}
        />
      </SliderContainer>
      <FlexRow justifySpaceBetween>
        <div>{startLabel && <Text variant='h5'>{startLabel}</Text>}</div>
        <div>{endLabel && <Text variant='h5'>{endLabel}</Text>}</div>
      </FlexRow>
    </Container>
  )
}

const Container = styled.div``

const SliderContainer = styled.div`
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;

  & .MuiSlider-colorPrimary {
    color: ${(props) => props.theme.primary};
  }
`

export default SliderFilter
