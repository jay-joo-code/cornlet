import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/fonts/Body';
import listingDatestring from 'src/util/helpers/listingDatestring';
import log from 'src/util/log';
import api from 'src/util/api';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingInfo from 'src/components/fonts/ListingInfo';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 5.3rem;
`;

const Img = styled.img`
  width: 30%;
  height: 100%;
  object-fit: cover;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  padding: .2rem .5rem;
`;

const BmListing = ({ listing }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleRemove = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        dispatch({
          type: 'BM_REMOVE',
          payload: listing,
        });
      }
      else {
        dispatch({
          type: 'USER_BM_REMOVE',
          payload: listing,
        })

        await api.put(`/user/${user._id}/bm/remove/${listing._id}`)
          .catch(({ response }) => log('BmListing', response))
      }
    }
    catch (error) {
      log('BmListing', error);
    }
  };

  return (
    <div>
      <Link to={`/listing/${listing._id}`}>
        <Container>
          <Img src={listing.imgs[0]} />
          <Data>
            <ListingInfo isHideDates listing={listing} isShowingClose onCloseClick={handleRemove} />
          </Data>
        </Container>
      </Link>
    </div>
  );
};

export default BmListing;
