import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import {Provider as UrqlProvider} from 'urql';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import './index.css';
import {urqlClient} from './utils/urqlClient';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <UrqlProvider value={urqlClient}>
          <Suspense fallback={<></>}>
            <App />
          </Suspense>
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
