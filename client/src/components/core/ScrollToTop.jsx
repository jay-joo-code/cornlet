import { useEffect, useState } from 'react';
import UpRaw from 'src/assets/svgs/up.svg';
import useIsDesktop from 'src/util/hooks/useIsDesktop';
import useRouter from 'src/util/hooks/useRouter';
import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 50%;
  background: ${props => props.theme.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);

  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const UpSVG = styled(UpRaw)`
  height: 1.2rem;
  width: 1.2rem;
  fill: white;
`

const ScrollToTop = () => {
  // scroll to top on route change
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.location]);

  // for mobile, if not currently at top
  // render back to top button
  const isDesktop = useIsDesktop();
  const [isAtTop, setIsAtTop] = useState(true);
  window.onscroll = function() {
    if(window.pageYOffset === 0) {
      setIsAtTop(true);
    }
    else {
      setIsAtTop(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return null

  // if (isDesktop || isAtTop) return <div />;

  // return (
  //   <Container onClick={handleClick}>
  //     <UpSVG />
  //   </Container>
  // );
};

export default ScrollToTop;
