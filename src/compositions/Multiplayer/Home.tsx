import React from 'react';
import {Link} from 'react-router-dom';

import {useSocketConnection} from '../../hooks/useSocketHandler';

const MultiplayerHome = () => {
  const {queue} = useSocketConnection();
  return (
    <div>
      <div>daily challenge</div>
      <div onClick={queue}>Quick play</div>
      <Link to="./create">Private games</Link>
    </div>
  );
};

export {MultiplayerHome};
