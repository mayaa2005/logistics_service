import { combineReducers } from 'redux';
import receiveReducer from './receive';
import changeReceiveRootReducer from './changeReceive';
import changePayRootReducer from './changePay';
import extraReducer from './extra';

const billReducer = combineReducers({
  receive: receiveReducer,
  extra: extraReducer,
  changeReceiveRoot: changeReceiveRootReducer,
  changePayRoot: changePayRootReducer
});

export default billReducer;
