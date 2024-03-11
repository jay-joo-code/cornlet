import React from 'react';
import styled from 'styled-components';
import Avatar from 'src/components/displays/Avatar';
import Body from 'src/components/fonts/Body';

const Container = styled.div`
  display: flex;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const Name = styled(Body)`
  margin-bottom: .1rem;
`;

const UserData = ({ name, email, src }) => (
  <Container>
    <Avatar
      src={src}
    />
    <Data>
      <Name sm={email ? 1 : 0}>{name}</Name>
      <Body sm muted>{email}</Body>
    </Data>
  </Container>
);

export default UserData;
