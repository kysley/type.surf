import React from 'react';
import styled from 'styled-components';

import './App.css';
import TypingAreaCompsition from './components/compositions/TypingArea/composition';

const AppWrapper = styled.div`
  width: 90vw;
  max-width: 90vw;
  margin: auto;
`;

const AppContainer = styled.main`
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: 1fr 2fr 1fr;
  justify-content: center;
  min-height: 100vh;
`;

interface AppProps {}

function App({}: AppProps) {
  return (
    <AppWrapper>
      <AppContainer>
        <TypingAreaCompsition />
      </AppContainer>
    </AppWrapper>
  );
}

export default App;
