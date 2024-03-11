import React from 'react';
import styled from 'styled-components';
import Badge from 'src/components/displays/Badge';

const Container = styled.div`
  & > * {
    margin-right: .5rem;
  }
`;

const StageBadges = ({ listing }) => {
  const startDate = listing.start && new Date(listing.start).toLocaleDateString();
  const endDate = listing.end && new Date(listing.end).toLocaleDateString();
  const hasDates = listing.start && listing.end;
  const badgeText = hasDates ? `${startDate} ~ ${endDate}` : listing.term;
  return (
    <Container>
      <Badge color="primary" size="sm">{badgeText}</Badge>
      {listing.sold && <Badge color="primary" size="sm" inverted>Sold</Badge>}
    </Container>
  );
};

export default StageBadges;
