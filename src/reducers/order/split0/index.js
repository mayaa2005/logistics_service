/**
 * Created by pengxiaojing on 2017/2/28.
 */

import { combineReducers } from 'redux';

import splitReducer from './splitReducer';
import orderListReducer from '../orderListReducer';
import orderInfoRootReducer from './orderInfo';

const splitRootReducer = combineReducers({
  split: splitReducer,
  orderList: orderListReducer,
  orderInfoRoot: orderInfoRootReducer
});

export default splitRootReducer;
