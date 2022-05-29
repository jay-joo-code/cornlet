import React, { useState, useEffect } from 'react'
import theme from 'src/theme'
import useWindowSize from './useWindowSize'

const useIsMobile = () => {
  const [width] = useWindowSize()
  const [isMobile, setIsMobile] = useState(width <= 375)

  useEffect(() => {
    setIsMobile(width <= 375)
  }, [width])

  return isMobile
}

export default useIsMobile
