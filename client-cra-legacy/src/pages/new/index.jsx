import React from 'react';
import { useSelector } from 'react-redux';
import New from './New';

const NewIndex = () => {
  const user = useSelector((state) => state.user);

  return (
    <New
      user={user}
    />
  );
};

export default NewIndex;
