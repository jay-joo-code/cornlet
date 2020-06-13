import React from 'react';
import styled from 'styled-components';
import Avatar from 'src/components/displays/Avatar';
import Body from 'src/components/fonts/Body';
import formatDate from 'src/util/helpers/formatDate';

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const PhotoSection = styled.div`
  margin-right: 1rem;
`;

export const TextSection = styled.div`

`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;

  & p {
    margin-right: .5rem;
  }
`;

export const MsgSection = styled.div`
  margin-top: .3rem;
`;

const MsgGroup = ({ user, msgs, isOwner }) => {
  const lastMsg = msgs[msgs.length - 1];

  return (
    <Container>
      <PhotoSection>
        <Avatar
          src={user.photo}
        />
      </PhotoSection>
      <TextSection>
        <UserSection>
          <Body bold>{user.name}</Body>
          {isOwner && <Body bold> (Host)</Body>}
          <Body muted sm>{formatDate(lastMsg.createdAt, true)}</Body>
        </UserSection>
        <MsgSection>
          {msgs.map((msg) => (
            <Body>{msg.content}</Body>
          ))}
        </MsgSection>
      </TextSection>
    </Container>
  );
};

export default MsgGroup;
