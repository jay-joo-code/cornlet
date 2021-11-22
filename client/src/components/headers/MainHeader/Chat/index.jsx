import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { ReactComponent as ChatIcon } from 'src/assets/svgs/mail.svg'
import CornerRedDot from 'src/components/displays/CornerRedDot'
import { Link } from 'react-router-dom'
import Body from 'src/components/fonts/Body'

const Chat = () => {
  const chatrooms = useSelector((state) => state.chatrooms)
  const user = useSelector((state) => state.user)
  let hasNotif = false
  if (user) {
    chatrooms.forEach((chatroom) => {
      if (chatroom.notifUids.includes(user.uid)) {
        hasNotif = true
      }
    })
  }

  return (
    <Link to='/profile/chat'>
      <Container>
        <StyledChatIcon />
        {hasNotif && <CornerRedDot />}
      </Container>
    </Link>
  )
}

const Container = styled.div`
  position: relative;
`

const StyledChatIcon = styled(ChatIcon)`
  height: 1.6rem;
  width: 1.6rem;
  opacity: 0.7;
  cursor: pointer;
`

export default Chat
