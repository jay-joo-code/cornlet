import React, { useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from 'src/components/headers/MainHeader';
import useRouter from 'src/util/hooks/useRouter';
import log from 'src/util/log';

const Container = styled.div`

`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const AuthCallback = () => {
  const dispatch = useDispatch();
  const authing = useSelector(state => state.authing);
  const redirectPath = useSelector(state => state.redirectPath)
  const router = useRouter();

  useEffect(() => {
    api.get('/auth/callback')
      .then((res) => {
        dispatch({
          type: 'USER_SET',
          payload: res.data.user,
        });
        dispatch({
          type: 'AUTHING_SET',
          payload: false,
        });
        dispatch({
          type: 'CHATROOMS_SET',
          payload: res.data.chatrooms,
        });
        router.history.push(redirectPath || '/profile/listings');
        dispatch({
          type: 'REDIRECT_PATH_SET',
          payload: null,
        });
      })
      .catch(({ response }) => {
        log('AuthCallback', response);
        dispatch({
          type: 'USER_SET',
          payload: null,
        });
        dispatch({
          type: 'AUTHING_SET',
          payload: false,
        });
      })
  }, [])

  if (authing) {
    return (
      <Container>
        <MainHeader />
        <Content>
          Handling authentication
        </Content>
      </Container>
    )
  }
  else {
    router.history.push('/');
    return <Container />;
  }
};

export default AuthCallback;
