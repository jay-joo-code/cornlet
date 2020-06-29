import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useRouter from 'src/util/hooks/useRouter';
import { useSelector } from 'react-redux';
import signin from 'src/util/helpers/signin';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: white;
  height: 80vh;

  padding: 2rem;
`;

export const HoriLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  margin: 2rem 0;
`;

export const NavContainer = styled.div`
  margin: 2rem 0;
`;

export const NavElt = styled.nav`
  font-size: 1.8rem;
  cursor: pointer;
`;

const FullscreenNav = ({ setIsMenuOpen }) => {
  const router = useRouter();
  const handleRedirect = (path) => {
    router.history.push(path)
    setIsMenuOpen(false);
  }

  const user = useSelector(state => state.user);

  // prevent scroll
  const targetRef = React.createRef();
  useEffect(() => {
    window.scrollTo(0, 0);
    disableBodyScroll(targetRef);

    return () => {
      clearAllBodyScrollLocks();
    }
  }, [])

  return (
    <Container ref={targetRef}>
      <NavContainer>
        <NavElt onClick={() => handleRedirect('/')}>Home</NavElt>
      </NavContainer>
      <NavContainer>
        <NavElt onClick={() => handleRedirect('/')}>FAQs</NavElt>
      </NavContainer>
      <NavContainer>
        <NavElt onClick={() => handleRedirect('/new')}>New Listing</NavElt>
      </NavContainer>
      {user
        ? (
          <div>
            <HoriLine />
            <NavContainer>
              <NavElt onClick={() => handleRedirect('/profile')}>My Profile</NavElt>
            </NavContainer>
            <NavContainer>
              <NavElt onClick={() => handleRedirect('/profile/chat')}>Messages</NavElt>
            </NavContainer>
          </div>
        )
        : (
          <NavContainer>
            <NavElt onClick={signin}>Sign in</NavElt>
          </NavContainer>
        )
      }
      
    </Container>
  )
};

export default FullscreenNav;