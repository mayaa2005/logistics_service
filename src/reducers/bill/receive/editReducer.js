import {deepAssign} from '../../toolFunction';

const initReducer = (state, {initState}) => {
  return initState;
};

const tabChangeReducer = (state, {currentKey}) => {
  return deepAssign(state, {currentKey: currentKey}, 'tab');
};

const reducers = {
  billReceiveEditInit: initReducer,
  billReceiveEditTabChange: tabChangeReducer
};

const editReducer = (state = {}, action) => {
  const exist = Object.keys(reducers).some(type => action.type === type);
  if (!exist) return state;
  return reducers[action.type](state, action);
};

export default editReducer;
