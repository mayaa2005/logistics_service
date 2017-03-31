/**
 * Created by pengxiaojing on 2017/2/28.
 */

import { combineReducers } from 'redux';
import settleReducer from './settleReducer';
import settleListReducer from './settleListReducer';
import editInfoReducer from './editInfoReducer';

const settleRootReducer = combineReducers({
  settle:settleReducer,
  settleList: settleListReducer,
  editInfo: editInfoReducer

});

export default settleRootReducer;
