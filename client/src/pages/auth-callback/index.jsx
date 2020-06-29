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

  const authing = useSelector(state => state.authing);
  const router = useRouter();

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
