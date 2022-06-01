import React from 'react'
import { useSelector } from 'react-redux'
import Btn from 'src/components/buttons/Btn'
import Text from 'src/components/fonts/Text'
import { FlexRow } from 'src/components/layouts/Flex'
import Space from 'src/components/layouts/Space'
import useIsDesktop from 'src/hooks/useIsDesktop'
import styled from 'styled-components'

const MobileFooter = ({ listing, handleMsgBtnClick }) => {
  const isDesktop = useIsDesktop()
  const { price, sold, cornellOnly } = listing || {}
  const signedInUser = useSelector((state) => state.user)
  const isRestricted = !(
    !cornellOnly ||
    (cornellOnly && signedInUser && signedInUser.email.split('@')[1] === 'cornell.edu')
  )

  if (isDesktop || sold) return null

  return (
    <Container>
      <FlexRow justifySpaceBetween alignCenter>
        <Text variant='p' fontWeight={500}>
          ${price} <Muted>/ month</Muted>
        </Text>
        <Btn onClick={handleMsgBtnClick} disabled={isRestricted}>
          Message host
        </Btn>
      </FlexRow>
      {isRestricted && (
        <>
          <Space margin='.3rem 0' />
          <FlexRow justifyEnd>
            <Text variant='h6' fontWeight={500}>
              Restricted to Cornell
            </Text>
          </FlexRow>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-top: 1px solid ${(props) => props.theme.border.default};

  padding: 1rem 1rem 1.5rem 1rem;
`

const Muted = styled.span`
  font-weight: 400;
  color: ${(props) => props.theme.textMuted};
`

export default MobileFooter
