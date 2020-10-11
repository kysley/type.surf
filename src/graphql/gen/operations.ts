import type * as Types from './schemas';

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
        {__typename?: 'Account'} & Pick<
          Types.Account,
          | 'color'
          | 'confirmed'
          | 'email'
          | 'lastSeen'
          | 'role'
          | 'username'
          | 'id'
        >
      >;
    };
};

export type LoginMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

export type LoginMutation = {__typename?: 'Mutation'} & {
  login?: Types.Maybe<
    {__typename?: 'AuthPayload'} & Pick<Types.AuthPayload, 'token'> & {
        account?: Types.Maybe<
          {__typename?: 'Account'} & Pick<
            Types.Account,
            | 'color'
            | 'confirmed'
            | 'email'
            | 'lastSeen'
            | 'role'
            | 'username'
            | 'id'
          >
        >;
      }
  >;
};

export type WordsetMutationVariables = Types.Exact<{[key: string]: never}>;

export type WordsetMutation = {__typename?: 'Mutation'} & Pick<
  Types.Mutation,
  'wordset'
>;

export type MeQueryVariables = Types.Exact<{[key: string]: never}>;

export type MeQuery = {__typename?: 'Query'} & {
  me?: Types.Maybe<
    {__typename?: 'Account'} & Pick<
      Types.Account,
      'color' | 'confirmed' | 'email' | 'lastSeen' | 'role' | 'username' | 'id'
    >
  >;
};
