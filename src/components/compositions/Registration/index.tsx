import React from 'react';
import {useSearchParams} from 'react-router-dom';

import {Box} from '../../Box';

export const Registration = () => {
  useSearchParams();
  return (
    <Box>
      <h1>login with discord!</h1>
      <a href="https://discord.com/api/oauth2/authorize?client_id=796965649506238525&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth&response_type=token&scope=identify%20email">
        gogogo
      </a>
    </Box>
  );
};
