import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LeftArrowRaw } from 'src/assets/svgs/left-arrow.svg'
import { useHistory } from 'react-router-dom'
import Body from 'src/components/fonts/Body'
import Space from 'src/components/layouts/Space'
import useRouter from 'src/hooks/useRouter'

const BackHeader = ({ to, fullwidth, label }) => {
  const history = useHistory()
  const router = useRouter()

  const handleClick = () => {
    if (to) history.push(to)
    else if (history.length > 1) {
      history.goBack()
    } else {
      router.push('/')
    }
  }

  return (
    <Container fullwidth={fullwidth}>
      <Pointer onClick={handleClick}>
        <LeftArrow />
        <Space margin='0 .3rem' />
        <Body fontWeight={500}>{label}</Body>
      </Pointer>
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem ${(props) => (props.fullwidth ? '2rem' : '.5rem')};
  display: inline-block;

  @media (min-width: ${(props) => props.theme.medium}) {
    padding: 0;
  }
`

const Pointer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const LeftArrow = styled(LeftArrowRaw)`
  width: 20px;
  height: 20px;
  opacity: 0.8;
`

export default BackHeader
