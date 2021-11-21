import React from 'react'
import Btn from 'src/components/buttons/Btn'
import Text from 'src/components/fonts/Text'
import useIsDesktop from 'src/util/hooks/useIsDesktop'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-top: 1px solid ${(props) => props.theme.border.default};

  padding: 1.5rem 1rem 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Muted = styled.span`
  font-weight: 400;
  color: ${(props) => props.theme.textMuted};
`

const MobileFooter = ({ listing, handleMsgBtnClick }) => {
  const isDesktop = useIsDesktop()
  const { price, sold, cornellOnly } = listing || {}

  if (isDesktop || sold) return null

  return (
    <Container>
      <Text variant='p' fontWeight={500}>
        ${price} <Muted>/ month</Muted>
      </Text>
      <Btn onClick={handleMsgBtnClick} disabled={cornellOnly}>
        Message host
      </Btn>
    </Container>
  )
}

export default MobileFooter
