import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as BMIconRaw } from 'src/assets/svgs/bookmark.svg'
import CornerRedDot from 'src/components/displays/CornerRedDot'
import api from 'src/util/api'
import useRouter from 'src/util/hooks/useRouter'
import log from 'src/util/log'
import styled from 'styled-components'

const Bookmarks = () => {
  const bm = useSelector((state) => state.bm)
  const user = useSelector((state) => state.user)
  const [dropdown, setDropdown] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleClick = () => {
    setDropdown(true)

    if (!user) {
      dispatch({
        type: 'BM_NOTIF_FALSE',
        payload: null,
      })
    } else {
      dispatch({
        type: 'USER_BM_NOTIF_FALSE',
        payload: null,
      })

      api
        .put(`/user/${user._id}/bm/notif/false`)
        .catch(({ response }) => log('Bookmarks', response))
    }
    router.push('/profile/bookmarks')
  }

  return (
    <Container>
      <BMIconContainer>
        {(user ? user.bm && user.bm.notif : bm && bm.notif) && <CornerRedDot />}
        <BMIcon onClick={handleClick} />
      </BMIconContainer>
    </Container>
  )
}

const Container = styled.div`
  flex-grow: 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    position: relative;
  }
`

const BMIconContainer = styled.div`
  position: relative;
  flex-grow: 0;
`

const BMIcon = styled(BMIconRaw)`
  height: 1.6rem;
  width: 1.6rem;
  opacity: 0.7;
  cursor: pointer;
`

export default Bookmarks
