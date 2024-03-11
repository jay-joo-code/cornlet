import React from 'react';
import styled from 'styled-components';
import MainHeader from 'src/components/headers/MainHeader';
import Listings from './Listings';
import SearchOptions from './SearchOptions';

const Container = styled.div`
  width: 100%;
`;

const HomeUI = () => (
  <Container>
    <MainHeader />
    <SearchOptions />
    <Listings />
  </Container>
);

export default HomeUI;
