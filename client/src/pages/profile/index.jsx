import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ProfileIndex = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (!user) history.push('/');
  else history.push('/profile/listings');

  return <div />;
};

export default ProfileIndex;
