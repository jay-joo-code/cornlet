import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.h2`
  opacity: .9;
  font-size: 1.2rem;

  white-space: pre-line;
  line-height: 1.2;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;

  // bold
  font-weight: ${(props) => (props.bold ? 'bold' : '')};

  // fontWeight
  font-weight: ${props => props.fontWeight && props.fontWeight};
`;

const Subheading = ({ children, bold, ...rest }) => (
  <StyledBody bold={bold} {...rest}>
    {children}
  </StyledBody>
);

export default Subheading;
