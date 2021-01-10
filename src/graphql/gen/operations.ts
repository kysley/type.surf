import * as Types from './schemas';

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

export type MeQueryVariables = Types.Exact<{[key: string]: never}>;

export type MeQuery = {__typename?: 'Query'} & {
  me?: Types.Maybe<
    {__typename?: 'Account'} & Pick<
      Types.Account,
      'id' | 'exp' | 'level' | 'discriminator' | 'username'
    >
  >;
};
