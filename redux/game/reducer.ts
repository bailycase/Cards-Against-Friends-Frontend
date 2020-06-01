import { GameActions } from './actions';
import { GameState, GameActionTypes } from './types';

const initState: GameState = {
  gameId: '',
  users: [],
  subscribedToGame: false,
  running: false,
  cards: [],
  blackCard: '',
};

const Game = (state = initState, action: GameActionTypes): GameState => {
  switch (action.type) {
    case GameActions.joinGame:
      // if (state.users.includes(action.payload.name)) return { ...state };
      return {
        ...state,
        gameId: action.payload.gameId,
        users: [
          ...state.users,
          {
            name: action.payload.name,
            points: 0,
          },
        ],
        subscribedToGame: true,
      };
    case GameActions.userJoin:
      return {
        ...state,
        users: [
          ...state.users,
          {
            name: action.payload.newUser,
            points: 0,
          },
        ],
      };
    case GameActions.userLeave: {
      const users = state.users.filter((user) => user.name !== action.payload.user);
      return { ...state, users };
    }
    case GameActions.leaveGame:
      return initState;
    case GameActions.subscribeToGame:
      return { ...state, subscribedToGame: true };
    case GameActions.unsubscribeFromGame:
      return { ...state, subscribedToGame: false };
    case GameActions.createGame:
      return { ...state, gameId: action.payload.gameId };
    case GameActions.matchGame:
      return { ...state, ...action.payload.gameData };
    case GameActions.gameStarted:
      return {
        ...state,
        running: action.payload.running,
        cardCzar: action.payload.cardCzar,
        currentRound: action.payload.currentRound
      };
    case GameActions.gameStopped:
      return { ...state, running: action.payload, currentRound: action.payload.currentRound, cardsToJudge: undefined };
    case GameActions.setBlackCard:
      return { ...state, blackCard: action.payload.blackCard };
    case GameActions.setWhiteCards:
      return { ...state, cards: action.payload.whiteCards };
    case GameActions.userSelectCard: {
      const user = state.users.filter(
        (selectedUser) => selectedUser.name === action.payload.user,
      )[0];
      const oldUsers = state.users.filter((selectedUser) => selectedUser !== user);
      const updatedUser = {
        ...user,
        cardSelected: true,
      };
      return {
        ...state,
        users: [...oldUsers, updatedUser],
      };
    }
    case GameActions.roundUpdate: {
      return { ...state, currentRound: action.payload.currentRound, cardCzar: action.payload.cardCzar || state.cardCzar }
    }
    case GameActions.addJudgingCards: {
      return { ...state, cardsToJudge: action.payload.cardsToJudge }
    }
    case GameActions.updateUsers: {
      return { ...state, users: action.payload.users }
    }
    default:
      return state;
  }
};

export default Game;
