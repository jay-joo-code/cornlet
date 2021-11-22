import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as CalendarRaw } from 'src/assets/svgs/calendar.svg'
import { ReactComponent as LockRaw } from 'src/assets/svgs/lock.svg'
import BmBtn from 'src/components/buttons/BmBtn'
import Btn from 'src/components/buttons/Btn'
import DetailedAvatar from 'src/components/displays/DetailedAvatar'
import ImgCarousel from 'src/components/displays/ImgCarousel'
import InfoBox from 'src/components/displays/InfoBox'
import Map from 'src/components/displays/Map'
import PolicyDisclaimer from 'src/components/displays/PolicyDisclaimer'
import Searchers from 'src/components/displays/Searchers'
import Body from 'src/components/fonts/Body'
import Heading from 'src/components/fonts/Heading'
import Subheading from 'src/components/fonts/Subheading'
import Text from 'src/components/fonts/Text'
import BackHeader from 'src/components/headers/BackHeader'
import MainHeader from 'src/components/headers/MainHeader'
import Input from 'src/components/inputs/Input'
import Space from 'src/components/layouts/Space'
import Modal from 'src/components/views/Modal'
import HoriCenter from 'src/containers/HoriCenter'
import api from 'src/util/api'
import formatListingDesc from 'src/util/helpers/formatListingDesc'
import signin from 'src/util/helpers/signin'
import useIsDesktop from 'src/util/hooks/useIsDesktop'
import useRouter from 'src/util/hooks/useRouter'
import log from 'src/util/log'
import socket from 'src/util/socket'
import styled from 'styled-components'
import DesktopListing from './DesktopListing'
import IconsSection from './IconsSection'
import MobileFooter from './MobileFooter'

const Listing = ({ listing, searchers }) => {
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
  const router = useRouter()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()

  const signedInUser = useSelector((state) => state.user)
  const chatrooms = useSelector((state) => state.chatrooms)
  const tempValues = useSelector((state) => state.tempValues)

  // create message modal
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  const handleMsgBtnClick = () => {
    const existing = chatrooms.filter((chatroom) => chatroom.listing._id === listing._id)
    if (existing.length !== 0) {
      router.push(`/profile/chat/${existing[0]._id}`)
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const createMsg = () => {
    // DB create
    // DB must be created first to get the data schema
    const reqData = {
      lid: listing._id,
      msgContent: tempValues || msg,
      searcherUid: signedInUser.uid,
      ownerUid: user.uid,
    }
    api
      .post('/chatroom/create', reqData)
      .then(({ data }) => {
        // emit socket event
        socket.emit('new chatroom', data)

        // redirect
        router.push(`/profile/chat/${data._id}`)
      })
      .catch(({ response }) => log('Listing', response))
  }

  const handleCreateMsg = () => {
    handleClose()

    if (!signedInUser) {
      // not signed in, signin
      dispatch({
        type: 'TEMP_VALUES_SET',
        payload: msg,
      })
      signin({ redirectPath: `/listing/${listing._id}` })
    } else {
      const listingChatrooms = chatrooms.filter((chatroom) => chatroom.listing._id === listing._id)
      if (listingChatrooms.length >= 1) {
        // chatroom already exists
        // append msg to existing chatroom
        const data = {
          cid: listingChatrooms[0]._id,
          type: 'txt',
          content: tempValues || msg,
          uid: signedInUser.uid,
          createdAt: new Date(),
        }
        socket.emit('msg', data)
        router.push(`/profile/chat/${listingChatrooms[0]._id}`)
      } else {
        createMsg()
      }
    }
  }

  // auto send message after sign in
  if (tempValues && signedInUser) {
    handleCreateMsg()

    dispatch({
      type: 'TEMP_VALUES_SET',
      payload: null,
    })

    return (
      <div>
        <MainHeader />
        <Body>Creating message ...</Body>
      </div>
    )
  }

  if (isDesktop)
    return (
      <DesktopListing
        listing={listing}
        searchers={searchers}
        signedInUser={signedInUser}
        handleMsgBtnClick={handleMsgBtnClick}
        open={open}
        handleClose={handleClose}
        msg={msg}
        setMsg={setMsg}
        handleCreateMsg={handleCreateMsg}
      />
    )

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
              <ImgInnerContainer>
                <ImgCarousel imgs={imgs} />
              </ImgInnerContainer>
              <Content>
                <Section>
                  <Row>
                    <Heading>{formatListingDesc(listing)}</Heading>
                    <BmBtn listing={listing} forceDesktopSize />
                  </Row>
                  <Space margin='2rem 0' />
                  <Row>
                    <IconsSection listing={listing} />
                  </Row>
                </Section>

                {/* contact section */}
                {!sold && (
                  <Section>
                    <Row marginBottom>
                      <Subheading bold>Contact</Subheading>
                    </Row>
                    <Row>
                      {!cornellOnly ||
                      (cornellOnly &&
                        signedInUser &&
                        signedInUser.email.split('@')[1] === 'cornell.edu') ? (
                        <Fullwidth>
                          <ContactContainer>
                            <DetailedAvatar
                              name={displayName || user.name}
                              src={displayName ? undefined : user.photo}
                            />
                            <Btn color='primary' inverted onClick={handleMsgBtnClick}>
                              Message
                            </Btn>
                          </ContactContainer>
                          <Searchers searchers={searchers} />
                        </Fullwidth>
                      ) : (
                        <LockSection>
                          <LockAvatar>
                            <LockSVG />
                          </LockAvatar>
                          <TextSection>
                            <Subheading bold>Restricted to Cornell</Subheading>
                            <Body muted>
                              Sign in with a @cornell.edu account to contact the owner.
                            </Body>
                          </TextSection>
                        </LockSection>
                      )}
                    </Row>
                  </Section>
                )}

                {/* sold warning info box */}
                {sold && (
                  <Section>
                    <Row>
                      <InfoBox>
                        <Text variant='h5'>This listing has been marked as sold</Text>
                      </InfoBox>
                    </Row>
                  </Section>
                )}

                <Section>
                  <Row marginBottomLarge>
                    <Subheading bold>Description</Subheading>
                  </Row>
                  <Row marginTopLarge marginBottom>
                    <Body lineHeight={1.5}>{desc}</Body>
                  </Row>
                </Section>
                <Section>
                  <Row marginBottom>
                    <Subheading bold>Location</Subheading>
                  </Row>
                  {toCampus && (
                    <Row>
                      <Body>{toCampus} km to campus</Body>
                    </Row>
                  )}
                  <Row marginBottom />
                  {lat && lng && (
                    <MapContainer>
                      <Map lat={lat} lng={lng} />
                    </MapContainer>
                  )}
                </Section>
                <Space margin='2rem 0' />
              </Content>
            </ListingSection>
          )}
        </Container>
      </Wrapper>
      <MobileFooter listing={listing} handleMsgBtnClick={handleMsgBtnClick} />
      <Modal open={open} handleClose={handleClose} heading={`Message ${user.name.split(' ')[0]}`}>
        <ModalContents>
          <Input multiline rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} />
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
  width: 100vw;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 700px;
  }
`

const ImgInnerContainer = styled.div`
  width: 90vw;
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 700px;
    margin-right: 2rem;
    height: auto;
  }

  & * {
    outline: none;
    overflow: hidden;
  }
`

const Content = styled.div`
  margin-top: 1.5rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-top: 0;
    width: 500px;
  }
`

const ListingSection = styled.div`
  @media (min-width: ${(props) => props.theme.md}px) {
    display: flex;
    padding: 4rem 0 8rem 0;
  }
`

const Section = styled.div`
  margin: 1rem 0 3.5rem 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-top: 0;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0.2rem 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    margin: 0 0 0.5rem 0;
  }

  // marginTop
  margin-top: ${(props) => (props.marginTop ? '1rem' : '')};

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-top: ${(props) => (props.marginTop ? '1.2rem' : '')};
  }

  // marginTopLarge
  margin-top: ${(props) => (props.marginTopLarge ? '1.5rem' : '')};

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-top: ${(props) => (props.marginTopLarge ? '1.7rem' : '')};
  }

  // marginBottom
  margin-bottom: ${(props) => (props.marginBottom ? '1rem' : '')};

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-bottom: ${(props) => (props.marginBottom ? '1.2rem' : '')};
  }

  // marginBottomLarge
  margin-bottom: ${(props) => (props.marginBottomLarge ? '1.5rem' : '')};

  @media (min-width: ${(props) => props.theme.md}px) {
    margin-bottom: ${(props) => (props.marginBottomLarge ? '1.7rem' : '')};
  }

  // icon
  justify-content: ${(props) => (props.icon ? 'flex-start' : '')};
`

const MapContainer = styled.div`
  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 0 1rem;
  }
`

const SVGContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 2rem;
  margin-right: 0.2rem;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.6;
  }

  // mr
  margin-right: ${(props) => (props.mr ? '.5rem' : '')};
`

const CalendarSVG = styled(CalendarRaw)`
  width: 30px !important;
`

const LockSection = styled.div`
  display: flex;
  align-items: flex-start;
`

const LockSVG = styled(LockRaw)`
  height: 1rem;
  opacity: 0.6;
`

const LockAvatar = styled.div`
  height: 40px;
  width: 40px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  padding: 0.5rem;
  margin-right: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

const TextSection = styled.div`
  max-width: 270px;
`

const Fullwidth = styled.div`
  width: 100%;
`

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const MsgBtn = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 0.8rem 0;
  margin-top: 1rem;
  font-size: 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  background: ${(props) => props.theme.primary};
  color: white;

  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  & svg {
    height: 1.2rem;
    width: 1.2rem;
    fill: white;
    margin-right: 1rem;
  }
`

const ModalContents = styled.div`
  text-align: start;
`

const ModalButtonContainer = styled(HoriCenter)`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`

export default Listing
