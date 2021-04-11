import React from 'react';

import {useAuthorizedComponent} from '../../../hooks/useAuthorizedComponent';

export const PrivateCreate = () => {
  const {lock} = useAuthorizedComponent();

  if (lock) return null;

  return <span>hey</span>;
};
