import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHeader from 'src/components/headers/MainHeader';
import Navbar from 'src/components/headers/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import Body from 'src/components/fonts/Body';
import ChatroomList from '../ChatroomList';
import api from 'src/util/api';
import log from 'src/util/log';
import LoadingDots from 'src/components/displays/LoadingDots';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: ${(props) => props.theme.md}px) {
    max-height: 90vh;

    & > * {
      flex-shrink: 0;
    }
  }
`;

export const Center = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.md}px) {
    border: 1px solid ${props => props.theme.border.default};
  }
`;

const Chat = () => {
  const chatrooms = useSelector((state) => state.chatrooms);
  const user = useSelector(state => state.user);

  // reload chats
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setLoading(true);
      api.get(`/chatroom/user/${user.uid}`)
        .then(({ data }) => {
          dispatch({
            type: 'CHATROOMS_SET',
            payload: data,
          });
          setLoading(false);
        })
        .catch(({ response }) => {
          log('Chat', response)
          setLoading(false);
        })
    }
  }, [])

  return (
    <Container>
      <MainHeader />
      <Navbar />
      <Content>
        {loading
          ? <LoadingDots />
          : chatrooms.length === 0
          ? <Center><Body>No chats yet!</Body></Center>
          : <ChatroomList />
          }
      </Content>
    </Container>
  );
};

export default Chat;
