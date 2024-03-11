import React, { useEffect, useState } from 'react'
import { ReactComponent as NoListingSVGRaw } from 'src/assets/illustrations/no-listings.svg'
import PaginationBtns from 'src/components/buttons/PaginationBtns'
import ListingCardV2 from 'src/components/cards/ListingCardV2'
import ListingHostCard from 'src/components/cards/ListingHostCard'
import LoadingDots from 'src/components/displays/LoadingDots'
import Text from 'src/components/fonts/Text'
import { FlexColumn } from 'src/components/layouts/Flex'
import Space from 'src/components/layouts/Space'
import VertCardList from 'src/containers/VertCardList'
import theme from 'src/theme/colors'
import api from 'src/util/api'
import log from 'src/util/log'
import styled from 'styled-components'

const MyListingsList = ({ uid, setHasListings }) => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)

  const reload = () => {
    setLoading(true)
    api
      .get(`/user/${uid}/listings`)
      .then((res) => {
        setListings(res.data)
        setLoading(false)
      })
      .catch((e) => log('ERROR get mylistings', e))
  }

  useEffect(() => {
    if (uid) {
      reload()
    }
  }, [uid])

  useEffect(() => {
    if (listings.length > 0) setHasListings(true)
    else setHasListings(false)
  }, [listings, setHasListings])

  return (
    <Container>
      {loading && <LoadingDots />}
      <VertCardList>
        {listings.map((listing) => (
          <ListingHostCard key={listing._id} listing={listing} />
        ))}
      </VertCardList>

      {/* no listings */}
      {!loading && listings && listings.length === 0 && (
        <FlexColumn alignCenter>
          <Space padding='2rem 0' />
          <NoListingSVG />
          <Space margin='1rem 0' />
          <Text variant='h4'>No listings yet!</Text>
          <Text variant='p' color={theme.textMuted}>
            Create a listing to get started
          </Text>
        </FlexColumn>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: 2rem 0;
`

const NoListingSVG = styled(NoListingSVGRaw)`
  width: 70%;
  opacity: 0.9;
  max-width: 300px;
`

export default MyListingsList
