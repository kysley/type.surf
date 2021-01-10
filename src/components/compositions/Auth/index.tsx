import React, {useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useMutation} from 'urql';
import type {
  RegisterWithDiscordMutation,
  RegisterWithDiscordMutationVariables,
} from '../../../graphql/gen/operations';
import {REGISTER_WITH_DISCORD} from '../../../graphql/mutations';
import {useMe} from '../../../hooks/api/useMe';

export const Auth = () => {
  const [dat, mut] = useMutation<
    RegisterWithDiscordMutation,
    RegisterWithDiscordMutationVariables
  >(REGISTER_WITH_DISCORD);
  const location = useLocation();
  const {reexec} = useMe();

  useEffect(() => {
    const qs = new URLSearchParams(location.hash.slice(1));
    if (qs.has('access_token')) {
      const accessToken = qs.get('access_token') as string;
      const tokenType = qs.get('token_type') as string;
      mut({access: accessToken, type: tokenType});
    }
  }, [mut, location]);

  useEffect(() => {
    if (dat.data?.RegisterWithDiscord) {
      localStorage.setItem('token', dat.data.RegisterWithDiscord.token!);
      reexec({requestPolicy: 'network-only'});
    }
  }, [dat, reexec]);

  return <Navigate to={'/'} />;
};
