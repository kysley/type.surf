import React from 'react';
import {useNavigate} from 'react-router-dom';

import {useAuthorizedComponent} from '../hooks/useAuthorizedComponent';

export const ProtectedAction: React.FC<{
  loggedIn?: boolean;
  location?: string;
  action?: () => any;
}> = ({children, loggedIn = true, location, action}) => {
  const {evaluate} = useAuthorizedComponent(loggedIn);
  const navigate = useNavigate();

  const handleAct = (e: React.MouseEvent) => {
    const locked = evaluate();
    if (locked) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (action) action();
    if (location) navigate(location);
  };

  return <div onClick={handleAct}>{children}</div>;
};
