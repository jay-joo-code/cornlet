import React from 'react'
import { ReactComponent as CloseRaw } from 'src/assets/svgs/close.svg'
import InvertedBtn from 'src/components/buttons/InvertedBtn'
import IconContainer from 'src/components/displays/IconContainer'
import Space from 'src/components/layouts/Space'
import useFilters from 'src/util/hooks/useFilters'
import useIsDesktop from 'src/util/hooks/useIsDesktop'
import styled from 'styled-components'

const FilterStatus = () => {
  const filters = useFilters()

  const isDesktop = useIsDesktop()
  if (!isDesktop) return null

  return (
    <Container>
      {filters.map(({ text, cb }) => (
        <StatusBadge color='primary'>
          <BadgeText>{text}</BadgeText>
          <Space margin='0 .2rem' />
          <IconContainer padding='.5rem'>
            <CloseSVG onClick={() => cb()} />
          </IconContainer>
        </StatusBadge>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 1rem;
    flex-shrink: 0;
    white-space: nowrap;
  }
`

const StatusBadge = styled.div`
  border: 2px solid ${(props) => props.theme.brand300};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0.2rem 0.2rem 0.8rem;
`

const BadgeText = styled.p`
  font-weight: 500;
  color: ${(props) => props.theme.brand.gradient};
  font-size: 0.9rem;
  padding-top: 0.1rem;
`

const CloseSVG = styled(CloseRaw)`
  height: 0.7rem;
  width: 0.7rem;
  fill: ${(props) => props.theme.primary};
  cursor: pointer;
`

export default FilterStatus
