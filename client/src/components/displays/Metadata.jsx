import React from 'react';
import styled from 'styled-components';
import Eye from 'src/assets/svgs/eye.svg';

const Container = styled.div`
  display: flex;
  opacity: .7;
  font-size: .8rem;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 0 .4rem 0 0;
  display: flex;
  align-items: center;
`;

const SEye = styled(Eye)`
  width: .8rem;
  height: .8rem;
  margin-right: .1rem;
  opacity: .6;
`;

const Metadata = ({ date, pv }) => {
  const formattedDate = date ? date.split('T')[0] : '';
  return (
    <Container>
      <Wrapper>
        <p>{formattedDate}</p>
      </Wrapper>
      {pv && (
      <Wrapper>
        <SEye />
        <p>{pv}</p>
      </Wrapper>
      )}
    </Container>
  );
};

export default Metadata;
