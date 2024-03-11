import React from 'react';
import styled from 'styled-components';
import Dropdown from 'src/components/views/Dropdown';
import BmListing from './BmListing';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Container = styled.div`
  max-height: 350px;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 400px;
  }

  & > div {
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }

  & > div:last-child {
    border-bottom: none;
  }
`;

const DropdownContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;

const NoBm = styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem;
`;

const BmDropdown = ({ listings, dropdown, setDropdown }) => {
  const noBmText = <NoBm>No bookmarks!</NoBm>;

  return (
    <Dropdown show={dropdown} setShow={setDropdown} alignRight>
      <DropdownContent>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <Container>
            {(!listings || !listings.length)
              ? noBmText
              : listings.map((listing) => (
                <BmListing key={listing._id} listing={listing} />
              ))
            }
          </Container>
        </PerfectScrollbar>
      </DropdownContent>
    </Dropdown>
  );
};

export default BmDropdown;
