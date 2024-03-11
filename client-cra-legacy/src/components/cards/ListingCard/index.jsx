import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BinRaw from 'src/assets/svgs/bin.svg'
import PencilRaw from 'src/assets/svgs/pencil.svg'
import BmBtn from 'src/components/buttons/BmBtn'
import Btn from 'src/components/buttons/Btn'
import TextBtn from 'src/components/buttons/TextBtn'
import Body from 'src/components/fonts/Body'
import ListingInfo from 'src/components/fonts/ListingInfo'
import Text from 'src/components/fonts/Text'
import { FlexRow } from 'src/components/layouts/Flex'
import Space from 'src/components/layouts/Space'
import Modal from 'src/components/views/Modal'
import theme from 'src/theme'
import api from 'src/util/api'
import getShortAddr from 'src/util/helpers/getShortAddr'
import log from 'src/util/log'
import styled from 'styled-components'

const ListingCard = ({ listing, edit, reload }) => {
  const { _id, addr, imgs, sold, active, thumbnailIdx, availRooms } = listing
  const editPath = edit ? `/listing/${_id}/edit` : `/listing/${_id}`
  const listingPath = `/listing/${_id}`

  // active toggling
  const [activeLocal, setActiveLocal] = useState(true)

  useEffect(() => {
    setActiveLocal(active)
  }, [active])

  const handleChange = () => {
    setActiveLocal(!activeLocal)
    api
      .put(`/listing/${_id}/update`, { active: !activeLocal })
      .catch((e) => log('ERROR ListingCard', e))
  }

  // handle delete
  const [deleteModal, setDeleteModal] = useState(false)
  const handleClose = () => {
    setDeleteModal(false)
  }
  const handleDelete = () => {
    api
      .put(`/listing/${_id}/update`, { active: false, deleted: true })
      .then(() => {
        handleClose()
        reload()
      })
      .catch((e) => log('ERROR ListingCard', e))
  }
  const handleDeactivate = () => {
    setActiveLocal(false)
    handleClose()
    api.put(`/listing/${_id}/update`, { active: false }).catch((e) => log('ERROR ListingCard', e))
  }

  return (
    <Container>
      {!edit && (
        <CornerBtn>
          <BmBtn listing={listing} />
        </CornerBtn>
      )}
      <Link to={listingPath}>
        <ImgContainer>
          <Img
            src={imgs[thumbnailIdx || 0]}
            faded={sold}
            alt='cornlet listing property photos for cornell'
          />
        </ImgContainer>
        <Space margin='.8rem 0' />
        {edit ? (
          <Text variant='p' fontWeight={500} maxLines={1}>
            {getShortAddr(addr)}
          </Text>
        ) : (
          <ListingInfo listing={listing} />
        )}
      </Link>

      {/* edit tools for listing owner */}
      {edit && (
        <EditTools>
          <FormControlLabel
            control={
              <Switch checked={activeLocal} onChange={handleChange} color='primary' size='small' />
            }
            label={activeLocal ? 'Active' : 'Inactive'}
          />
          <RightSection>
            <Link to={editPath}>
              <Pencil />
            </Link>
            <Bin onClick={() => setDeleteModal(true)} />
          </RightSection>
        </EditTools>
      )}

      {/* delete modal */}
      <Modal open={deleteModal} handleClose={handleClose} heading='Delete Listing'>
        <ModalContainer>
          <Body>Are you sure you wish to delete your listing?</Body>
          <Body>Deleted data cannot be recovered.</Body>
          <Body>You can temporarily deactivate the listing</Body>
          <Body>if you wish to use it again in the future.</Body>
          <Space margin='1rem 0' />
          <FlexRow justifyEnd fullWidth>
            <TextBtn colorHex={theme.textMuted} onClick={handleDelete}>
              Delete
            </TextBtn>
            <Space margin='0 .5rem' />
            <Btn color='primary' inverted onClick={handleDeactivate}>
              Deactivate
            </Btn>
          </FlexRow>
        </ModalContainer>
      </Modal>
    </Container>
  )
}

const Container = styled.div`
  width: 90vw;
  padding: 1rem 0.5rem;
  position: relative;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 25%;
  }
`

const CornerBtn = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  z-index: 2;
  cursor: pointer;
`

const ImgContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 70%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.md}px) {
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
    }
  }
`

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  // hide alt text
  color: rgba(0, 0, 0, 0) !important;

  // faded
  opacity: ${(props) => (props.faded ? '.5' : '')};
`

const EditTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 0.2rem;
`

const RightSection = styled.div`
  display: flex;

  & > * {
    margin-left: 0.5rem;
  }
`

const Pencil = styled(PencilRaw)`
  height: 1rem;
  width: 1rem;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

const Bin = styled(BinRaw)`
  height: 1rem;
  width: 1rem;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & p:nth-child(2n-1) {
    margin-top: 1rem;
  }
`

export default ListingCard
