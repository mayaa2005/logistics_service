/**
 * Created by pengxiaojing on 2017/2/28.
 */

import { combineReducers } from 'redux';

import orderInfoReducer from '../../orderInfoReducer';
import goodsModalRootReducer from './goodsSplitModal';
import jobSplitModalReducer from './jobSplitModalReducer';

const orderInfoRootReducer = combineReducers({
  orderInfo: orderInfoReducer,
  goodsModalRoot: goodsModalRootReducer,
  jobSplitModal: jobSplitModalReducer
});

export default orderInfoRootReducer;
