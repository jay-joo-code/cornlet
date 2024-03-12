import React from 'react'
import ShowerSVG from 'src/assets/svgs/shower-outlined.svg'
import BedSVG from 'src/assets/svgs/bed-outlined.svg'
import CalendarSVG from 'src/assets/svgs/calendar.svg'
import PersonSVG from 'src/assets/svgs/person.svg'
import Body from 'src/components/fonts/Body'
import { FlexRow } from 'src/components/layouts/Flex'
import getDateString from 'src/util/helpers/getDateString'
import styled from 'styled-components'

const IconsSection = ({ listing }) => {
  const { bathrooms, maleRoommates, femaleRoommates } = listing || {}

  return (
    <Container>
      <FlexRow alignCenter>
        <SVGContainer>
          <CalendarSVG />
        </SVGContainer>
        <IconLabel>{getDateString(listing, { isNumeric: true })}</IconLabel>
      </FlexRow>
      {bathrooms !== 0 && (
        <FlexRow>
          <SVGContainer>
            <ShowerSVG />
          </SVGContainer>
          <TextContainer>
            <IconLabel>{bathrooms} bathrooms</IconLabel>
            <IconDesc>
              0.5 bathrooms is a "half bathroom" with just a toilet and sink, with no tub or shower.
            </IconDesc>
          </TextContainer>
        </FlexRow>
      )}
      {(maleRoommates !== 0 || femaleRoommates !== 0) && (
        <FlexRow>
          <SVGContainer>
            <PersonSVG />
          </SVGContainer>
          <TextContainer>
            <IconLabel>{maleRoommates + femaleRoommates} roommate(s) during sublet</IconLabel>
            <IconDesc>
              You will have {maleRoommates > 0 ? `${maleRoommates} male roommates ` : ''}
              {maleRoommates > 0 && femaleRoommates > 0 ? 'and ' : ''}
              {femaleRoommates > 0 ? `${femaleRoommates} female roommates ` : ''}
              for the duration of the sublet.
            </IconDesc>
          </TextContainer>
        </FlexRow>
      )}
      {maleRoommates === 0 && femaleRoommates === 0 && (
        <FlexRow>
          <SVGContainer>
            <BedSVG />
          </SVGContainer>
          <TextContainer>
            <IconLabel>Entire place</IconLabel>
            <IconDesc>
              You will have the entire place to yourself for the duration of the sublet.
            </IconDesc>
          </TextContainer>
        </FlexRow>
      )}
    </Container>
  )
}

const Container = styled.div`
  & > div {
    margin-bottom: 1.5rem;
  }
`

const SVGContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 0.8rem;

  & svg {
    width: 1.7rem;
    height: 1.7rem;
  }

  @media (min-width: ${(props) => props.theme.md}px) {
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`

const TextContainer = styled.div``

const IconLabel = styled(Body)`
  font-weight: 500;
  font-size: 1rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 1.2rem;
  }
`

const IconDesc = styled(Body)`
  margin-top: 0.3rem;
  font-size: 0.9rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: 1rem;
  }
`

export default IconsSection
