import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import api from 'src/util/api'
import log from 'src/util/log'
import { ReactComponent as BmUnfilledRaw } from 'src/assets/svgs/bookmark.svg'
import { ReactComponent as BmFilledRaw } from 'src/assets/svgs/bookmark-filled.svg'
import { ReactComponent as UnfilledBmIcon } from 'src/assets/svgs/bookmark.svg'
import { ReactComponent as FilledBmIcon } from 'src/assets/svgs/bookmark-filled.svg'
import ClickableIcon from '../displays/ClickableIcon'
import useIsDesktop from 'src/hooks/useIsDesktop'

const BmBtn = ({ listing, forceDesktopSize }) => {
  const bm = useSelector((state) => state.bm)
  const user = useSelector((state) => state.user)
  const isDesktop = useIsDesktop()

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
  const toggleBm = async (event) => {
    try {
      event.preventDefault()
      event.stopPropagation()
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

  return (
    <Container onClick={toggleBm}>
      {isBmed ? (
        <ClickableIcon size={isDesktop || forceDesktopSize ? undefined : '24px'}>
          <StyledFilledBmIcon forceDesktopSize={forceDesktopSize} />
        </ClickableIcon>
      ) : (
        <ClickableIcon size={isDesktop || forceDesktopSize ? undefined : '24px'}>
          <StyledUnfilledBmIcon forceDesktopSize={forceDesktopSize} />
        </ClickableIcon>
      )}
    </Container>
  )
}

const Container = styled.div`
  border-radius: 50%;
  cursor: pointer;
  z-index: 49;
`

const StyledUnfilledBmIcon = styled(UnfilledBmIcon)`
  height: 1rem;
  width: 1rem;
  cursor: pointer;

  /* forceDesktopSize */
  height: ${(props) => props.forceDesktopSize && '1.5rem'};
  width: ${(props) => props.forceDesktopSize && '1.5rem'};

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`

const StyledFilledBmIcon = styled(FilledBmIcon)`
  height: 1rem;
  width: 1rem;
  cursor: pointer;
  fill: ${(props) => props.theme.brand[500]};

  /* forceDesktopSize */
  height: ${(props) => props.forceDesktopSize && '1.5rem'};
  width: ${(props) => props.forceDesktopSize && '1.5rem'};

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`

export default BmBtn
