import toast from 'react-hot-toast';

import {useMeQuery} from '../../graphql/gen';

export function useMe() {
  const [result, reexec] = useMeQuery();

  const {data, fetching, error} = result;

  console.log('me');
  return {
    user: data?.me,
    fetching,
    error,
    reexec,
  };
}
