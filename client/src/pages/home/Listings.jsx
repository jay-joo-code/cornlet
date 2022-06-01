import React, { useEffect, useState } from 'react'
import PaginationBtns from 'src/components/buttons/PaginationBtns'
import ListingCardV2 from 'src/components/cards/ListingCardV2'
import ListingVertCard from 'src/components/cards/ListingVertCard'
import LoadingDots from 'src/components/displays/LoadingDots'
import VertCardList from 'src/containers/VertCardList'
import api from 'src/util/api'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import log from 'src/util/log'
import styled from 'styled-components'
import { useListings } from 'src/api/listing'

const Listings = () => {
  const router = useRouter()
  // const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const isMobile = useIsMobile()
  const { listings } = useListings({
    active: true,
  })

  // TODO: infinite scroll

  if (loading || !listings)
    return (
      <Center>
        <LoadingDots />
      </Center>
    )

  return (
    <Container>
      <VertCardList>
        {listings.map((listing) =>
          isMobile ? (
            <ListingVertCard key={listing._id} listing={listing} />
          ) : (
            <ListingCardV2 key={listing._id} listing={listing} />
          )
        )}
      </VertCardList>
      <PaginationBtns totalPages={totalPages} page={page} />
    </Container>
  )
}

const Container = styled.div``

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default Listings
