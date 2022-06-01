import React from 'react'
import styled from 'styled-components'
import NavElt from './NavElt'
import useUnreadChatrooms from 'src/hooks/useUnreadChatrooms'

const Container = styled.div`
  overflow: hidden;
`

const NavRow = styled.div`
  display: flex;
  overflow-y: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`

const HrLine = styled.div`
  position: absolute;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  left: 0;
  right: 0;
`

const Navbar = () => {
  const unreadChatroomsCount = useUnreadChatrooms().length

  return (
    <Container>
      <NavRow>
        <NavElt label='Listings' to='/profile/listings' />
        <NavElt label='Bookmarks' to='/profile/bookmarks' />
        <NavElt label='Messages' to='/profile/chat' notifCount={unreadChatroomsCount} />
        <NavElt label='Settings' to='/profile/settings' />
      </NavRow>
      <HrLine />
    </Container>
  )
}

export default Navbar
