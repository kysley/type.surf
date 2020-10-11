export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Use JavaScript Date object for date/time fields. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Account>;
  map?: Maybe<Map>;
};

export type QueryMapArgs = {
  id: Scalars['ID'];
};

export type Account = {
  __typename?: 'Account';
  color?: Maybe<Scalars['String']>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  lastSeen: Scalars['DateTime'];
  role: Role;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  digits: Scalars['Int'];
  rank: Rank;
  history: Array<Result>;
  maps: Array<Map>;
};

export type AccountHistoryArgs = {
  orderBy?: Maybe<AccountHistoryOrderByInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ResultWhereUniqueInput>;
  after?: Maybe<ResultWhereUniqueInput>;
};

export type AccountMapsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MapWhereUniqueInput>;
  after?: Maybe<MapWhereUniqueInput>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
  Pro = 'PRO',
  Beta = 'BETA',
}

export enum Rank {
  Novice = 'Novice',
  Beginner = 'Beginner',
  Competent = 'Competent',
  Proficient = 'Proficient',
  Expert = 'Expert',
  Master = 'Master',
}

export type AccountHistoryOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
  mode?: Maybe<OrderByArg>;
  wpm?: Maybe<OrderByArg>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc',
}

export type ResultWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  correct: Scalars['Int'];
  corrections: Scalars['Int'];
  cpm: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  incorrect: Scalars['Int'];
  rawCpm: Scalars['Int'];
  mode: Mode;
  mods: Array<Mods>;
  wordIndex: Scalars['Int'];
  wpm: Scalars['Int'];
  map?: Maybe<Map>;
  account: Account;
};

export enum Mode {
  Classic = 'Classic',
  Race = 'Race',
  TimeAttack = 'TimeAttack',
  Takedown = 'Takedown',
}

export enum Mods {
  Rush = 'Rush',
  Perfectionist = 'Perfectionist',
}

export type Map = {
  __typename?: 'Map';
  id: Scalars['String'];
  name: Scalars['String'];
  mode: Mode;
  mods: Array<Mods>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  custom?: Maybe<Scalars['Boolean']>;
  difficulty?: Maybe<Difficulty>;
  description?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  wordset: Scalars['String'];
  creator?: Maybe<Account>;
};

export enum Difficulty {
  Easy = 'EASY',
  Normal = 'NORMAL',
  Medium = 'MEDIUM',
  Hard = 'HARD',
}

export type MapWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: AuthPayload;
  wordset?: Maybe<Scalars['String']>;
  login?: Maybe<AuthPayload>;
  loginWithDiscord?: Maybe<AuthPayload>;
  createMap?: Maybe<Map>;
  updateMap?: Maybe<Map>;
  createResult?: Maybe<Result>;
};

export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationWordsetArgs = {
  length?: Maybe<Scalars['Int']>;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateMapArgs = {
  data: MapInput;
};

export type MutationUpdateMapArgs = {
  id: Scalars['ID'];
  data: MapInput;
};

export type MutationCreateResultArgs = {
  mapId?: Maybe<Scalars['ID']>;
  data: ResultInput;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  account?: Maybe<Account>;
};

export type MapInput = {
  name: Scalars['String'];
  mods?: Maybe<Array<Mods>>;
  description?: Maybe<Scalars['String']>;
  wordSet: Scalars['String'];
};

export type ResultInput = {
  correct: Scalars['Int'];
  corrections: Scalars['Int'];
  cpm: Scalars['Int'];
  incorrect: Scalars['Int'];
  rawCpm: Scalars['Int'];
  mods?: Maybe<Array<Mods>>;
  mode: Mode;
  wordIndex: Scalars['Int'];
  wpm: Scalars['Int'];
};
