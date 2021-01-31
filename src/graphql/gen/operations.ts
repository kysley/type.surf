import type * as Types from './schemas';

export type RegisterWithDiscordMutationVariables = Types.Exact<{
  access: Types.Scalars['String'];
  type: Types.Scalars['String'];
}>;

export type RegisterWithDiscordMutation = {__typename?: 'Mutation'} & {
  RegisterWithDiscord?: Types.Maybe<
    {__typename?: 'AuthPayload'} & Pick<Types.AuthPayload, 'token'> & {
        account?: Types.Maybe<
          {__typename?: 'Account'} & Pick<
            Types.Account,
            'discriminator' | 'username' | 'id'
          >
        >;
      }
  >;
};

export type WordsetMutationVariables = Types.Exact<{
  length: Types.Scalars['Int'];
  seed?: Types.Maybe<Types.Scalars['String']>;
}>;

export type WordsetMutation = {__typename?: 'Mutation'} & {
  wordset?: Types.Maybe<
    {__typename?: 'WordsetPayload'} & Pick<
      Types.WordsetPayload,
      'wordset' | 'seed'
    >
  >;
};

export type MeQueryVariables = Types.Exact<{[key: string]: never}>;

export type MeQuery = {__typename?: 'Query'} & {
  me?: Types.Maybe<
    {__typename?: 'Account'} & Pick<
      Types.Account,
      'id' | 'exp' | 'level' | 'discriminator' | 'username'
    >
  >;
};
