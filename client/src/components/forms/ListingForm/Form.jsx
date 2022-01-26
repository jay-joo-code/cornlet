import React, { useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Btn from 'src/components/buttons/Btn'
import api from 'src/util/api'
import log from 'src/util/log'
import { useHistory, Prompt } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useRouter from 'src/util/hooks/useRouter'
import Modal from 'src/components/views/Modal'
import Body from 'src/components/fonts/Body'
import FormContents from './FormContents'
import PolicyDisclaimer from 'src/components/displays/PolicyDisclaimer'
import signin from 'src/util/helpers/signin'

const Form = styled.form`
  @media (min-width: ${(props) => props.theme.md}px) {
    max-width: 700px;
  }
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`

const FormComponent = ({ user, initialValues }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const tempValues = useSelector((state) => state.tempValues)
  const router = useRouter()

  // configure inital values
  const defaultValues = {
    addr: '',
    price: 0,
    start: new Date(),
    end: new Date(),
    type: 'apt',
    totalRooms: 0,
    availRooms: 0,
    bathrooms: 0,
    femaleRoommates: 0,
    maleRoommates: 0,
    amenities: [],
    imgs: [],
    thumbnailIdx: 0,
    desc: '',
    active: true,
    sold: false,
    cornellOnly: false,
  }
  const devValues = {
    addr: 'test addr',
    price: 100,
    start: new Date(),
    end: new Date(),
    type: 'apt',
    totalRooms: 3,
    availRooms: 1,
    bathrooms: 1.5,
    femaleRoommates: 1,
    maleRoommates: 2,
    amenities: [],
    imgs: [
      'https://firebasestorage.googleapis.com/v0/b/cornlet-prod.appspot.com/o/temp%2Fforest.jpg?alt=media&token=967fa2f7-3730-4ebf-9b05-aa3c4cafeb59',
      'https://firebasestorage.googleapis.com/v0/b/cornlet-prod.appspot.com/o/user%2F111196813972660835996%2Fcollege-dorm-room-200395471-001-58a1a2a55f9b58819c128c01.jpg?alt=media&token=03a743d2-87c4-4831-a4fd-354bc8f7a2cd',
    ],
    thumbnailIdx: 0,
    desc: 'test description',
    active: true,
    sold: false,
    cornellOnly: false,
  }
  const dynInitValues =
    initialValues ||
    tempValues ||
    (process.env.NODE_ENV === 'development' && devValues) ||
    defaultValues

  // error modal
  const [modal, setModal] = useState(false)
  const handleClose = () => {
    setModal(false)
  }
  const [showPrompt, setShowPrompt] = useState(true)

  // define form
  const formik = useFormik({
    initialValues: dynInitValues,
    validationSchema: Yup.object({
      addr: Yup.string().required('Required'),
      toCampus: Yup.number().required('Please select an address from the address options dropdown'),
      price: Yup.number().required('Required'),
      start: Yup.object().nullable(),
      end: Yup.object().nullable(),
      type: Yup.string().required('Required'),
      imgs: Yup.array().of(Yup.string()).required('Required'),
      desc: Yup.string().required('Required'),
      active: Yup.boolean().required('Required'),
      sold: Yup.boolean().required('Required'),
      cornellOnly: Yup.boolean().required('Required'),
    }),
    onSubmit: (values) => {
      if (initialValues) {
        api
          .put(`/listing/${initialValues._id}/update`, values)
          .then(() => {
            history.push('/profile')
          })
          .catch((e) => log('ERROR ListingForm update', e))
      } else if (user) {
        api
          .post('/listing/create', { ...values, user })
          .then(() => {
            history.push('/profile/listings')
          })
          .catch(({ response }) => {
            log('ERROR new listing submit form', response)
          })
      } else {
        dispatch({
          type: 'TEMP_VALUES_SET',
          payload: values,
        })
        signin({
          redirectPath: '/new',
        })
      }
    },
  })

  if (tempValues && user) {
    api
      .post('/listing/create', { ...tempValues, user })
      .then(() => {
        dispatch({
          type: 'TEMP_VALUES_SET',
          payload: null,
        })
        setShowPrompt(false)
        router.history.push('/profile/listings')
      })
      .catch((e) => {
        log('ERROR new listing submit form', e)
      })
    return <div>Creating listing...</div>
  }

  // error on submit
  const hasErrors = Object.keys(formik.errors).length !== 0
  const handleSubmitAttempt = () => {
    if (hasErrors) {
      setModal(true)
    } else {
      setShowPrompt(false)
    }
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Prompt
        when={showPrompt}
        message={() =>
          'Are you sure you wish to leave without saving?\nChanges will not be saved!\nClick the "Save" button at the bottom of the page to save.'
        }
      />
      <FormContents formik={formik} user={user} />
      <PolicyDisclaimer action='saving listings on Cornlet' />
      <Center>
        <Btn color='primary' inverted type='submit' onClick={handleSubmitAttempt}>
          Save Listing
        </Btn>
      </Center>
      <Modal open={modal} handleClose={handleClose} heading='Oops!' contentPadding>
        <Body>There were errors in the form.</Body>
        <Body>Please fix the errors before saving the listing.</Body>
        <Btn color='primary' inverted onClick={handleClose}>
          Go back
        </Btn>
      </Modal>
    </Form>
  )
}

export default FormComponent
