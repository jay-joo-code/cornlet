import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Env = () => (
  <Container>
    {JSON.stringify(process.env)}
  </Container>
);

export default Env;
