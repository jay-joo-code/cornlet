import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from 'src/util/api'
import log from 'src/util/log'
import { useSelector } from 'react-redux'
import Edit from './Edit'
import { useListingDetails } from 'src/api/listing'

const Container = styled.div``

const EditIndex = ({ match }) => {
  const { id } = match.params
  const { listing } = useListingDetails({ listingId: id })
  // const [listing, setListing] = useState();
  // useEffect(() => {
  //   api.get(`/listing/${id}`)
  //     .then((res) => setListing(res.data))
  //     .catch((e) => log('ERROR EditIndex get listing by id', e));
  // }, [id]);
  const user = useSelector((state) => state.user)

  // TODO: loading animation
  if (!user || !listing || user.uid !== listing.user.uid) return <div />

  return (
    <Container>
      <Edit user={user} initialValues={listing} />
    </Container>
  )
}

export default EditIndex
