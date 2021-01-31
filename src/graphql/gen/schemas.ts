export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Account>;
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

export type ResultWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  account: Account;
  correct: Scalars['Int'];
  corrections: Scalars['Int'];
  cpm: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  incorrect: Scalars['Int'];
  rawCpm: Scalars['Int'];
  wordIndex: Scalars['Int'];
  wpm: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  Beta = 'BETA',
  Pro = 'PRO',
  User = 'USER',
}

export type Mutation = {
  __typename?: 'Mutation';
  RegisterWithDiscord?: Maybe<AuthPayload>;
  wordset?: Maybe<WordsetPayload>;
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

export type ResultInput = {
  correct?: Maybe<Scalars['Int']>;
  corrections?: Maybe<Scalars['Int']>;
  cpm?: Maybe<Scalars['Int']>;
  rawCpm?: Maybe<Scalars['Int']>;
  wpm?: Maybe<Scalars['Int']>;
  rawWpm?: Maybe<Scalars['Int']>;
  incorrect?: Maybe<Scalars['Int']>;
  wordIndex?: Maybe<Scalars['Int']>;
  letterIndex?: Maybe<Scalars['Int']>;
  history?: Maybe<Scalars['Int']>;
  punctuated?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
  seed?: Maybe<Scalars['String']>;
};

export type AccountHistoryOrderByInput = {
  createdAt?: Maybe<SortOrder>;
  mode?: Maybe<SortOrder>;
  wpm?: Maybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type MapWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};
