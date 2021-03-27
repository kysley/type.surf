import React, {useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {v4} from 'uuid';

import {DevTools} from './components/DevTools';
import {themeFactory} from './styled/themes/default';
import {Box} from './components/Box';
import {
  LobbyComposition,
  LobbyCompositionUNSAFE,
} from './compositions/Multiplayer';
import {Registration} from './compositions/Registration';
import {Auth} from './compositions/Auth';
import {Header} from './compositions/Header';
import {useSocketConnection} from './hooks/useSocketHandler';
import {Play} from './compositions/Play';
import {styled} from './styled';
import {Menu} from './compositions/Menu';
import {useMe} from './hooks/api/useMe';

const AppContainer = styled('main', {
  display: 'grid',
  gridTemplateAreas: "'left main right'",
  gridTemplateColumns: '25vmin 8fr 1.75fr',
  justifyContent: 'center',
  minHeight: '100vh',
  gap: '3em',
});

const Main = styled('div', {
  display: 'grid',
  gridArea: 'main',
});

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
          <Menu />
          <Main>
            {/* <Header /> */}
            <DevTools />
            <Routes>
              {/* <Navigate  to='/play' /> */}
              <Route path="/" element={<Play />} />
              <Route path="play/:id" element={<LobbyComposition />} />
              <Route path="/1" element={<LobbyCompositionUNSAFE />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
            <Toaster />
          </Main>
        </AppContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
