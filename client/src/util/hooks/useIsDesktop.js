import React, { useEffect, useState } from 'react';
import theme from 'src/theme';
import useWindowSize from './useWindowSize';

function useIsDesktop() {
  const [width, height] = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(width >= theme.md);

  useEffect(() => {
    setIsDesktop(width >= theme.md);
  }, [width]);

  return isDesktop;
}

export default useIsDesktop;