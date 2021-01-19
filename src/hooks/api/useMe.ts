import {useQuery} from 'urql';
import toast from 'react-hot-toast';

import {ME} from '../../graphql/queries';
import type {MeQuery, MeQueryVariables} from '../../graphql/gen/operations';

export function useMe() {
  const [result, reexec] = useQuery<MeQuery, MeQueryVariables>({
    query: ME,
  });

  const {data, fetching, error} = result;

  console.log('me');
  return {
    user: data?.me,
    fetching,
    error,
    reexec,
  };
}
