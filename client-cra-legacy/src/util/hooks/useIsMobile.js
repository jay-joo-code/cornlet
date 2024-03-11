import React, { useState, useEffect } from 'react';
import theme from 'src/theme';
import useWindowSize from './useWindowSize';

const useIsMobile = () => {
  const [width] = useWindowSize();
  const [isMobile, setIsMobile] = useState(width < theme.md);

  useEffect(() => {
    setIsMobile(width < theme.md);
  }, [width]);

  return isMobile;
}

export default useIsMobile;