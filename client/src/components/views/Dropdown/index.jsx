import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useOnOutsideClick from 'src/util/hooks/useOnOutsideClick';

const Container = styled.div`
  position: absolute;
  margin-top: 10px;
  left: 0;
  right: 0;
  z-index: 5;

  @media (min-width: ${(props) => props.theme.md}px) {
    top: 40px;
    width: auto;

    // alignLeft
    left: ${(props) => (props.alignLeft ? 'initial' : '-200px')};
    right: ${(props) => (props.alignLeft ? 'initial' : 'initial')};

    // alignTop
    top: ${(props) => (props.alignTop ? '0' : '')};
  }
  
  border-radius: 2px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  border: 1px solid rgba(0, 0, 0, .05);

  overflow: hidden;

  & div {
    white-space: nowrap;
    flex-shrink: 0;
  }

  // show
  display: ${(props) => (props.show ? '' : 'none')};

  // alignTop
  margin-top: ${(props) => (props.alignTop ? '0' : '')};
`;

const Dropdown = ({
  show, setShow, children, alignLeft, alignTop, ...rest
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const DropdownRef = useRef();
  const closeDropdown = () => {
    setShow(false);
  };
  useOnOutsideClick(DropdownRef, closeDropdown);

  return (
    <Container
      ref={DropdownRef}
      onClick={handleClick}
      show={show}
      alignLeft={alignLeft}
      alignTop={alignTop}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Dropdown;
