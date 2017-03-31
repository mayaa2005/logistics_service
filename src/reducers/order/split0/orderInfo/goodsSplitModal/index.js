/**
 * Created by pengxiaojing on 2017/2/28.
 */

import { combineReducers } from 'redux';

import goodsSplitModalReducer from './goodsSplitModalReducer';
import splitCountModalReducer from './splitCountModalReducer';

const goodsModalRootReducer = combineReducers({
  goodsSplitModal: goodsSplitModalReducer,
  splitCountModal: splitCountModalReducer
});

export default goodsModalRootReducer;
