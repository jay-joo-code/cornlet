import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BmBtn from 'src/components/buttons/BmBtn'
import Space from 'src/components/layouts/Space'
import theme from 'src/theme'
import api from 'src/util/api'
import formatListingDesc from 'src/util/helpers/formatListingDesc'
import getDateString from 'src/util/helpers/getDateString'
import getFromNowDate from 'src/util/helpers/getFromNowDate'
import getRegion from 'src/util/helpers/getRegion'
import styled from 'styled-components'
import BadgeV2 from '../displays/BadgeV2'
import Searchers from '../displays/Searchers'
import Body from '../fonts/Body'
import Text from '../fonts/Text'
import { FlexRow } from '../layouts/Flex'
import kmToMins from 'src/util/helpers/kmToMins'
import useIsDesktop from 'src/util/hooks/useIsDesktop'
import useFilters from 'src/util/hooks/useFilters'

const ListingCardV2 = ({ listing }) => {
  const [searchers, setSearchers] = useState([])
  const [region, setRegion] = useState({})
  const [isDistanceFiltered, setIsDistanceFiltered] = useState(false)
  const isDesktop = useIsDesktop()
  const filters = useFilters()

  useEffect(() => {
    let hasDistance = false
    filters.forEach(({ type }) => {
      if (type === 'distance') {
        hasDistance = true
      }
    })

    if (hasDistance) {
      setIsDistanceFiltered(true)
    } else {
      setIsDistanceFiltered(false)
    }
  }, [filters])

  useEffect(() => {
    if (listing._id) {
      api.get(`/chatroom/listing/searchers/${listing._id}`).then((res) => {
        setSearchers(res.data)
        setRegion(
          getRegion({
            lat: listing.lat,
            lng: listing.lng,
          })
        )
      })
    }
  }, [listing._id])

  return (
    <Wrapper>
      <CornerBtnContainer>
        <BmBtn listing={listing} />
      </CornerBtnContainer>
      <Link to={`/listing/${listing._id}`}>
        <Container>
          <ImgContainer>
            <Img src={listing.imgs[listing.thumbnailIdx || 0]} faded={listing.sold} />
          </ImgContainer>
          <Space margin='0 .5rem' />
          <TextContainer>
            <div>
              <OverlineContainer>
                <BadgeV2 color={region.color} background={region.background} label={region.label} />
                {(isDesktop || isDistanceFiltered) && (
                  <Overline>
                    • {kmToMins(listing.toCampus)} mins {isDesktop && 'from campus'}
                  </Overline>
                )}
              </OverlineContainer>
              <Title>{formatListingDesc(listing)}</Title>
              <Space padding='.3rem 0' />
              <div>
                {listing.sold ? (
                  <BadgeV2 color={theme.brand} background={theme.brand50} label='Sold' />
                ) : (
                  <BadgeV2
                    color={theme.text}
                    background={theme.grey[100]}
                    label={getDateString(listing, { isNumeric: true })}
                  />
                )}
              </div>
              <SearchersContainer>
                <Searchers searchers={searchers} isBrief />
              </SearchersContainer>
            </div>
            <FlexRow justifySpaceBetween fullWidth>
              <StatsContainer>
                <Text variant='h5' muted>
                  Updated {getFromNowDate(listing.updatedAt)}
                </Text>
              </StatsContainer>
              <Price>
                <span style={{ fontWeight: 500 }}>${listing.price}</span>{' '}
                <span style={{ opacity: 0.6 }}>/ month</span>
              </Price>
            </FlexRow>
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
  display: flex;
  align-items: flex-start;
  border-radius: 20px;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 100%;
    transition: background-color 0.2s ease-in-out;
    padding: 1rem;

    &:hover {
      background-color: ${(props) => props.theme.grey[50]};
    }
  }
`

const CornerBtnContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0rem;
  z-index: 2;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.md}px) {
    right: 1.5rem;
  }
`

const ImgContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 280px;
    height: 180px;
  }
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
  font-size: 1.1rem;
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
  padding: 0.5rem 0 1rem 0;
`

const Price = styled(Body)`
  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.md}px) {
    justify-content: space-between;
    flex-grow: 2;
    height: 180px;
  }
`

const StatsContainer = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.md}px) {
    display: block;
  }
`

export default ListingCardV2
