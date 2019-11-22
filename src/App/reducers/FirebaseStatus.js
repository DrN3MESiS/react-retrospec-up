import { CHANGE_USER_STATUS } from '../actions/types';

const INIT_STATE = {
  isSignedIn: null,
  uid: null,
  email: null,
  retros: null
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_USER_STATUS:
      if (payload.uid) {
        return {
          ...state,
          isSignedIn: true,
          uid: payload.uid,
          email: payload.email,
          retros: payload.retros
        };
      } else {
        return {
          ...state,
          isSignedIn: null,
          uid: null,
          email: null,
          retros: null
        };
      }

    default:
      return state;
  }
};
