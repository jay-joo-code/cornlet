import React, { useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import MsgGroup from './MsgGroup';

const Container = styled.div`
  max-height: 100%;
  padding: 1rem;
`;

const ChatContents = ({ chatroom }) => {
  const msgGroups = [];

  if (chatroom.msgs) {
    chatroom.msgs.forEach((msg) => {
      const isOwner = msg.uid === chatroom.listing.user.uid;

      if (msgGroups.length > 0 && msgGroups[msgGroups.length-1].isOwner === isOwner) {
        // msg by same user as previous msgGroup
        // merge msg
        msgGroups[msgGroups.length-1].msgs.push(msg);
      }
      else {
        // msg by different user
        // append new msgGroup
        const data = {
          user: isOwner ? chatroom.listing.user : chatroom.searcher,
          msgs: [msg],
          isOwner,
        };
        msgGroups.push(data);
      }
    })
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ block: 'nearest' });
  }

  useLayoutEffect(() => {
    scrollToBottom();
  }, [msgGroups])

  return (
    <Container>
      {msgGroups.map((msgGroup) => {
        return (
          <MsgGroup
            {...msgGroup}
          />
        )
      })}
      <div ref={messagesEndRef} />
    </Container>
  )
};

export default ChatContents;