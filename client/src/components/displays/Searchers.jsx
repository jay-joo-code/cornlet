import React from 'react';
import styled from 'styled-components';
import Body from '../fonts/Body';
import Avatar from './Avatar'

const Searchers = (({ searchers }) => {

  if (!searchers || searchers.length === 0) return null

  return (
    <Container>
      <AvatarGroup>
        {searchers.slice(0, 4).map((searcher) => (
          <StyledAvatar key={searcher._id} src={searcher.photo} sm />
        ))}
      </AvatarGroup>
      <Body sm muted>{searchers.length} {searchers.length === 1 ? 'person is' : 'people are'} messaging this host</Body>
    </Container>
  )
});

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 .5rem;

  & > *:first-of-type {
    margin-right: .5rem;
  }
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: -.5rem;
  }
`;

const StyledAvatar = styled(Avatar)`
  border: 2px solid white;
`;

export default Searchers;
