import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useRouter from 'src/util/hooks/useRouter';
import { useSelector } from 'react-redux';
import signin from 'src/util/helpers/signin';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import useUnreadChatrooms from 'src/util/hooks/useUnreadChatrooms';
import NotifCounter from 'src/components/displays/NotifCounter';
import MainHeader from '..';
import { ReactComponent as CloseRaw } from 'src/assets/svgs/close.svg';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: white;
  height: 100vh;
  padding: 0 1rem;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 5.5rem .8rem 1rem 0;
`;

export const NavContent = styled.div`
  padding: 1rem;
`;

export const HoriLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  margin: 2rem 0;
`;

export const NavContainer = styled.div`
  margin: 2rem 0;
  display: flex;
`;

export const NavElt = styled.nav`
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const CloseSVG = styled(CloseRaw)`
  height: 1.5rem;
  width: 1.5rem;
  opacity: .8;
  cursor: pointer;
  padding: .1rem;
`

const FullscreenNav = ({ setIsMenuOpen }) => {
  const router = useRouter();
  const handleRedirect = (path) => {
    router.history.push(path)
    setIsMenuOpen(false);
  }

  const user = useSelector(state => state.user);
  const unreadChatroomsCount = useUnreadChatrooms().length;

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
      <Header>
        <CloseSVG onClick={() => setIsMenuOpen(false)} />
      </Header>
      <NavContent>
        <NavContainer>
          <NavElt onClick={() => handleRedirect('/')}>Home</NavElt>
        </NavContainer>
        <NavContainer>
          <NavElt onClick={() => handleRedirect('/new')}>New Listing</NavElt>
        </NavContainer>
        {user
          ? (
            <div>
              <HoriLine />
              <NavContainer>
                <NavElt onClick={() => handleRedirect('/profile')}>My Listings</NavElt>
              </NavContainer>
              <NavContainer>
                <NavElt onClick={() => handleRedirect('/profile/chat')}>Messages</NavElt>
                {unreadChatroomsCount > 0 && <NotifCounter>{unreadChatroomsCount}</NotifCounter>}
              </NavContainer>
              <NavContainer>
                <NavElt onClick={() => handleRedirect('/profile/settings')}>Settings</NavElt>
              </NavContainer>
            </div>
          )
          : (
            <NavContainer>
              <NavElt onClick={signin}>Sign in</NavElt>
            </NavContainer>
          )
        }
      </NavContent>
    </Container>
  )
};

export default FullscreenNav;
