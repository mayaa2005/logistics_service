import { combineReducers } from 'redux';
import changePayReducer from './changePayReducer';
import changePayListReducer from './changePayListReducer';
import changePayEditReducer from './changePayEditReducer';

const changePayRootReducer = combineReducers({
  changePay:changePayReducer,
  changePayList: changePayListReducer,
  changePayEdit: changePayEditReducer
});

export default changePayRootReducer;
