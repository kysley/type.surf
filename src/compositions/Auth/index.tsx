import React, {useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useRegisterWithDiscordMutation} from '../../graphql/gen';
import {useMe} from '../../hooks/api/useMe';

export const Auth = () => {
  const [{data}, mut] = useRegisterWithDiscordMutation();
  const location = useLocation();
  const {reexec} = useMe();

  useEffect(() => {
    const qs = new URLSearchParams(location.hash.slice(1));
    if (qs.has('access_token')) {
      const accessToken = qs.get('access_token') as string;
      const tokenType = qs.get('token_type') as string;
      mut({access: accessToken, type: tokenType}).then((value) => {
        localStorage.setItem('token', value.data?.RegisterWithDiscord?.token!);
      });
    }
  }, [mut, location]);

  useEffect(() => {
    console.log(data);
    if (data?.RegisterWithDiscord) {
      localStorage.setItem('token', data.RegisterWithDiscord.token!);
      reexec({requestPolicy: 'network-only'});
    }
  }, [data, reexec]);

  // wait for a response, or a 3s redirect, etc
  return <Navigate to={'/'} />;
};
