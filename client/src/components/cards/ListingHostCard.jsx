import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Space from 'src/components/layouts/Space'
import theme from 'src/theme'
import api from 'src/util/api'
import getDateString from 'src/util/helpers/getDateString'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import log from 'src/util/log'
import styled from 'styled-components'
import Btn from '../buttons/Btn'
import TextBtn from '../buttons/TextBtn'
import BadgeV2 from '../displays/BadgeV2'
import Text from '../fonts/Text'
import { FlexRow } from '../layouts/Flex'
import { useListingStats } from 'src/api/listing'

const ListingHostCard = ({ listing }) => {
  const router = useRouter()

  const handleViewButtonClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    router.push(`/listing/${listing._id}`)
  }

  // bmCount
  const { stats } = useListingStats({ listingId: listing._id })

  // useEffect(() => {
  //   if (listing._id) {
  //     api.get(`/listing/${listing._id}/stats`).then((res) => {
  //       if (res && res.data) {
  //         setSetBmCount(res.data.bmCount)
  //       }
  //     })
  //   }
  // }, [listing._id])

  // sold toggle
  const [isSold, setIsSold] = useState(false)

  useEffect(() => {
    setIsSold(listing.sold)
  }, [listing.sold])

  const toggleSold = (event) => {
    event.preventDefault()
    event.stopPropagation()

    setIsSold(!isSold)
    api
      .put(`/listing/${listing._id}/update`, { sold: !isSold })
      .catch((e) => log('ERROR ListingHostCard', e))
  }

  return (
    <Link to={`/listing/${listing._id}/edit`}>
      <Container>
        <ImgContainer>
          <Img src={listing.imgs[listing.thumbnailIdx || 0]} faded={isSold} />
        </ImgContainer>
        <Space margin='0 .5rem' />
        <TextContainer>
          <Title>{listing.addr}</Title>
          <Text variant='h5'>
            {listing.views} views {stats && `• ${stats.bmCount} bookmarks`}
          </Text>
          <DateContainer>
            <BadgeV2
              color={theme.text}
              background={theme.grey[100]}
              label={getDateString(listing, { isNumeric: true })}
            />
          </DateContainer>
          <SwitchContainer onClick={toggleSold}>
            <FormControlLabel
              control={<Switch checked={!isSold} color='primary' size='small' />}
              label={isSold ? 'Sold' : 'Available'}
            />
          </SwitchContainer>
          <ButtonsContainer alignCenter>
            {!isSold && <Btn onClick={handleViewButtonClick}>View</Btn>}
            <TextBtn onClick={toggleSold}>Mark {isSold ? 'as available' : 'sold'}</TextBtn>
          </ButtonsContainer>
        </TextContainer>
      </Container>
    </Link>
  )
}

const Container = styled.div`
  cursor: pointer;
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

const DateContainer = styled.div`
  margin-left: -0.1rem;
`

const SwitchContainer = styled.div`
  padding-left: 0.4rem;
  width: min-content;
  min-width: 125px;

  & .MuiFormControlLabel-label {
    margin-left: 0.2rem;
    font-weight: 500;
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
  flex-grow: 0;
  margin-right: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.2;

  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 1.5rem;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.md}px) {
    justify-content: space-between;
    flex-grow: 2;
    height: 180px;

    & > * {
      margin-bottom: unset;
    }
  }
`

const ButtonsContainer = styled(FlexRow)`
  margin-top: 0.5rem;

  & > * {
    margin-right: 0.5rem;
  }
`

export default ListingHostCard
