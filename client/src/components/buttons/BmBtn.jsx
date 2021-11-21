import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import api from 'src/util/api'
import log from 'src/util/log'
import { ReactComponent as BmUnfilledRaw } from 'src/assets/svgs/bookmark.svg'
import { ReactComponent as BmFilledRaw } from 'src/assets/svgs/bookmark-filled.svg'

const BmBtn = ({ listing }) => {
  const bm = useSelector((state) => state.bm)
  const user = useSelector((state) => state.user)

  let isBmed = false
  if (user) {
    isBmed =
      user.bm &&
      user.bm.listings &&
      user.bm.listings.filter((bmedListing) => bmedListing._id === listing._id).length !== 0
  } else {
    isBmed =
      bm &&
      bm.listings &&
      bm.listings.filter((bmedListing) => bmedListing._id === listing._id).length !== 0
  }

  const dispatch = useDispatch()
  const toggleBm = async () => {
    try {
      const addListingToBm = !isBmed
      const type = addListingToBm ? 'BM_ADD' : 'BM_REMOVE'

      if (!user) {
        // redux: bm
        dispatch({
          type,
          payload: listing,
        })
      } else {
        // redux: user.bm
        dispatch({
          type: `USER_${type}`,
          payload: listing,
        })

        // DB
        if (addListingToBm) {
          await api
            .put(`/user/${user._id}/bm/add/${listing._id}`)
            .catch(({ response }) => log('BmBtn', response))
        } else {
          await api
            .put(`/user/${user._id}/bm/remove/${listing._id}`)
            .catch(({ response }) => log('BmBtn', response))
        }
      }
    } catch (e) {
      log('BmBtn', e)
    }
  }

  return <Container onClick={toggleBm}>{isBmed ? <BmFilled /> : <BmUnfilled />}</Container>
}

const Container = styled.div`
  background: white;
  padding: 0.3rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 99;
`

const BmFilled = styled(BmFilledRaw)`
  display: block;
  fill: white;
  height: 1rem;
  width: 1rem;
  overflow: visible !important;
  opacity: 0.9;
  fill: ${(props) => props.theme.primary};

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 1.2rem;
    width: 1.2rem;
  }
`

const BmUnfilled = styled(BmUnfilledRaw)`
  display: block;
  height: 1rem;
  width: 1rem;
  overflow: visible !important;
  opacity: 0.6;

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 1.2rem;
    width: 1.2rem;
  }
`

export default BmBtn
