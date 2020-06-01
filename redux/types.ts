import { GameState } from './game/types';
import { UserState } from './user/types';

export interface ReduxState {
  Game: GameState;
  User: UserState;
}
