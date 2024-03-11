import React from 'react';
import styled from 'styled-components';
import MainHeader from 'src/components/headers/MainHeader';
import Navbar from 'src/components/headers/Navbar';
import RenderOn from 'src/containers/RenderOn';
import ChatroomList from '../ChatroomList';
import ChatroomPanel from '../ChatroomPanel';

export const Container = styled.div`
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

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.md}px) {
    border: 1px solid ${props => props.theme.border.default};
  }
`;

const Chatroom = ({ match }) => (
  <Container>
    <RenderOn desktop>
      <MainHeader />
      <Navbar />
    </RenderOn>
    <Content>
      <RenderOn desktop>
        <ChatroomList />
      </RenderOn>
      <ChatroomPanel cid={match.params.cid} />
    </Content>
  </Container>
);

export default Chatroom;
