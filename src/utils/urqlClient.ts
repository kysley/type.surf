import {createClient} from 'urql';

const clientUrl =
  import.meta.env.mode === 'PRODUCTION'
    ? 'https://api.typvp.xyz/graphql'
    : 'http://localhost:8081/graphql';

export const urqlClient = createClient({
  url: clientUrl,
  fetchOptions: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return {};
    }
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  },
});
