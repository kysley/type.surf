import React from 'react';

import {useSocketConnection} from '../../hooks/useSocketHandler';

const MultiplayerHome = () => {
  const {queue} = useSocketConnection();
  return (
    <div>
      <div>daily challenge</div>
      <div onClick={queue}>Quick play</div>
      <div>Private games</div>
    </div>
  );
};

export {MultiplayerHome};
