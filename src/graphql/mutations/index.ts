import gql from 'graphql-tag';

// export const LOGIN = gql`
//   mutation login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       token
//       account {
//         # color
//         confirmed
//         email
//         lastSeen
//         role
//         username
//         id
//       }
//     }
//   }
// `;

export const REGISTER_WITH_DISCORD = gql`
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
