import { combineReducers } from 'redux';
import StatusReducer from './FirebaseStatus';
import { reducer } from 'redux-form';

export default combineReducers({
  auth_status: StatusReducer,
  form: reducer,
});
