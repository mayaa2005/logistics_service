import {deepAssign, getValue} from '../../toolFunction';
import listPageReducer from './listPageReducer';
import editReducer from './editReducer';

const initReducer = (state, {initState}) => {
  return initState;
};
const getTitle = (state) => {
  return '结算单号:RC201612080001';
};

const keyAddReducer = (state) => {
  let key = `billReceiveEdit-${state.tabs.length}`;
  let title = getTitle(state);
  let [...newTabs] = state.tabs;
  newTabs.push({key, title});
  return Object.assign({}, state, {tabs: newTabs}, {[key]: {init: true}}, {currentKey: key});
};

const keyDeleteReducer = (state, action) => {
  return state;
};
const keyChangeReducer = (state, {currentKey}) => {
  return Object.assign({}, state, {currentKey: currentKey});
};

const reducers = {
  billReceiveInit: initReducer,
  billReceiveKeyAdd: keyAddReducer,
  billReceiveKeyDelete: keyDeleteReducer,
  billReceiveKeyChange: keyChangeReducer
};

const dispatchReducer = (state, action) => {
  let {currentKey} = state;
  const preState = getValue(state, currentKey);
  let newState = {};
  if (preState) {
    if (currentKey === 'billReceiveIndex') {
      newState = listPageReducer(preState, action);
    }else {
      newState = editReducer(preState, action);
    }
    if (preState !== newState) {
      return deepAssign(state, newState, currentKey);
    }
  }
  return state;
};

const receiveReducer = (state = {init: true}, action) => {
  if (reducers.hasOwnProperty(action.type)) {
    return reducers[action.type](state, action);
  }
  else {
    return dispatchReducer(state, action);
  }
};

export default receiveReducer;
