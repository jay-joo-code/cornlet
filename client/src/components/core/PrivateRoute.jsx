import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import signin from 'src/util/helpers/signin';
import MainHeader from '../headers/MainHeader';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  if (!user || !user.name) {
    signin();
    return <MainHeader />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
