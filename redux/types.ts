import { GameState } from './game/types';
import { UserState } from './user/types';
import { UtilState } from './utils/types'

export interface ReduxState {
  Game: GameState;
  User: UserState;
  Utils: UtilState;
}
