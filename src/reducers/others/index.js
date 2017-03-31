/**
 * Created by pengxiaojing on 2017/2/28.
 */
import { combineReducers } from 'redux';

import globalSourceReducer from './globalSourceReducer';

const othersReducer = combineReducers({
  globalSource: globalSourceReducer
});


export default othersReducer;
