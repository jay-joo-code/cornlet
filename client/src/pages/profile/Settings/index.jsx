import React from 'react'
import styled from 'styled-components'
import MainHeader from 'src/components/headers/MainHeader'
import Navbar from 'src/components/headers/Navbar'
import Btn from 'src/components/buttons/Btn'
import api from 'src/util/api'
import log from 'src/util/log'
import useRouter from 'src/hooks/useRouter'
import { useDispatch } from 'react-redux'

const Container = styled.div``

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`

const Settings = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    api
      .post('/auth/signout')
      .then(() => {
        router.history.push('/')

        dispatch({
          type: 'USER_SET',
          payload: null,
        })

        dispatch({
          type: 'CHATROOMS_SET',
          payload: [],
        })
      })
      .catch(({ response }) => log('Settings', response))
  }

  return (
    <Container>
      <MainHeader />
      <Navbar />
      <Content>
        <Btn color='primary' type='button' onClick={handleSignOut}>
          Sign Out
        </Btn>
      </Content>
    </Container>
  )
}

export default Settings
