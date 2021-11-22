import React, { useState } from 'react'
import { FlexRow } from 'src/components/layouts/Flex'
import Space from 'src/components/layouts/Space'
import styled from 'styled-components'
import Bookmarks from '../Bookmarks'
import FullscreenNav from './FullscreenNav'
import { ReactComponent as BurgerIcon } from 'src/assets/svgs/burger.svg'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  padding-right: 0.5rem;
`

export const Burger = styled.div`
  cursor: pointer;
`

export const Line = styled.div`
  width: 1.5rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 0.3rem;
`

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Wrapper>
      <FlexRow alignCenter>
        <Bookmarks />
        <Space margin='0 .5rem' />
        <Container>
          <StyledBurgerIcon onClick={() => setIsMenuOpen(true)} />
        </Container>
      </FlexRow>
      {isMenuOpen && <FullscreenNav setIsMenuOpen={setIsMenuOpen} />}
    </Wrapper>
  )
}

const StyledBurgerIcon = styled(BurgerIcon)`
  height: 30px;
  width: 30px;
`

export default MobileNav
