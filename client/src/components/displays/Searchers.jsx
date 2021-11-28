import React from 'react'
import styled from 'styled-components'
import Text from '../fonts/Text'
import Avatar from './Avatar'

const Searchers = ({ searchers, isBrief, isLarge }) => {
  if (!searchers || searchers.length === 0) return null

  const text = isBrief
    ? `${searchers.length} messaging host`
    : `${searchers.length} ${
        searchers.length === 1 ? 'person is' : 'people are'
      } messaging this host`

  const sliceCount = isBrief ? 3 : 4

  return (
    <Container isBrief={isBrief}>
      <AvatarGroup>
        {searchers.slice(0, sliceCount).map((searcher) => (
          <StyledAvatar key={searcher._id} src={searcher.photo} sm isLinked={false} />
        ))}
      </AvatarGroup>
      <StyledText variant={isLarge ? 'h5' : 'h6'} fontWeight={500}>
        {text}
      </StyledText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: ${(props) => (props.isBrief ? 'center' : 'flex-start')};
  padding: 0 0.5rem;

  & > *:first-of-type {
    margin-right: 0.5rem;
  }
`

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: -0.5rem;
  }
`

const StyledAvatar = styled(Avatar)`
  border: 2px solid white;
`

const StyledText = styled(Text)`
  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 14px;
  }
`

export default Searchers
