import React, {useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {v4} from 'uuid';

import {DevTools} from './components/DevTools';
import {themeFactory} from './styled/themes/default';
import {
  LobbyComposition,
  LobbyCompositionUNSAFE,
  PlayMultipayer,
} from './compositions/Multiplayer';
import {Registration} from './compositions/Auth/Registration';
import {Auth} from './compositions/Auth';
import {useSocketConnection} from './hooks/useSocketHandler';
import {Play} from './compositions/Play';
import {styled} from './styled';
import {Menu} from './compositions/Menu';
import {useMe} from './hooks/api/useMe';
import {UserPage} from './compositions/User';
import {RegistrationModal} from './compositions/Auth/Registration/registration-modal';

const AppContainer = styled('main', {
  display: 'grid',
  gridTemplateAreas: "'left main right'",
  gridTemplateColumns: 'auto minmax(40vw, 60vw) auto',
  justifyContent: 'space-between',
  minHeight: '100vh',
  gap: '3em',
});

const Main = styled('div', {
  display: 'grid',
  gridArea: 'main',
});

const Box = styled('div', {
  color: '$text',
  background: '$background',
  width: '100vw',
  margin: 'auto',
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
      <Box>
        <AppContainer>
          <Menu />
          <Main>
            <RegistrationModal />
            {/* <Header /> */}
            <DevTools />
            <Routes>
              {/* <Navigate  to='/play' /> */}
              <Route path="/" element={<Play />} />
              <Route path="/play/*" element={<PlayMultipayer />} />
              {/* <Route path="/play/:id" element={<LobbyComposition />} /> */}
              <Route path="/u/:id" element={<UserPage />} />
              <Route path="/1" element={<LobbyCompositionUNSAFE />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
            <Toaster />
          </Main>
          <div style={{gridArea: 'right', width: '0'}}></div>
        </AppContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
