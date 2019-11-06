import { CHANGE_USER_STATUS } from '../actions/types';

const INIT_STATE = {
  isSignedIn: null,
  uid: null,
  profile: null,
};

export default (state = INIT_STATE, {type, payload }) => {
  switch (type) {
    case CHANGE_USER_STATUS:
        
        if(payload){
          const {email, uid} = payload;
          return {
            ...state,
            isSignedIn: true,
            uid: uid,
            profile: email,
          };
        } else {
          return {
            ...state,
            isSignedIn: null,
            uid: null,
            profile: null,
          };
        }
        
    default:
      return state;
  }
};
