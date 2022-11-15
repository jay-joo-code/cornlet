import React, { useRef, useLayoutEffect } from 'react'
import Space from 'src/components/layouts/Space'
import styled from 'styled-components'
import MsgGroup from './MsgGroup'

const Container = styled.div`
  max-height: 100%;
  padding: 1rem;
`

const ChatContents = ({ chatroom }) => {
  const msgGroups = []

  if (chatroom.msgs) {
    chatroom.msgs.forEach((msg) => {
      const isOwner = msg.uid === chatroom.listing.user.uid

      if (msgGroups.length > 0 && msgGroups[msgGroups.length - 1].isOwner === isOwner) {
        // msg by same user as previous msgGroup
        // merge msg
        msgGroups[msgGroups.length - 1].msgs.push(msg)
      } else {
        // msg by different user
        // append new msgGroup
        const user = isOwner ? chatroom.listing.user : chatroom.searcher || chatroom.listing.user

        const data = {
          user,
          msgs: [msg],
          isOwner,
        }
        msgGroups.push(data)
      }
    })
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ block: 'nearest' })
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [msgGroups])

  if (chatroom.searcher && chatroom.searcher.isBanned) return <div ref={messagesEndRef} />

  return (
    <Container>
      {msgGroups.map((msgGroup) => (
        <MsgGroup {...msgGroup} />
      ))}
      <Space padding='.5rem 0' />
      <div ref={messagesEndRef} />
    </Container>
  )
}

export default ChatContents
