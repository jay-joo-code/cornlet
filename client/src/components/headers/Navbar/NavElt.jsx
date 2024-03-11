import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import NotifCounter from 'src/components/displays/NotifCounter';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  
  // selected
  border-bottom: ${(props) => (props.selected ? `3px solid ${props.theme.primary}` : '')};
`;

const Label = styled.p`
  opacity: .8;

  // notifCount
  margin-right: ${props => props.notifCount && '.5rem'};
  
  // selected;
  opacity: ${(props) => (props.selected ? '1' : '')};
  color: ${(props) => (props.selected ? props.theme.primary : '')};
`;

const NavElt = ({ label, to, notifCount }) => {
  const { pathname } = useLocation();
  const selected = pathname.includes(to);

  return (
    <Link to={to}>
      <Container selected={selected}>
        <Label selected={selected} notifCount={notifCount}>{label}</Label>
        {notifCount > 0 && <NotifCounter sm>{notifCount}</NotifCounter>}
      </Container>
    </Link>
  );
};

export default NavElt;
