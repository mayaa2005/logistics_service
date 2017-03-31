/**
 * Created by pengxiaojing on 2017/2/28.
 */

import { combineReducers } from 'redux';

import jobInfoReducer from './jobInfoReducer';
import orderInfoReducer from '../../orderInfoReducer';

const jobInfoRootReducer = combineReducers({
  jobInfo: jobInfoReducer,
  orderInfo: orderInfoReducer
});

export default jobInfoRootReducer;
