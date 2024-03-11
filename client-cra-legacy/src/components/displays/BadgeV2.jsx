import React from 'react'
import styled from 'styled-components'
import Text from '../fonts/Text'

const BadgeV2 = ({ label, color, background }) => {
  return (
    <Container background={background}>
      <BadgeText variant='h6' color={color} maxLines={1} fontWeight={700}>
        {label}
      </BadgeText>
    </Container>
  )
}

const Container = styled.div`
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  display: inline-block;

  // background
  background-color: ${(props) => props.background && props.background};
`

const BadgeText = styled(Text)`
  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 14px;
  }
`

export default BadgeV2
