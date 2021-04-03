import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import Text from 'src/components/fonts/Text';
import { FlexColumn } from 'src/components/layouts/Flex';
import Space from 'src/components/layouts/Space';
import theme from 'src/theme/colors';
import styled from 'styled-components';
import ListElt from './ListElt';
import { ReactComponent as NoChatroomsSVGRaw } from 'src/assets/illustrations/no-chatrooms.svg';

const Container = styled.div`
  @media (min-width: ${(props) => props.theme.md}px) {
    width: 400px;
    height: 100%;
    max-height: 100%;
    border-right: 1px solid rgba(0, 0, 0, .1);
    overflow: hidden;
  }
`;

const NoChatroomsSVG = styled(NoChatroomsSVGRaw)`
  width: 40%;
  opacity: .9;
  max-width: 150px;
`;

const ChatroomList = () => {
  // const chatrooms = useSelector((state) => state.chatrooms);
  const chatrooms = [];

  return (
    <Container>
      <PerfectScrollbar>
        {/* chatroom list */}
        {chatrooms.map((chatroom) => (
          <ListElt key={chatroom._id} chatroom={chatroom} />
        ))}

        {/* no chatrooms */}
        {chatrooms && chatrooms.length === 0 && (
          <FlexColumn alignCenter>
            <Space padding='4rem 0' />
            <NoChatroomsSVG />
            <Space margin='1rem 0' />
            <Text variant='h4'>No chatrooms yet!</Text>
            <Text variant='p' color={theme.textMuted}>Message a host to get started</Text>
          </FlexColumn>
        )}
      </PerfectScrollbar>
    </Container>
  );
};

export default ChatroomList;
