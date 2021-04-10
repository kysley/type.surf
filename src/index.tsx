import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import {Provider as UrqlProvider} from 'urql';
import {BrowserRouter} from 'react-router-dom';
import '@reach/listbox/styles.css';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';

import App from './App';
import {urqlClient} from './utils/urqlClient';
import {SocketProvider} from './hooks/useSocketHandler';
import {global} from './styled';

const globalStyles = global({
  '*, ::before, ::after': {boxSizing: 'border-box'},
  body: {margin: 0},
});

globalStyles();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <UrqlProvider value={urqlClient}>
          <SocketProvider>
            <Suspense fallback={<></>}>
              <App />
            </Suspense>
          </SocketProvider>
        </UrqlProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
