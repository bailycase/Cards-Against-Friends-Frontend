import { combineReducers } from 'redux';
import User from './user/reducer';
import Game from './game/reducer';
import Utils from './utils/reducer'

const rootReducer = combineReducers({ User, Game, Utils });
export default rootReducer;
