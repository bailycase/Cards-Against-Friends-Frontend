import { combineReducers } from 'redux';
import User from './user/reducer';
import Game from './game/reducer';

const rootReducer = combineReducers({ User, Game });
export default rootReducer;
