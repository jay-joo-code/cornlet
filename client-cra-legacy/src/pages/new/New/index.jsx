import React from 'react';
import styled from 'styled-components';
import ListingForm from 'src/components/forms/ListingForm';
import BackHeader from 'src/components/headers/BackHeader';
import MainHeader from 'src/components/headers/MainHeader';
import RenderOn from 'src/containers/RenderOn';

const Container = styled.div`

`;

const New = ({ user }) => (
  <Container>
    <MainHeader />
    <RenderOn mobile>
      <BackHeader label='Back' />
    </RenderOn>
    <ListingForm
      user={user}
    />
  </Container>
);

export default New;
