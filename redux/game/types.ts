import { GamePlayer, CardsToJudge } from '../../__generated__/types';
import { GameActions } from './actions';

const { joinGame, leaveGame } = GameActions;

export interface GameState {
  [key: string]: any;
  gameId: string;
  users: Array<GamePlayer>;
  subscribedToGame: boolean;
  running: boolean;
  cards: Array<string>;
  blackCard: string;
  roundStatus?: string
  cardsToJudge?: [CardsToJudge]
}

interface JoinGameAction {
  type: typeof joinGame;
  payload: {
    name: string;
    gameId: string;
  };
}

interface LeaveGameAction {
  type: typeof leaveGame;
  payload: {
    name: string;
  };
}

export type GameActionTypes = JoinGameAction | LeaveGameAction | any;
