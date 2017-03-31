import {deepAssign} from '../../toolFunction';

const initReducer = (state, {payload}) => {
  const newState = deepAssign(state, payload);
  newState.init = false;
  return newState;
};

const reducers = {
  billReceiveListPageInit: initReducer
};

const listPageReducer = (state = {}, action) => {
  const exist = Object.keys(reducers).some(type => action.type === type);
  if (!exist) return state;
  return reducers[action.type](state, action);
};

export default listPageReducer;
