import gql from 'graphql-tag';

export const GqlRegisterWithDiscord = gql`
  mutation RegisterWithDiscord($access: String!, $type: String!) {
    RegisterWithDiscord(access: $access, type: $type) {
      token
      account {
        discriminator
        username
        id
      }
    }
  }
`;
export const Gqlwordset = gql`
  mutation wordset($length: Int!, $seed: String) {
    wordset(length: $length, seed: $seed) {
      wordset
      seed
    }
  }
`;
export const Gqlme = gql`
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
