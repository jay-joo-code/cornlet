import React from 'react';
import styled from 'styled-components';
import ListingForm from 'src/components/forms/ListingForm';
import BackHeader from 'src/components/headers/BackHeader';
import MainHeader from 'src/components/headers/MainHeader';
import RenderOn from 'src/containers/RenderOn';
import Space from 'src/components/layouts/Space';

const Container = styled.div`

`;

const Edit = ({ user, initialValues }) => (
  <Container>
    <MainHeader />
    <Space margin='2rem 0' />
    <BackHeader to="/profile" label='Return to profile' />
    <ListingForm
      user={user}
      initialValues={initialValues}
    />
  </Container>
);

export default Edit;
