import React from 'react'
import styled from 'styled-components'
import Btn from 'src/components/buttons/Btn'
import { Link } from 'react-router-dom'
import Auth from 'src/components/buttons/Auth'
import Logo from 'src/components/displays/Logo'
import useIsDesktop from 'src/hooks/useIsDesktop'
import Bookmarks from './Bookmarks'
import Chat from './Chat'
import MobileNav from './MobileNav'
import { ReactComponent as PlusIcon } from 'src/assets/svgs/plus.svg'
import ClickableIcon from 'src/components/displays/ClickableIcon'

const MainHeader = () => {
  const isDesktop = useIsDesktop()

  return (
    <Container>
      <Link to='/'>
        <Logo />
      </Link>
      {isDesktop ? (
        <Right>
          <Link to='/new'>
            <Btn color='primary' inverted>
              <StyledPlusIcon />
              <ButtonText>Create listing</ButtonText>
            </Btn>
          </Link>
          <Chat />
          <Bookmarks />
          <Auth border />
        </Right>
      ) : (
        <MobileNav />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  position: relative;

  @media (min-width: ${(props) => props.theme.md}px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 1rem;
  }
`

const StyledPlusIcon = styled(PlusIcon)`
  fill: #fff;
`

const ButtonText = styled.p`
  margin-left: 0.2rem;
  line-height: 1.5;
`

export default MainHeader
