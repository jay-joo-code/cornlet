import React from 'react'
import styled from 'styled-components'
import Body from '../fonts/Body'
import Text from '../fonts/Text'
import Avatar from './Avatar'

const Searchers = ({ searchers, isBrief }) => {
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
          <StyledAvatar key={searcher._id} src={searcher.photo} sm />
        ))}
      </AvatarGroup>
      <Text variant='h6' fontWeight={500}>
        {text}
      </Text>
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

export default Searchers
