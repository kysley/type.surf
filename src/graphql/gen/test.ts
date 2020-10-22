import gql from 'graphql-tag';

export const GqlcreateAccount = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(email: $email, username: $username, password: $password) {
      token
      account {
        username
        id
      }
    }
  }
`;
