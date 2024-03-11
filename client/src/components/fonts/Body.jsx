import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.p`
  opacity: 1;
  font-size: 1rem;
  font-weight: 400;
  
  white-space: pre-line;
  line-height: 1.2;
  word-break: break-word;
  color: ${props => props.theme.text};

  // ellipsis
  text-overflow: ${(props) => (props.ellipsis ? 'ellipsis' : '')};
  overflow: ${(props) => (props.ellipsis ? 'hidden' : '')};
  white-space: ${(props) => (props.ellipsis ? 'nowrap' : '')};

  // nowrap
  white-space: ${(props) => (props.nowrap ? 'nowrap' : '')};
  
  // muted
  opacity: ${(props) => (props.muted ? '.8' : '')};
  
  // sm
  @media (min-width: ${(props) => props.theme.md}px) {
    font-size: ${(props) => (props.sm ? '.9rem' : '')};
  }

  // fontSize
  font-size: ${props => props.fontSize && props.fontSize};
  
  // color
  color: ${(props) => (props.color ? props.theme[props.color] : '')};

  // colorHex
  color: ${props => props.colorHex && props.colorHex};

  // lineHeight
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '')};

  // bold
  font-weight: ${(props) => (props.bold ? 'bold' : '')};

  // fontWeight
  font-weight: ${props => props.fontWeight && props.fontWeight};

  // maxWidth
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '')};

  // margin
  margin: ${props => props.margin ? props.margin : ''};

  // pointer
  cursor: ${props => props.pointer && 'pointer'};

  // underline
  text-decoration: ${props => props.underline && 'underline'};
`;

const Body = (props) => (
  <StyledBody {...props}>
    {props.children}
  </StyledBody>
);

export default Body;
