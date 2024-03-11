import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0%, 100% {
    animation-timing-function: ease-in-out;
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

const Animation = styled.div`
  display: inline-block;
  transform: translateZ(1px);
  
  &>div {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin: 8px;
    border-radius: 50%;
    background: ${(props) => props.theme.primary};
    animation: ${rotation} 5s ease-in-out infinite;
  }
`;

const Loading = () => (
  <Animation>
    <div />
  </Animation>
);

export default Loading;
