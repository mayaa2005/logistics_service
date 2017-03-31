import { combineReducers } from 'redux';
import changeReceiveReducer from './changeReceiveReducer';
import changeReceiveListReducer from './changeReceiveListReducer';
import changeReceiveEditReducer from './changeReceiveEditReducer';

const changeReceiveRootReducer = combineReducers({
  changeReceive:changeReceiveReducer,
  changeReceiveList: changeReceiveListReducer,
  changeReceiveEdit: changeReceiveEditReducer
});

export default changeReceiveRootReducer;
