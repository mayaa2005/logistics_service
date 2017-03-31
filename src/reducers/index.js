import { combineReducers } from 'redux';
import expandReducer from './expandReducer';
import othersReducer from './others';
import orderReducer from './order';
import planReducer from './plan';
import homeReducer from './home';
import billReducer from './bill';
import basicReducer from './basic';

const rootReducer = combineReducers({
  expanded: expandReducer,
  others: othersReducer,
  home: homeReducer,
  order: orderReducer,
  plan: planReducer,
  bill: billReducer,
  basic: basicReducer
});

export default rootReducer;
