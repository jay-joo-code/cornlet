import React from 'react';
import styled from 'styled-components';
import Btn from './Btn';
import Popup from './Popup';

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const PopupButton = ({
  popupContent, btnText, label, active, setActive,
}) => {
  const handleClick = () => setActive(!active);

  return (
    <Container>
      <Btn
        onClick={handleClick}
        active={active}
      >
        {btnText}
      </Btn>
      {active && <Popup content={popupContent} label={label} />}
    </Container>
  );
};

export default PopupButton;
