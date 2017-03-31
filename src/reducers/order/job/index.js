/**
 * Created by pengxiaojing on 2017/2/28.
 */

import { combineReducers } from 'redux';

import jobReducer from './jobReducer';
import orderListReducer from '../orderListReducer';
import jobInfoRootReducer from './jobInfo';

const jobRootReducer = combineReducers({
  job: jobReducer,
  orderList: orderListReducer,
  jobInfoRoot: jobInfoRootReducer
});

export default jobRootReducer;
