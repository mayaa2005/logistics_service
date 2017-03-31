import {deepAssign, swapItems, composeReducers, combineReducers, mapReducer} from '../toolFunction';
import splitReducer from './split';
import optimizeReducer from './optimize';

const initReducer = (state, {key1, key2, special, config, payload}) => {
  let newState = deepAssign(state, payload, key1, key2);
  newState.current = {key1, key2};
  if (!state.config && !special) {
    newState.config = config;
  }
  return newState;
};

const keyChangeReducer = (state, {key1, key2}) => {
  return deepAssign(state, {key1, key2}, 'current');
};

const changeReducer = (state, {key, value}) => {
  return deepAssign(state, {[key]: value}, 'search', 'data');
};

const searchReducer = (state) => {
  return state;
};

const moreReducer = (state) => {
  return deepAssign(state, {isMore: true}, 'search');
};

const lessReducer = (state) => {
  return deepAssign(state, {isMore: false}, 'search');
};

const resetReducer = (state) => {
  return deepAssign(state, {data: {}}, 'search');
};

const checkReducer = (state, {isAll, checked, rowIndex}) => {
  let items = state.table.items;
  if (isAll) {
    items.filter(item => item.checked = checked);
  } else {
    items[rowIndex].checked = checked;
  }
  return deepAssign(state, {items}, 'table');
};

const sortReducer = (state) => {
  return state;
};

const swapReducer = (state, {key1, key2}) => {
  const cols = swapItems(state.table.cols, key1, key2);
  return deepAssign(state, {cols}, 'table');
};

const pageNumberReducer = (state, {pageNumber}) => {
  return deepAssign(state, {currentPage: pageNumber}, 'pagination', 'page');
};

const pageSizeReducer = (state, {pageNumber, pageSize}) => {
  return deepAssign(state, {currentPage: pageNumber, pageSize}, 'pagination', 'page');
};

const splitDialog = (state, action) => {
  const newState = splitReducer(undefined, action);
  return deepAssign(state, newState, 'split');
};

const collapseReducer = (state) => {
  console.log('collapse');
  return state;
};

const optimizeDialog = (state, action) => {
  const newState = optimizeReducer(undefined, action);
  return deepAssign(state, newState, 'optimize');
};

const appendReducer = (state) => {
  console.log('append');
  return state;
};

const commitReducer = (state) => {
  console.log('commit');
  return state;
};

const configReducer = (state) => {
  console.log('config');
  return state;
};

const reducers = {
  planInit: initReducer,
  planKeyChange: keyChangeReducer
};

const reducers2 = {
  planChange: changeReducer,
  planSearch: searchReducer,
  planMore: moreReducer,
  planLess: lessReducer,
  planReset: resetReducer,

  planCheck: checkReducer,
  planSort: sortReducer,
  planSwap: swapReducer,

  planPageNumber: pageNumberReducer,
  planPageSize: pageSizeReducer,

  planSplit: splitDialog,
  planCollapse: collapseReducer,
  planOptimize: optimizeDialog,
  planAppend: appendReducer,
  planCommit: commitReducer,
  planConfig: configReducer
};

const reducers3 = {
  split: splitReducer,
  optimize: optimizeReducer
};

const createKeyReducer = () => {
  const reducer = composeReducers(reducers2, combineReducers(reducers3));
  return (state) => {
    const {key1, key2} = state.current || {};
    return {keys: [key1, key2], reducer};
  };
};

const planReducer = composeReducers(reducers, mapReducer(createKeyReducer()), {});

export default planReducer;
