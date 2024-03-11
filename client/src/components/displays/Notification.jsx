import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  background: #dd5850;
  text-align: center;
  line-height: 18px;
  font-size: .7rem;
  right: 0px;
  top: 0px;
  display: block;
  cursor: pointer;
`;

const Notification = (props) => (
  <Container {...props}>
    {props.text}
  </Container>
);

export default Notification;
