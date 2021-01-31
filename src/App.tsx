import React, {useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {v4} from 'uuid';

import './App.css';
import TypingAreaCompsition from './components/compositions/TypingArea';
import {DevTools} from './components/DevTools';
import {themeFactory} from './themes/default';
import {Box} from './components/Box';
import {
  LobbyComposition,
  LobbyCompositionUNSAFE,
} from './components/compositions/Multiplayer';
import {Registration} from './components/compositions/Registration';
import {Auth} from './components/compositions/Auth';
import {useMe} from './hooks/api/useMe';
import {Header} from './components/compositions/Header';
import {useSocketConnection} from './hooks/useSocketHandler';
import {Play} from './components/compositions/Play';

const AppContainer = styled.main`
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: 55px 1fr 100px;
  grid-template-columns: 80%;
  justify-content: center;
  min-height: 100vh;
  gap: 3em;
`;

//@ts-ignore
const theme = themeFactory({
  primary: '#e2b714',
  secondary: '#646669',
  text: '#d1d0c5',
  background: '#323437',
  error: '#ca4754',
  error2: '#7e2a33',
});

function createAnonPlayer() {
  return {
    userId: v4(),
    username: 'Anon',
    discriminator: Math.floor(1000 + Math.random() * 9000),
  };
}

function App() {
  const {socket} = useSocketConnection();
  const {user, fetching} = useMe();

  useEffect(() => {
    if (!fetching && user) {
      console.log('user', user);
      socket.emit('client.identity', {
        userId: user?.id,
        discriminator: user?.discriminator,
        username: user?.username,
        level: user?.level,
      });
    } else if (!fetching && !user) {
      console.log('anon');
      socket.emit('client.identity', createAnonPlayer());
    }
  }, [user, fetching]);

  return (
    <ThemeProvider theme={theme}>
      <Box color="text" bg="background" width="100vw" margin="auto">
        <AppContainer>
          <Header />
          <DevTools />
          <Routes>
            <Route
              path="/"
              element={
                <Box gridArea="main">
                  <TypingAreaCompsition />
                </Box>
              }
            />
            <Route path="/play" element={<Play />} />
            <Route path="p/:id" element={<LobbyComposition />} />
            <Route path="/1" element={<LobbyCompositionUNSAFE />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Toaster />
        </AppContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
