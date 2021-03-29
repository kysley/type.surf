import toast from 'react-hot-toast';

import {useMeQuery} from '../../graphql/gen';

const mockUser = {
  username: 'Guest',
  discriminator: Math.floor(Math.random() * 9999),
  id: Math.floor(Math.random() * 9999) + 9999,
};

export function useMe() {
  const [result, reexec] = useMeQuery();

  const {data, fetching, error} = result;

  console.log('me');
  return {
    user: data?.me || mockUser,
    fetching,
    error,
    reexec,
  };
}
