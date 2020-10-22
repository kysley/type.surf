export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Account>;
  mapById?: Maybe<Map>;
};

export type QueryMapByIdArgs = {
  id: Scalars['ID'];
};

export type Account = {
  __typename?: 'Account';
  history: Array<Result>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  lastSeen: Scalars['DateTime'];
  maps: Array<Map>;
  rank: Rank;
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

export type AccountMapsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MapWhereUniqueInput>;
  after?: Maybe<MapWhereUniqueInput>;
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
  map?: Maybe<Map>;
  mode: Mode;
  mods: Array<Mods>;
  rawCpm: Scalars['Int'];
  wordIndex: Scalars['Int'];
  wpm: Scalars['Int'];
};

export type Map = {
  __typename?: 'Map';
  createdAt: Scalars['DateTime'];
  creator?: Maybe<Account>;
  custom?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  name: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  wordset: Scalars['String'];
};

export enum Mode {
  Classic = 'Classic',
  Race = 'Race',
  Takedown = 'Takedown',
  TimeAttack = 'TimeAttack',
}

export enum Mods {
  Perfectionist = 'Perfectionist',
  Rush = 'Rush',
}

export type MapWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum Rank {
  Beginner = 'Beginner',
  Competent = 'Competent',
  Expert = 'Expert',
  Master = 'Master',
  Novice = 'Novice',
  Proficient = 'Proficient',
}

export enum Role {
  Admin = 'ADMIN',
  Beta = 'BETA',
  Pro = 'PRO',
  User = 'USER',
}

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: AuthPayload;
  login?: Maybe<AuthPayload>;
  wordset?: Maybe<Scalars['String']>;
  createResult?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationWordsetArgs = {
  count: Scalars['Int'];
  seed?: Maybe<Scalars['String']>;
  punctuate?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateResultArgs = {
  mapId?: Maybe<Scalars['ID']>;
  data: ResultInput;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  account?: Maybe<Account>;
  token?: Maybe<Scalars['String']>;
};

export type ResultInput = {
  correct: Scalars['Int'];
  corrections: Scalars['Int'];
  cpm: Scalars['Int'];
  rawCpm: Scalars['Int'];
  wpm: Scalars['Int'];
  rawWpm: Scalars['Int'];
  incorrect: Scalars['Int'];
  wordIndex: Scalars['Int'];
  letterIndex: Scalars['Int'];
  history: Scalars['Int'];
  punctuated: Scalars['Boolean'];
  state: Scalars['String'];
  seed?: Maybe<Scalars['String']>;
  mode: Mode;
  slug: Scalars['String'];
  mods: Array<Maybe<Mods>>;
  mapId: Scalars['ID'];
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

export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
  Normal = 'NORMAL',
}
