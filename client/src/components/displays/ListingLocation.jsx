import React, { useEffect, useState } from 'react'
import getRegion from 'src/util/helpers/getRegion'
import kmToMins from 'src/util/helpers/kmToMins'
import useIsDesktop from 'src/util/hooks/useIsDesktop'
import styled from 'styled-components'
import BadgeV2 from '../displays/BadgeV2'

const ListingLocation = ({ lat, lng, toCampus }) => {
  const [region, setRegion] = useState({})
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (lat && lng) {
      setRegion(
        getRegion({
          lat,
          lng,
        })
      )
    }
  }, [lat, lng])

  if (!lat || !lng || !toCampus) return <div />

  return (
    <Container>
      <BadgeV2 color={region.color} background={region.background} label={region.label} />
      {isDesktop && <Overline>• {kmToMins(toCampus)} mins from campus</Overline>}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
`

const Overline = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.textMuted};
  font-weight: 500;
  font-size: 0.9rem;
`

export default ListingLocation
