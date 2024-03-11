import React, { useEffect, useState } from 'react'
import PaginationBtns from 'src/components/buttons/PaginationBtns'
import ListingCardV2 from 'src/components/cards/ListingCardV2'
import LoadingDots from 'src/components/displays/LoadingDots'
import VertCardList from 'src/containers/VertCardList'
import api from 'src/util/api'
import useRouter from 'src/util/hooks/useRouter'
import log from 'src/util/log'
import styled from 'styled-components'

const Listings = () => {
  const router = useRouter()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const connector = router.location.search ? '&' : '?'
    api
      .get(`/listing${router.location.search}${connector}active=true`)
      .then((res) => {
        setListings(res.data.docs)
        setTotalPages(res.data.totalPages)
        setPage(res.data.page)
        setLoading(false)
      })
      .catch(({ response }) => {
        log('ERROR get listings at home', { response })
        setLoading(false)
      })
  }, [router])

  if (loading || !listings)
    return (
      <Center>
        <LoadingDots />
      </Center>
    )

  return (
    <Container>
      <VertCardList>
        {listings.map((listing) => (
          <ListingCardV2 key={listing._id} listing={listing} />
        ))}
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
