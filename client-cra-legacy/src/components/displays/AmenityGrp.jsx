import React from 'react';
import styled from 'styled-components';
import Body from '../fonts/Body';

const AmenityGrpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  margin: 1rem 1rem 0 0;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.md}px) {
    width: 5rem;
  }

  // active
  opacity: ${(props) => (props.active ? '.9' : '.3')};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: .5rem;

  & > svg {
    height: 1.7rem;
    width: 1.7rem;
  }
`;

export const LineTwo = styled(Body)`
  // lineTwo
  opacity: ${(props) => (props.lineTwo ? '' : '0')};
`;

const AmenityGrp = ({
  icon, label, active, onClick,
}) => {
  const lineOne = label.split(' ')[0];
  const lineTwo = label.split(' ')[1];

  return (
    <AmenityGrpContainer
      onClick={onClick}
      active={active}
    >
      <Row>
        {icon}
      </Row>
      <Body sm>{lineTwo ? lineOne : label}</Body>
      <LineTwo sm lineTwo={lineTwo}>{lineTwo || lineOne}</LineTwo>
    </AmenityGrpContainer>
  );
};

export default AmenityGrp;
