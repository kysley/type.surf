import React from 'react';
import {useParams} from 'react-router';

import {useUserQuery} from '../../graphql/gen';

export const UserPage = () => {
  const {id} = useParams();
  const [result] = useUserQuery({variables: {userId: id}});

  const {data, fetching, error} = result;

  if (error && !fetching) {
    return <span>Something went wrong</span>;
  }

  if (fetching) {
    return <span>Loading</span>;
  }

  return (
    <div>
      {data?.User?.history.map((h) => (
        <h1>{h.wpm}</h1>
      ))}
    </div>
  );
};
