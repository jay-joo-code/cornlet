import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from 'src/components/fonts/Heading';
import Body from 'src/components/fonts/Body';
import { useSelector } from 'react-redux';
import MainHeader from 'src/components/headers/MainHeader';
import Navbar from 'src/components/headers/Navbar';
import Listings from './Listings';
import { FlexRow } from 'src/components/layouts/Flex';
import Btn from 'src/components/buttons/Btn';
import Space from 'src/components/layouts/Space';
import useIsDesktop from 'src/util/hooks/useIsDesktop';
import { Link } from 'react-router-dom';

const Container = styled.div`
`;

const MyListings = () => {
  const user = useSelector((state) => state.user);

  // conditionally render body text
  const defaultText = 'Create a new listing to get started';
  const hasListingsText = 'Update your listing to improve its sort rating';
  const [hasListings, setHasListings] = useState(false);
  const [text, setText] = useState(defaultText);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (hasListings) setText(hasListingsText);
    else setText(defaultText);
  }, [hasListings]);

  return (
    <Container>
      <MainHeader />
      <Navbar />
      <Space margin='3rem 0' />
      <FlexRow justifySpaceBetween alignCenter>
        <Heading>{`Hi, ${user.name.split(' ')[0]}`}</Heading>
        <Link to='/new'>
          <Btn>+ New listing</Btn>
        </Link>
      </FlexRow>
      {isDesktop && (
        <>
          <Space margin='1rem 0' />
          <Body>{text}</Body>
        </>
      )}
      <Space margin='2rem 0' />
      <Listings
        uid={user.uid}
        setHasListings={setHasListings}
      />
    </Container>
  );
};

export default MyListings;
