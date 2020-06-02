import React from 'react';
import styled from 'styled-components';
import useChatroom from 'src/util/hooks/useChatroom';

import Header from './Header';
import ChatContents from './ChatContents';
import InputSection from './InputSection';

const Container = styled.div`
  width: 100%;
`;

const ChatroomPanel = ({ cid }) => {
  const chatroom = useChatroom(cid);

  return (
    <Container>
      <Header chatroom={chatroom} />
      <ChatContents chatroom={chatroom} />
      <InputSection chatroom={chatroom} />
    </Container>
  )
};

export default ChatroomPanel;
