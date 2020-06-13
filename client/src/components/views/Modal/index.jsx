import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import { ReactComponent as CloseRaw } from 'src/assets/svgs/close.svg';
import Heading from 'src/components/fonts/Heading';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const Container = styled.div`
  background: white;
  
  padding: 1rem;
  width: 90vw;
  min-height: 150px;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 500px;
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
`;

export const CloseSVG = styled(CloseRaw)`
  height: 1rem;
  width: 1rem;
  opacity: .7;
  cursor: pointer;
`;

export const Content = styled.div`
  text-align: center;

  & > button {
    margin-top: 1rem;
  }

  // contentPadding
  padding: ${(props) => (props.contentPadding ? '1rem 0' : '')};
`;

const Modal = ({
  heading, open, handleClose, children, contentPadding, ...rest
}) => {
  const classes = useStyles();

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
      {...rest}
    >
      <Fade in={open}>
        <Container>
          <TopRow>
            <Heading>{heading}</Heading>
            <CloseSVG onClick={handleClose} />
          </TopRow>
          <Content contentPadding={contentPadding}>
            {children}
          </Content>
        </Container>
      </Fade>
    </MaterialModal>
  );
};

export default Modal;
