import { UserActions } from './actions';
import { UserState } from './types';

const initState: UserState = {
  loggedIn: false,
  gameStatus: {
    joining: false,
    gameName: '',
  },
  details: {
    _id: '',
    email: '',
    name: '',
  },
};

const User = (state = initState, action: any) => {
  switch (action.type) {
    case UserActions.loggedIn:
      return { ...state, loggedIn: true, details: { ...action.payload.user } };
    case UserActions.joiningGame:
      return {
        ...state,
        joiningGame: { joining: true, name: action.payload.name },
      };
    case UserActions.joinedGame:
      return {
        ...state,
        joiningGame: { joining: false },
      };
    case UserActions.updateUser:
      return {
        ...state,
        details: { ...state.details, name: action.payload.name }
      }
    default:
      return state;
  }
};

export default User;
