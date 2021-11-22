import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'src/theme';
import AppReduxWrapper from './AppReduxWrapper';

import 'src/theme/Normalise.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100.5vh;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (min-width: ${(props) => props.theme.md}px) {
    max-width: 1565px;
  }
`;

const AppThemeWrapper = () => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Container>
        <AppReduxWrapper />
      </Container>
    </Wrapper>
  </ThemeProvider>
);

export default AppThemeWrapper;
