import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BlackCards = {
   __typename?: 'BlackCards';
  pick?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type CardSet = {
   __typename?: 'cardSet';
  setName?: Maybe<Scalars['String']>;
  blackCards?: Maybe<Array<Maybe<BlackCards>>>;
  whiteCards?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserCards = {
   __typename?: 'UserCards';
  user: Scalars['String'];
  blackCard: Scalars['String'];
  cards: Array<Maybe<Scalars['String']>>;
};

export type Query = {
   __typename?: 'Query';
  cardSets?: Maybe<Array<Maybe<CardSet>>>;
  cardSet?: Maybe<CardSet>;
  getUserCards: UserCards;
  user?: Maybe<User>;
  getCurrentGame?: Maybe<Game>;
  getGame?: Maybe<Game>;
};


export type QueryCardSetArgs = {
  setName: Scalars['String'];
};


export type QueryGetUserCardsArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type QueryGetCurrentGameArgs = {
  name: Scalars['String'];
};


export type QueryGetGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse';
  error: Scalars['String'];
  user: User;
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  error?: Maybe<Scalars['String']>;
  user: User;
};

export type UpdateUserArgs = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  registerUser?: Maybe<RegisterResponse>;
  loginUser?: Maybe<LoginResponse>;
  updateUser: User;
  createGame?: Maybe<Game>;
  joinGame?: Maybe<Game>;
  leaveGame: Scalars['Boolean'];
  startGame?: Maybe<GameDetails>;
  stopGame?: Maybe<GameDetails>;
  selectCard: Scalars['Boolean'];
  selectWinningCard: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  args: UpdateUserArgs;
};


export type MutationCreateGameArgs = {
  gameId: Scalars['String'];
  host: Scalars['String'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLeaveGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationStartGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationStopGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSelectCardArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
  card: Scalars['String'];
};


export type MutationSelectWinningCardArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
  card: Scalars['String'];
  winningUser: Scalars['String'];
};

export type Game = {
   __typename?: 'Game';
  gameId?: Maybe<Scalars['String']>;
  userJoined?: Maybe<UserJoin>;
  userLeft?: Maybe<UserLeft>;
  host?: Maybe<Scalars['String']>;
  users: Array<GameUsers>;
};

export type GamePlayers = {
   __typename?: 'GamePlayers';
  gameId: Scalars['String'];
  event: Scalars['String'];
  host?: Maybe<Scalars['String']>;
  userJoined?: Maybe<UserJoin>;
  userLeft?: Maybe<UserLeft>;
  user?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<GamePlayer>>>;
};

export type GameUsers = {
   __typename?: 'GameUsers';
  host: Scalars['String'];
  name: Scalars['String'];
  points?: Maybe<Scalars['String']>;
};

export type GamePlayer = {
   __typename?: 'GamePlayer';
  name: Scalars['String'];
  points: Scalars['Int'];
  cardSelected?: Maybe<Scalars['Boolean']>;
};

export type UserJoin = {
   __typename?: 'UserJoin';
  name?: Maybe<Scalars['String']>;
};

export type UserLeft = {
   __typename?: 'UserLeft';
  name?: Maybe<Scalars['String']>;
};

export type CardsToJudge = {
   __typename?: 'CardsToJudge';
  name: Scalars['String'];
  cardName: Scalars['String'];
};

export type GameDetails = {
   __typename?: 'GameDetails';
  gameId: Scalars['String'];
  event: Scalars['String'];
  blackCard: Scalars['String'];
  running?: Maybe<Scalars['Boolean']>;
  roundStatus?: Maybe<Scalars['String']>;
  cardCzar?: Maybe<Scalars['String']>;
  cardsToJudge?: Maybe<Array<Maybe<CardsToJudge>>>;
};

export type CardsDealt = {
   __typename?: 'CardsDealt';
  gameId?: Maybe<Scalars['String']>;
  blackCard: Scalars['String'];
  user?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Subscription = {
   __typename?: 'Subscription';
  game?: Maybe<Game>;
  gameDetails?: Maybe<GameDetails>;
  gamePlayers?: Maybe<GamePlayers>;
  cardsDealt?: Maybe<CardsDealt>;
};


export type SubscriptionGameArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionGameDetailsArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionGamePlayersArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionCardsDealtArgs = {
  gameId: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type UpdateUserMutationVariables = {
  args: UpdateUserArgs;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'email'>
  ) }
);

export type JoinGameMutationVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type JoinGameMutation = (
  { __typename?: 'Mutation' }
  & { joinGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId'>
  )> }
);

export type CreateGameMutationVariables = {
  gameId: Scalars['String'];
  host: Scalars['String'];
};


export type CreateGameMutation = (
  { __typename?: 'Mutation' }
  & { createGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId'>
  )> }
);

export type GameSubscriptionVariables = {
  gameId: Scalars['String'];
};


export type GameSubscription = (
  { __typename?: 'Subscription' }
  & { game?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId' | 'host'>
    & { userJoined?: Maybe<(
      { __typename?: 'UserJoin' }
      & Pick<UserJoin, 'name'>
    )>, userLeft?: Maybe<(
      { __typename?: 'UserLeft' }
      & Pick<UserLeft, 'name'>
    )> }
  )> }
);

export type GameDetailsSubscriptionVariables = {
  gameId: Scalars['String'];
};


export type GameDetailsSubscription = (
  { __typename?: 'Subscription' }
  & { gameDetails?: Maybe<(
    { __typename?: 'GameDetails' }
    & Pick<GameDetails, 'event' | 'running' | 'cardCzar' | 'roundStatus'>
    & { cardsToJudge?: Maybe<Array<Maybe<(
      { __typename?: 'CardsToJudge' }
      & Pick<CardsToJudge, 'name' | 'cardName'>
    )>>> }
  )> }
);

export type CardsDealtSubscriptionVariables = {
  gameId: Scalars['String'];
};


export type CardsDealtSubscription = (
  { __typename?: 'Subscription' }
  & { cardsDealt?: Maybe<(
    { __typename?: 'CardsDealt' }
    & Pick<CardsDealt, 'blackCard' | 'user' | 'cards'>
  )> }
);

export type GetGameQueryVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type GetGameQuery = (
  { __typename?: 'Query' }
  & { getGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId' | 'host'>
    & { users: Array<(
      { __typename?: 'GameUsers' }
      & Pick<GameUsers, 'name' | 'points'>
    )> }
  )> }
);

export type LeaveGameMutationVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type LeaveGameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveGame'>
);

export type StartGameMutationVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type StartGameMutation = (
  { __typename?: 'Mutation' }
  & { startGame?: Maybe<(
    { __typename?: 'GameDetails' }
    & Pick<GameDetails, 'running' | 'cardCzar'>
  )> }
);

export type StopGameMutationVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type StopGameMutation = (
  { __typename?: 'Mutation' }
  & { stopGame?: Maybe<(
    { __typename?: 'GameDetails' }
    & Pick<GameDetails, 'running' | 'cardCzar'>
  )> }
);

export type SelectCardMutationVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
  card: Scalars['String'];
};


export type SelectCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'selectCard'>
);

export type GetUserCardsQueryVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type GetUserCardsQuery = (
  { __typename?: 'Query' }
  & { getUserCards: (
    { __typename?: 'UserCards' }
    & Pick<UserCards, 'user' | 'blackCard' | 'cards'>
  ) }
);

export type GamePlayersSubscriptionVariables = {
  gameId: Scalars['String'];
};


export type GamePlayersSubscription = (
  { __typename?: 'Subscription' }
  & { gamePlayers?: Maybe<(
    { __typename?: 'GamePlayers' }
    & Pick<GamePlayers, 'gameId' | 'event' | 'host' | 'user'>
    & { userJoined?: Maybe<(
      { __typename?: 'UserJoin' }
      & Pick<UserJoin, 'name'>
    )>, userLeft?: Maybe<(
      { __typename?: 'UserLeft' }
      & Pick<UserLeft, 'name'>
    )>, users?: Maybe<Array<Maybe<(
      { __typename?: 'GamePlayer' }
      & Pick<GamePlayer, 'name' | 'points'>
    )>>> }
  )> }
);

export type SelectWinningCardMutationVariables = {
  gameId: Scalars['String'];
  name: Scalars['String'];
  card: Scalars['String'];
  winningUser: Scalars['String'];
};


export type SelectWinningCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'selectWinningCard'>
);

export type LoginUserMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser?: Maybe<(
    { __typename?: 'LoginResponse' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    ) }
  )> }
);

export type RegisterUserMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'RegisterResponse' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    ) }
  )> }
);


export const UpdateUserDocument = gql`
    mutation updateUser($args: UpdateUserArgs!) {
  updateUser(args: $args) {
    _id
    name
    email
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const JoinGameDocument = gql`
    mutation joinGame($gameId: String!, $name: String!) {
  joinGame(gameId: $gameId, name: $name) {
    gameId
  }
}
    `;
export type JoinGameMutationFn = ApolloReactCommon.MutationFunction<JoinGameMutation, JoinGameMutationVariables>;

/**
 * __useJoinGameMutation__
 *
 * To run a mutation, you first call `useJoinGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGameMutation, { data, loading, error }] = useJoinGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useJoinGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGameMutation, JoinGameMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument, baseOptions);
      }
export type JoinGameMutationHookResult = ReturnType<typeof useJoinGameMutation>;
export type JoinGameMutationResult = ApolloReactCommon.MutationResult<JoinGameMutation>;
export type JoinGameMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGameMutation, JoinGameMutationVariables>;
export const CreateGameDocument = gql`
    mutation createGame($gameId: String!, $host: String!) {
  createGame(gameId: $gameId, host: $host) {
    gameId
  }
}
    `;
export type CreateGameMutationFn = ApolloReactCommon.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      host: // value for 'host'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, baseOptions);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = ApolloReactCommon.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const GameDocument = gql`
    subscription game($gameId: String!) {
  game(gameId: $gameId) {
    gameId
    userJoined {
      name
    }
    userLeft {
      name
    }
    host
  }
}
    `;

/**
 * __useGameSubscription__
 *
 * To run a query within a React component, call `useGameSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGameSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameSubscription({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGameSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GameSubscription, GameSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GameSubscription, GameSubscriptionVariables>(GameDocument, baseOptions);
      }
export type GameSubscriptionHookResult = ReturnType<typeof useGameSubscription>;
export type GameSubscriptionResult = ApolloReactCommon.SubscriptionResult<GameSubscription>;
export const GameDetailsDocument = gql`
    subscription gameDetails($gameId: String!) {
  gameDetails(gameId: $gameId) {
    event
    running
    cardCzar
    roundStatus
    cardsToJudge {
      name
      cardName
    }
  }
}
    `;

/**
 * __useGameDetailsSubscription__
 *
 * To run a query within a React component, call `useGameDetailsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGameDetailsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameDetailsSubscription({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGameDetailsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GameDetailsSubscription, GameDetailsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GameDetailsSubscription, GameDetailsSubscriptionVariables>(GameDetailsDocument, baseOptions);
      }
export type GameDetailsSubscriptionHookResult = ReturnType<typeof useGameDetailsSubscription>;
export type GameDetailsSubscriptionResult = ApolloReactCommon.SubscriptionResult<GameDetailsSubscription>;
export const CardsDealtDocument = gql`
    subscription cardsDealt($gameId: String!) {
  cardsDealt(gameId: $gameId) {
    blackCard
    user
    cards
  }
}
    `;

/**
 * __useCardsDealtSubscription__
 *
 * To run a query within a React component, call `useCardsDealtSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardsDealtSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsDealtSubscription({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useCardsDealtSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<CardsDealtSubscription, CardsDealtSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<CardsDealtSubscription, CardsDealtSubscriptionVariables>(CardsDealtDocument, baseOptions);
      }
export type CardsDealtSubscriptionHookResult = ReturnType<typeof useCardsDealtSubscription>;
export type CardsDealtSubscriptionResult = ApolloReactCommon.SubscriptionResult<CardsDealtSubscription>;
export const GetGameDocument = gql`
    query getGame($gameId: String!, $name: String!) {
  getGame(gameId: $gameId, name: $name) {
    gameId
    host
    users {
      name
      points
    }
  }
}
    `;

/**
 * __useGetGameQuery__
 *
 * To run a query within a React component, call `useGetGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetGameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, baseOptions);
      }
export function useGetGameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, baseOptions);
        }
export type GetGameQueryHookResult = ReturnType<typeof useGetGameQuery>;
export type GetGameLazyQueryHookResult = ReturnType<typeof useGetGameLazyQuery>;
export type GetGameQueryResult = ApolloReactCommon.QueryResult<GetGameQuery, GetGameQueryVariables>;
export const LeaveGameDocument = gql`
    mutation leaveGame($gameId: String!, $name: String!) {
  leaveGame(gameId: $gameId, name: $name)
}
    `;
export type LeaveGameMutationFn = ApolloReactCommon.MutationFunction<LeaveGameMutation, LeaveGameMutationVariables>;

/**
 * __useLeaveGameMutation__
 *
 * To run a mutation, you first call `useLeaveGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGameMutation, { data, loading, error }] = useLeaveGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useLeaveGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveGameMutation, LeaveGameMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveGameMutation, LeaveGameMutationVariables>(LeaveGameDocument, baseOptions);
      }
export type LeaveGameMutationHookResult = ReturnType<typeof useLeaveGameMutation>;
export type LeaveGameMutationResult = ApolloReactCommon.MutationResult<LeaveGameMutation>;
export type LeaveGameMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveGameMutation, LeaveGameMutationVariables>;
export const StartGameDocument = gql`
    mutation startGame($gameId: String!, $name: String!) {
  startGame(gameId: $gameId, name: $name) {
    running
    cardCzar
  }
}
    `;
export type StartGameMutationFn = ApolloReactCommon.MutationFunction<StartGameMutation, StartGameMutationVariables>;

/**
 * __useStartGameMutation__
 *
 * To run a mutation, you first call `useStartGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startGameMutation, { data, loading, error }] = useStartGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useStartGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        return ApolloReactHooks.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, baseOptions);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = ApolloReactCommon.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = ApolloReactCommon.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
export const StopGameDocument = gql`
    mutation stopGame($gameId: String!, $name: String!) {
  stopGame(gameId: $gameId, name: $name) {
    running
    cardCzar
  }
}
    `;
export type StopGameMutationFn = ApolloReactCommon.MutationFunction<StopGameMutation, StopGameMutationVariables>;

/**
 * __useStopGameMutation__
 *
 * To run a mutation, you first call `useStopGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopGameMutation, { data, loading, error }] = useStopGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useStopGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StopGameMutation, StopGameMutationVariables>) {
        return ApolloReactHooks.useMutation<StopGameMutation, StopGameMutationVariables>(StopGameDocument, baseOptions);
      }
export type StopGameMutationHookResult = ReturnType<typeof useStopGameMutation>;
export type StopGameMutationResult = ApolloReactCommon.MutationResult<StopGameMutation>;
export type StopGameMutationOptions = ApolloReactCommon.BaseMutationOptions<StopGameMutation, StopGameMutationVariables>;
export const SelectCardDocument = gql`
    mutation selectCard($gameId: String!, $name: String!, $card: String!) {
  selectCard(gameId: $gameId, name: $name, card: $card)
}
    `;
export type SelectCardMutationFn = ApolloReactCommon.MutationFunction<SelectCardMutation, SelectCardMutationVariables>;

/**
 * __useSelectCardMutation__
 *
 * To run a mutation, you first call `useSelectCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectCardMutation, { data, loading, error }] = useSelectCardMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *      card: // value for 'card'
 *   },
 * });
 */
export function useSelectCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SelectCardMutation, SelectCardMutationVariables>) {
        return ApolloReactHooks.useMutation<SelectCardMutation, SelectCardMutationVariables>(SelectCardDocument, baseOptions);
      }
export type SelectCardMutationHookResult = ReturnType<typeof useSelectCardMutation>;
export type SelectCardMutationResult = ApolloReactCommon.MutationResult<SelectCardMutation>;
export type SelectCardMutationOptions = ApolloReactCommon.BaseMutationOptions<SelectCardMutation, SelectCardMutationVariables>;
export const GetUserCardsDocument = gql`
    query getUserCards($gameId: String!, $name: String!) {
  getUserCards(gameId: $gameId, name: $name) {
    user
    blackCard
    cards
  }
}
    `;

/**
 * __useGetUserCardsQuery__
 *
 * To run a query within a React component, call `useGetUserCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCardsQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUserCardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserCardsQuery, GetUserCardsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserCardsQuery, GetUserCardsQueryVariables>(GetUserCardsDocument, baseOptions);
      }
export function useGetUserCardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserCardsQuery, GetUserCardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserCardsQuery, GetUserCardsQueryVariables>(GetUserCardsDocument, baseOptions);
        }
export type GetUserCardsQueryHookResult = ReturnType<typeof useGetUserCardsQuery>;
export type GetUserCardsLazyQueryHookResult = ReturnType<typeof useGetUserCardsLazyQuery>;
export type GetUserCardsQueryResult = ApolloReactCommon.QueryResult<GetUserCardsQuery, GetUserCardsQueryVariables>;
export const GamePlayersDocument = gql`
    subscription gamePlayers($gameId: String!) {
  gamePlayers(gameId: $gameId) {
    gameId
    event
    host
    user
    userJoined {
      name
    }
    userLeft {
      name
    }
    users {
      name
      points
    }
  }
}
    `;

/**
 * __useGamePlayersSubscription__
 *
 * To run a query within a React component, call `useGamePlayersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGamePlayersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamePlayersSubscription({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGamePlayersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GamePlayersSubscription, GamePlayersSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GamePlayersSubscription, GamePlayersSubscriptionVariables>(GamePlayersDocument, baseOptions);
      }
export type GamePlayersSubscriptionHookResult = ReturnType<typeof useGamePlayersSubscription>;
export type GamePlayersSubscriptionResult = ApolloReactCommon.SubscriptionResult<GamePlayersSubscription>;
export const SelectWinningCardDocument = gql`
    mutation selectWinningCard($gameId: String!, $name: String!, $card: String!, $winningUser: String!) {
  selectWinningCard(gameId: $gameId, name: $name, card: $card, winningUser: $winningUser)
}
    `;
export type SelectWinningCardMutationFn = ApolloReactCommon.MutationFunction<SelectWinningCardMutation, SelectWinningCardMutationVariables>;

/**
 * __useSelectWinningCardMutation__
 *
 * To run a mutation, you first call `useSelectWinningCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectWinningCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectWinningCardMutation, { data, loading, error }] = useSelectWinningCardMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      name: // value for 'name'
 *      card: // value for 'card'
 *      winningUser: // value for 'winningUser'
 *   },
 * });
 */
export function useSelectWinningCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SelectWinningCardMutation, SelectWinningCardMutationVariables>) {
        return ApolloReactHooks.useMutation<SelectWinningCardMutation, SelectWinningCardMutationVariables>(SelectWinningCardDocument, baseOptions);
      }
export type SelectWinningCardMutationHookResult = ReturnType<typeof useSelectWinningCardMutation>;
export type SelectWinningCardMutationResult = ApolloReactCommon.MutationResult<SelectWinningCardMutation>;
export type SelectWinningCardMutationOptions = ApolloReactCommon.BaseMutationOptions<SelectWinningCardMutation, SelectWinningCardMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    user {
      _id
      email
    }
  }
}
    `;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($email: String!, $password: String!) {
  registerUser(email: $email, password: $password) {
    user {
      _id
      email
    }
  }
}
    `;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;