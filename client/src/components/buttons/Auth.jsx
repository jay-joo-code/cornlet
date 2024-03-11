import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Google } from 'src/assets/svgs/google.svg';
import Avatar from 'src/components/displays/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'src/components/displays/Loading';
import signin from 'src/util/helpers/signin';
import Body from '../fonts/Body';

const SignIn = styled(Google)`
  height: 30px;
  width: 30px
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  background: white;
  padding: .5rem;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`

`;

const Auth = ({ border }) => {
  const user = useSelector((state) => state.user);

  if (user) {
    return (
      <Avatar
        src={user.photo}
        path="/profile"
        border={border}
      />
    );
  }

  return (
    <Body bold pointer onClick={signin}>Sign in</Body>
  );
};

export default Auth;
