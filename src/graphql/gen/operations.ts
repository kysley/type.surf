import * as Types from './schemas';

export type CreateAccountMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

export type CreateAccountMutation = {__typename?: 'Mutation'} & {
  createAccount: {__typename?: 'AuthPayload'} & Pick<
    Types.AuthPayload,
    'token'
  > & {
      account?: Types.Maybe<
        {__typename?: 'Account'} & Pick<Types.Account, 'username' | 'id'>
      >;
    };
};
