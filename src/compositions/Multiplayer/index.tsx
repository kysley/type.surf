import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {MultiplayerHome} from './Home';
import {PrivateCreate} from './PrivateGame/private-create';
import {PrivateLobby} from './PrivateGame/private-lobby';

const PlayMultipayer = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MultiplayerHome />} />
        <Route path=":id" element={<PrivateLobby />} />
        <Route path="/create" element={<PrivateCreate />} />
      </Routes>
    </div>
  );
};

export {PlayMultipayer};
