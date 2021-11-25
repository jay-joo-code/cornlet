import React, { useRef } from 'react'
import styled from 'styled-components'

const Dropdown = ({ show, setShow, children, alignLeft, alignRight, alignTop, ...rest }) => {
  const handleClick = (e) => {
    e.stopPropagation()
  }
  const DropdownRef = useRef()

  const closeDropdown = () => {
    setShow(false)
  }

  const handleOverlayClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    closeDropdown()
  }

  return (
    <>
      <Container
        ref={DropdownRef}
        onClick={handleClick}
        show={show}
        alignLeft={alignLeft}
        alignRight={alignRight}
        alignTop={alignTop}
        {...rest}>
        {children}
      </Container>
      {show && <Overlay onClick={handleOverlayClick} />}
    </>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
`

const Container = styled.div`
  position: absolute;
  margin-top: 10px;
  left: 0;
  right: 0;
  z-index: 999;

  @media (min-width: ${(props) => props.theme.md}px) {
    top: 40px;
    width: auto;

    // alignLeft
    left: ${(props) => props.alignLeft && 'initial'};
    right: initial;

    // alignRight
    left: ${(props) => props.alignRight && '-375px'};
    right: ${(props) => props.alignRight && '0'};

    // alignTop
    top: ${(props) => (props.alignTop ? '0' : '')};
  }

  & div {
    white-space: nowrap;
    flex-shrink: 0;
  }

  // show
  display: ${(props) => (props.show ? '' : 'none')};

  // alignTop
  margin-top: ${(props) => (props.alignTop ? '0' : '')};
`

export default Dropdown
