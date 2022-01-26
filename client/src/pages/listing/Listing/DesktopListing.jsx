import React from 'react'
import kmToMins from 'src/util/helpers/kmToMins'
import BmBtn from 'src/components/buttons/BmBtn'
import Btn from 'src/components/buttons/Btn'
import InfoBox from 'src/components/displays/InfoBox'
import Map from 'src/components/displays/Map'
import PolicyDisclaimer from 'src/components/displays/PolicyDisclaimer'
import Body from 'src/components/fonts/Body'
import Subheading from 'src/components/fonts/Subheading'
import Text from 'src/components/fonts/Text'
import BackHeader from 'src/components/headers/BackHeader'
import MainHeader from 'src/components/headers/MainHeader'
import Input from 'src/components/inputs/Input'
import { FlexRow } from 'src/components/layouts/Flex'
import Space from 'src/components/layouts/Space'
import Modal from 'src/components/views/Modal'
import HoriCenter from 'src/containers/HoriCenter'
import formatListingDesc from 'src/util/helpers/formatListingDesc'
import styled from 'styled-components'
import IconsSection from './IconsSection'
import ImgPanels from './ImgPanels'
import RightSidePanel from './RightSidePanel'
import ListingLocation from 'src/components/displays/ListingLocation'

const DesktopListing = ({
  listing,
  searchers,
  signedInUser,
  handleMsgBtnClick,
  open,
  handleClose,
  msg,
  setMsg,
  handleCreateMsg,
}) => {
  const {
    imgs,
    addr,
    price,
    user,
    desc,
    sold,
    displayName,
    cornellOnly,
    totalRooms,
    availRooms,
    bathrooms,
    type,
    toCampus,
    maleRoommates,
    femaleRoommates,
    lat,
    lng,
  } = listing

  return (
    <div>
      <MainHeader />
      <Wrapper>
        <Container>
          <BackHeader label='Go back' />
          {!listing.active || listing.deleted ? (
            <Body>This listing is inactive or has been deleted by the owner.</Body>
          ) : (
            <ListingSection>
              <ImgPanels imgs={imgs} />
              <Space margin='3rem 0' />
              <FlexRow justifySpaceBetween>
                <Content>
                  <Section>
                    <FlexRow justifySpaceBetween alignCenter>
                      <Text variant='h2'>{formatListingDesc(listing)}</Text>
                      <BmBtn listing={listing} />
                    </FlexRow>
                    <Space margin='2rem 0' />
                    <IconsSection listing={listing} />
                  </Section>

                  {/* sold warning info box */}
                  {sold && (
                    <Section>
                      <InfoBox>
                        <Text variant='h5'>This listing has been marked as sold</Text>
                      </InfoBox>
                    </Section>
                  )}

                  {/* location section */}
                  <Section>
                    <Subheading bold>Location</Subheading>
                    <Space margin='1.5rem 0' />
                    {toCampus && (
                      <ListingLocation
                        lat={listing.lat}
                        lng={listing.lng}
                        toCampus={listing.toCampus}
                      />
                    )}
                    <Space margin='1.5rem 0' />
                    {lat && lng && (
                      <div>
                        <Map lat={lat} lng={lng} />
                      </div>
                    )}
                  </Section>

                  {/* description section */}
                  <Section>
                    <Subheading bold>Description</Subheading>
                    <Space margin='1.5rem 0' />
                    <Body lineHeight={1.5}>{desc}</Body>
                  </Section>
                </Content>
                <RightSidePanelContainer>
                  <RightSidePanel
                    listing={listing}
                    handleMsgBtnClick={handleMsgBtnClick}
                    signedInUser={signedInUser}
                    searchers={searchers}
                  />
                </RightSidePanelContainer>
              </FlexRow>
            </ListingSection>
          )}
        </Container>
      </Wrapper>
      <Modal open={open} handleClose={handleClose} heading={`Message ${user.name.split(' ')[0]}`}>
        <ModalContents>
          <Input multiline rows={10} value={msg} onChange={(e) => setMsg(e.target.value)} />
          <ModalButtonContainer>
            <Btn color='primary' inverted onClick={handleCreateMsg}>
              Send Message
            </Btn>
          </ModalButtonContainer>
          <PolicyDisclaimer action='sending a message on Cornlet' />
        </ModalContents>
      </Modal>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.md}px) {
    padding-top: 3rem;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
`

const Content = styled.div`
  margin-top: 1.5rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-top: 0;
    flex: 2;
    max-width: 700px;
    padding: 0 1rem;
  }
`

const ListingSection = styled.div`
  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 4rem 0 8rem 0;
  }
`

const Section = styled.div`
  margin: 1rem 0 3.5rem 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-top: 0;
  }
`

const ModalContents = styled.div`
  text-align: start;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 50vw;
  }
`

const RightSidePanelContainer = styled.div`
  width: 20%;
  min-width: 300px;
`

const ModalButtonContainer = styled(HoriCenter)`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`

export default DesktopListing
