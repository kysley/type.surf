import gql from 'graphql-tag';

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(email: $email, username: $username, password: $password) {
      token
      account {
        color
        confirmed
        email
        lastSeen
        role
        username
        id
      }
    }
  }
`;
