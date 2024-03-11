import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  display: inline-block;
  left: 0px;
  top: 2rem;
  z-index: 10;
  background:
  rgb(255, 255, 255) none repeat scroll 0% 0%;
  border: 0.5px solid
  rgba(118, 118, 118, 0.28);
  border-radius: 12px;
  box-shadow:
  rgba(0, 0, 0, 0.15) 0px 10px 37px;
  max-width: 80vw;
  overflow: auto;
  max-height: calc(-152px + 100vh);
  visibility: visible;
  padding: 1rem 2rem;
`;

const Label = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.green};
`;

const Popup = ({ content, label, ...rest }) => (
  <Container {...rest}>
    <Label>{label}</Label>
    {content}
  </Container>
);

export default Popup;
