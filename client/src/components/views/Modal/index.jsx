import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialModal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import styled from 'styled-components'
import CloseRaw from 'src/assets/svgs/close.svg'
import Heading from 'src/components/fonts/Heading'

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none !important',
  },
}))

const Modal = ({ heading, open, handleClose, children, contentPadding, ...rest }) => {
  const classes = useStyles()

  return (
    <MaterialModal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...rest}>
      <Fade in={open}>
        <Container>
          <TopRow>
            <Heading>{heading}</Heading>
            <CloseSVG onClick={handleClose} />
          </TopRow>
          <Content contentPadding={contentPadding}>{children}</Content>
        </Container>
      </Fade>
    </MaterialModal>
  )
}

const Container = styled.div`
  background: white;
  outline: none !important;

  padding: 1rem;
  width: 90vw;
  min-height: 150px;
  border-radius: 8px;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: unset;
    max-width: 80vw;
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const CloseSVG = styled(CloseRaw)`
  height: 1rem;
  width: 1rem;
  opacity: 0.7;
  cursor: pointer;
`

const Content = styled.div`
  text-align: center;

  & > button {
    margin-top: 1rem;
  }

  // contentPadding
  padding: ${(props) => (props.contentPadding ? '1rem 0' : '')};
`

export default Modal
