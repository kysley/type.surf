import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useMutation} from 'urql';
import type {
  RegisterWithDiscordMutation,
  RegisterWithDiscordMutationVariables,
} from '../../../graphql/gen/operations';
import {REGISTER_WITH_DISCORD} from '../../../graphql/mutations';

export const Auth = () => {
  const [dat, mut] = useMutation<
    RegisterWithDiscordMutation,
    RegisterWithDiscordMutationVariables
  >(REGISTER_WITH_DISCORD);
  const location = useLocation();

  useEffect(() => {
    const qs = new URLSearchParams(location.hash.slice(1));
    if (qs.has('access_token')) {
      const accessToken = qs.get('access_token');
      const tokenType = qs.get('token_type');
      mut({access: accessToken, type: tokenType});
    }
  }, [mut, location]);

  return <h1>check something</h1>;
};
