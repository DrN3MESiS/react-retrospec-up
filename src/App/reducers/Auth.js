import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INIT_STATE = {
  isSignedIn: null,
  userId: null,
  userProfile: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: 0,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, userProfile: null };
    default:
      return state;
  }
};
