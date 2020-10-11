import gql from 'graphql-tag';

export const ME = gql`
  query me {
    me {
      color
      confirmed
      email
      lastSeen
      role
      username
      id
    }
  }
`;
