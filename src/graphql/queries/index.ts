import gql from 'graphql-tag';

export const ME = gql`
  query me {
    me {
      id
      exp
      level
      discriminator
      username
    }
  }
`;
