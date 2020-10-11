import gql from 'graphql-tag';

export const WORDSET = gql`
  mutation wordset {
    wordset(length: 250)
  }
`;
