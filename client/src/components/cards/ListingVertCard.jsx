import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BmBtn from 'src/components/buttons/BmBtn'
import Space from 'src/components/layouts/Space'
import theme from 'src/theme'
import api from 'src/util/api'
import formatListingDesc from 'src/util/helpers/formatListingDesc'
import getDateString from 'src/util/helpers/getDateString'
import getFromNowDate from 'src/util/helpers/getFromNowDate'
import getShortAddr from 'src/util/helpers/getShortAddr'
import useFilters from 'src/util/hooks/useFilters'
import useIsMobile from 'src/util/hooks/useIsMobile'
import styled from 'styled-components'
import BadgeV2 from '../displays/BadgeV2'
import ListingLocation from '../displays/ListingLocation'
import Searchers from '../displays/Searchers'
import Body from '../fonts/Body'
import Text from '../fonts/Text'
import { FlexContainer, FlexRow } from '../layouts/Flex'

const ListingVertCard = ({ listing }) => {
  const [searchers, setSearchers] = useState([])
  const isMobile = useIsMobile()

  useEffect(() => {
    if (listing._id) {
      api.get(`/chatroom/listing/searchers/${listing._id}`).then((res) => {
        setSearchers(res.data)
      })
    }
  }, [listing._id])

  return (
    <Wrapper>
      <Link to={`/listing/${listing._id}`}>
        <Container>
          <ImgContainer>
            <CornerBtnContainer>
              <BmBtn listing={listing} />
            </CornerBtnContainer>
            <Img src={listing.imgs[listing.thumbnailIdx || 0]} faded={listing.sold} />
          </ImgContainer>
          <TextContainer>
            {/* <ListingLocation
                lat={listing.lat}
                lng={listing.lng}
                toCampus={listing.toCampus}
                isShowMins={!isMobile}
              /> */}
            <FlexContainer justifySpaceBetween alignCenter fullWidth>
              <Text variant='h5' bold>
                {getShortAddr(listing.addr)}
              </Text>
              <div>
                {listing.sold && (
                  <BadgeV2 color={theme.brand.gradient} background={theme.brand50} label='Sold' />
                )}
              </div>
            </FlexContainer>
            {/* <div>
                {listing.sold ? (
                  <BadgeV2 color={theme.brand.gradient} background={theme.brand50} label='Sold' />
                ) : (
                  <BadgeV2
                    color={theme.text}
                    background={theme.grey[100]}
                    label={getDateString(listing, { isNumeric: true })}
                  />
                )}
              </div> */}
            <FlexContainer justifySpaceBetween fullWidth>
              <Text variant='h5' muted>
                {getDateString(listing, { isAbbrev: true })}
              </Text>
              <Text variant='h5'>
                <span style={{ fontWeight: 500 }}>${listing.price} </span>
                <span style={{ opacity: 0.6 }}>month</span>
              </Text>
              {/* <StatsContainer>
                <Text variant='h6' muted>
                Updated {getFromNowDate(listing.updatedAt)}
                </Text>
              </StatsContainer> */}
            </FlexContainer>
            <Space y={0.2} />
            <SearchersContainer>
              <Searchers searchers={searchers} isBrief />
            </SearchersContainer>
          </TextContainer>
        </Container>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Container = styled.div`
  width: 90vw;
  padding: 1rem 0;
  position: relative;
  overflow: hidden;
  /* display: flex;
  align-items: flex-start; */
  border-radius: 20px;
`

const CornerBtnContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.md}px) {
    right: 1.5rem;
  }
`

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 0.6rem;

  /* &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.5) 100%);
  } */
`

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  // hide alt text
  color: rgba(0, 0, 0, 0) !important;

  // faded
  opacity: ${(props) => (props.faded ? '.5' : '')};
`

const Title = styled.h3`
  white-space: nowrap;
  flex-grow: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 0.5rem;
  font-size: 1rem;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 1.5rem;
  }
`

const OverlineContainer = styled.div`
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
`

const Overline = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.textMuted};
  font-weight: 500;
  font-size: 0.9rem;
`

const SearchersContainer = styled.div`
  /* position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2; */

  & p {
    color: ${(props) => props.theme.textMuted};
  }
`

const Price = styled(Body)`
  font-size: 0.9rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.2rem;

  & > * {
    /* margin-bottom: 0.1rem; */
  }

  @media (min-width: ${(props) => props.theme.md}px) {
    justify-content: space-between;
    flex-grow: 2;
    height: 180px;
  }
`

const StatsContainer = styled.div``

export default ListingVertCard
