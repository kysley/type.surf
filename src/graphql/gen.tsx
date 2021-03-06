import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  history: Array<Result>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  lastSeen: Scalars['DateTime'];
  level: Scalars['Int'];
  exp: Scalars['Int'];
  discriminator: Scalars['String'];
  role: Role;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AccountHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ResultWhereUniqueInput>;
  after?: Maybe<ResultWhereUniqueInput>;
};

export type Result = {
  __typename?: 'Result';
  account: Account;
  cpm: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  wpm: Scalars['Int'];
  acc: Scalars['Int'];
  characters: Scalars['String'];
  raw: Scalars['Int'];
  seed: Scalars['String'];
  mode: Mode;
};

export type CreateResultInput = {
  wpm: Scalars['Int'];
  raw: Scalars['Int'];
  seed: Scalars['String'];
  acc: Scalars['Int'];
  cpm: Scalars['Int'];
  characters: Scalars['String'];
  mode: Mode;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  account?: Maybe<Account>;
  token?: Maybe<Scalars['String']>;
};

export type WordsetPayload = {
  __typename?: 'WordsetPayload';
  wordset?: Maybe<Scalars['String']>;
  seed?: Maybe<Scalars['String']>;
};

export type AccountHistoryOrderByInput = {
  createdAt?: Maybe<SortOrder>;
  mode?: Maybe<SortOrder>;
  wpm?: Maybe<SortOrder>;
};

export type ResultWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  Beta = 'BETA',
  Pro = 'PRO',
  User = 'USER',
}

export enum Mode {
  Time = 'TIME',
  Words = 'WORDS',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<Account>;
  User?: Maybe<Account>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  RegisterWithDiscord?: Maybe<AuthPayload>;
  Wordset?: Maybe<WordsetPayload>;
  CreateResult?: Maybe<Result>;
};

export type MutationRegisterWithDiscordArgs = {
  access: Scalars['String'];
  type: Scalars['String'];
};

export type MutationWordsetArgs = {
  length: Scalars['Int'];
  seed?: Maybe<Scalars['String']>;
  punctuate?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateResultArgs = {
  input: CreateResultInput;
};

export type RegisterWithDiscordMutationVariables = Exact<{
  access: Scalars['String'];
  type: Scalars['String'];
}>;

export type RegisterWithDiscordMutation = {__typename?: 'Mutation'} & {
  RegisterWithDiscord?: Maybe<
    {__typename?: 'AuthPayload'} & Pick<AuthPayload, 'token'> & {
        account?: Maybe<
          {__typename?: 'Account'} & Pick<
            Account,
            'discriminator' | 'username' | 'id'
          >
        >;
      }
  >;
};

export type WordsetMutationVariables = Exact<{
  length: Scalars['Int'];
  seed?: Maybe<Scalars['String']>;
}>;

export type WordsetMutation = {__typename?: 'Mutation'} & {
  Wordset?: Maybe<
    {__typename?: 'WordsetPayload'} & Pick<WordsetPayload, 'wordset' | 'seed'>
  >;
};

export type CreateResultMutationVariables = Exact<{
  input: CreateResultInput;
}>;

export type CreateResultMutation = {__typename?: 'Mutation'} & {
  CreateResult?: Maybe<{__typename?: 'Result'} & Pick<Result, 'wpm'>>;
};

export type MeQueryVariables = Exact<{[key: string]: never}>;

export type MeQuery = {__typename?: 'Query'} & {
  Me?: Maybe<
    {__typename?: 'Account'} & Pick<
      Account,
      'username' | 'id' | 'discriminator' | 'level'
    >
  >;
};

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;

export type UserQuery = {__typename?: 'Query'} & {
  User?: Maybe<
    {__typename?: 'Account'} & Pick<Account, 'username' | 'id'> & {
        history: Array<{__typename?: 'Result'} & Pick<Result, 'wpm'>>;
      }
  >;
};

export const RegisterWithDiscordDocument = gql`
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

export function useRegisterWithDiscordMutation() {
  return Urql.useMutation<
    RegisterWithDiscordMutation,
    RegisterWithDiscordMutationVariables
  >(RegisterWithDiscordDocument);
}
export const WordsetDocument = gql`
  mutation Wordset($length: Int!, $seed: String) {
    Wordset(length: $length, seed: $seed) {
      wordset
      seed
    }
  }
`;

export function useWordsetMutation() {
  return Urql.useMutation<WordsetMutation, WordsetMutationVariables>(
    WordsetDocument,
  );
}
export const CreateResultDocument = gql`
  mutation CreateResult($input: CreateResultInput!) {
    CreateResult(input: $input) {
      wpm
    }
  }
`;

export function useCreateResultMutation() {
  return Urql.useMutation<CreateResultMutation, CreateResultMutationVariables>(
    CreateResultDocument,
  );
}
export const MeDocument = gql`
  query Me {
    Me {
      username
      id
      discriminator
      level
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<MeQuery>({query: MeDocument, ...options});
}
export const UserDocument = gql`
  query User($userId: ID!) {
    User(id: $userId) {
      username
      id
      history {
        wpm
      }
    }
  }
`;

export function useUserQuery(
  options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<UserQuery>({query: UserDocument, ...options});
}
