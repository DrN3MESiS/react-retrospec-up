import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import { reducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  form: reducer,
});
