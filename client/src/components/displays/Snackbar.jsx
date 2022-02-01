import IconButton from '@material-ui/core/IconButton'
import { default as MuiSnackbar } from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

const Snackbar = ({ message, isOpen, setIsOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setIsOpen(false)
  }

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      action={
        <>
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      }
    />
  )
}

export default Snackbar
