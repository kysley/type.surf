import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import Recoil from 'recoil';
import {Provider as UrqlProvider} from 'urql';

const {RecoilRoot} = Recoil;

import App from './App';
import './index.css';
import {urqlClient} from './utils/urqlClient';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <UrqlProvider value={urqlClient}>
        <Suspense fallback={<></>}>
          <App />
        </Suspense>
      </UrqlProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
