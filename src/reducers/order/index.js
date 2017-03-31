
import { combineReducers } from 'redux';

import inputReducer from './input';
import splitReducer from './split';
import jobRootReducer from './job';
import settleRootReducer from './settle';

const orderReducer = combineReducers({
  input: inputReducer,
  split: splitReducer,
  jobRoot: jobRootReducer,
  settleRoot: settleRootReducer
});

export default orderReducer;
