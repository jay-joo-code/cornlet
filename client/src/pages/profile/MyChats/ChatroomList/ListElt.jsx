import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from 'src/components/displays/Avatar'
import CornerRedDot from 'src/components/displays/CornerRedDot'
import Body from 'src/components/fonts/Body'
import getFromNowDate from 'src/util/helpers/getFromNowDate'
import getShortAddr from 'src/util/helpers/getShortAddr'
import useChatOtherUser from 'src/util/hooks/useChatOtherUser'
import useRouter from 'src/util/hooks/useRouter'
import styled from 'styled-components'

const ListElt = ({ chatroom }) => {
  const otherUser = useChatOtherUser(chatroom)
  const router = useRouter()
  const chatroomPath = `/profile/chat/${chatroom._id}`
  const selected = router.pathname === chatroomPath
  const nextPath = selected ? '/profile/chat' : chatroomPath
  const user = useSelector((state) => state.user)
  const hasNotif = chatroom.notifUids && chatroom.notifUids.includes(user.uid)
  const lastMsg = chatroom.msgs[chatroom.msgs.length - 1]

  return (
    <div>
      <Link to={nextPath}>
        <Container selected={selected}>
          <PhotoSection>
            <Avatar src={otherUser.photoURL || otherUser.photo} lg />
            {hasNotif && <CornerRedDot lg />}
          </PhotoSection>
          <TextSection>
            <Row>
              <Body bold>{otherUser.name}</Body>
              <TextContainer>
                <Body color='primary' ellipsis>
                  {getShortAddr(chatroom.listing.addr)}
                </Body>
              </TextContainer>
            </Row>
            <Row>
              <TextContainer maxWidth={160}>
                <Body muted={hasNotif ? 0 : 1} ellipsis>
                  {chatroom.msgs[chatroom.msgs.length - 1].content}
                </Body>
              </TextContainer>
              <Body muted>{getFromNowDate(lastMsg.createdAt)}</Body>
            </Row>
          </TextSection>
        </Container>
      </Link>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  border-radius: 2px;
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 1rem;
  }

  // selected
  background: ${(props) => (props.selected ? 'rgba(0, 0, 0, .1)' : '')};
`

const PhotoSection = styled.div`
  margin-right: 1rem;
  position: relative;
`

const TextSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.2rem;
`

const TextContainer = styled.div`
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '140px')};
`

export default ListElt
