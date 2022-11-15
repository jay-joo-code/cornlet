import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const ResetUserStore = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (user && (user.displayName || !user.name)) {
    dispatch({
      type: 'USER_SET',
      payload: null,
    })
  }

  // create test scenario: flawed user schema saved to redux store
  // useEffect(() => {
  //   dispatch({
  //     type: 'USER_SET',
  //     payload: {
  //       displayName: 'test displayName',
  //       name: undefined,
  //     }
  //   })
  // }, [])

  return <div />
}

export default ResetUserStore
