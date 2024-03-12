import React from 'react'
import { useSelector } from 'react-redux'
import NoBookmarksSVGRaw from 'src/assets/illustrations/no-bookmarks.svg'
import ListingCardV2 from 'src/components/cards/ListingCardV2'
import Heading from 'src/components/fonts/Heading'
import Text from 'src/components/fonts/Text'
import MainHeader from 'src/components/headers/MainHeader'
import Navbar from 'src/components/headers/Navbar'
import { FlexRow } from 'src/components/layouts/Flex'
import { FlexColumn } from 'src/components/layouts/Flex'
import Space from 'src/components/layouts/Space'
import VertCardList from 'src/containers/VertCardList'
import theme from 'src/theme/colors'
import styled from 'styled-components'

const MyBookmarks = () => {
  const bm = useSelector((state) => state.bm)
  const user = useSelector((state) => state.user)
  const listings = user ? user.bm.listings : bm.listings

  return (
    <div>
      <MainHeader />
      <Navbar />
      <TitleWrapper>
        <TitleContainer>
          <Heading>Bookmarks</Heading>
        </TitleContainer>
      </TitleWrapper>

      {/* bookmarked listings */}
      <CardListContainer>
        <VertCardList>
          {listings.map((listing) => (
            <ListingCardV2 key={listing._id} listing={listing} />
          ))}
        </VertCardList>
      </CardListContainer>

      {/* no bookmarked listings */}
      {listings && listings.length === 0 && (
        <FlexColumn alignCenter>
          <Space padding='2rem 0' />
          <NoBookmarksSVG />
          <Space margin='1rem 0' />
          <Text variant='h4'>No bookmarks yet!</Text>
          <Text variant='p' color={theme.textMuted}>
            Bookmark a listing to get started
          </Text>
        </FlexColumn>
      )}
    </div>
  )
}

const TitleWrapper = styled.div`
  @media (min-width: ${(props) => props.theme.md}px) {
    display: flex;
    justify-content: center;
  }
`

const TitleContainer = styled.div`
  padding: 2rem 0 0 0.5rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: ${(props) => `${props.theme.md}px`};
    padding: 2rem 0 0 2rem;
  }
`

const CardListContainer = styled.div`
  padding: 1rem 0 3rem 0;
`

const NoBookmarksSVG = styled(NoBookmarksSVGRaw)`
  width: 50%;
  opacity: 0.9;
  max-width: 200px;
`

export default MyBookmarks
