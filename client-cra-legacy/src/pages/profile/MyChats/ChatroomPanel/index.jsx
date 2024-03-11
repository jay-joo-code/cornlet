import React from 'react';
import styled from 'styled-components';
import useChatroom from 'src/util/hooks/useChatroom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux';
import socket from 'src/util/socket';
import Header from './Header';
import ChatContents from './ChatContents';
import InputSection from './InputSection';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Fill = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ChatroomPanel = ({ cid }) => {
  const chatroom = useChatroom(cid);
  const user = useSelector((state) => state.user);
  if (chatroom && user && chatroom.notifUids.includes(user.uid)) {
    socket.emit('chatroom seen', { cid, uid: user.uid });
  }

  if (!chatroom) return <div />;

  return (
    <Container>
      <Header chatroom={chatroom} />
      <Fill>
        {/* <PerfectScrollbar> */}
        <ChatContents chatroom={chatroom} />
        {/* </PerfectScrollbar> */}
      </Fill>
      <InputSection chatroom={chatroom} />
    </Container>
  );
};

export default ChatroomPanel;
