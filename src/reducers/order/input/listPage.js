import {swapItems, deepAssign, composeReducers} from '../../toolFunction';

const initReducer = (state, {label}) => {
  return {init:true, label};
};

const initDataReducer = (state, {data}) => {
  let newState = deepAssign(state, {data});
  newState.init = false;
  return newState;
};

const checkReducer = (state, {isAll, checked, rowIndex}) => {
  let items = [];
  if (isAll) {
    items = state.data.table.items.map(item => {
      return Object.assign({}, item, {checked: checked});
    });
  } else {
    [...items] = state.data.table.items;
    items[rowIndex] = Object.assign({}, items[rowIndex], {checked:checked});
  }
  return deepAssign(state, {items:items}, 'data', 'table');
};

const sortReducer = (state) => {
  return state;
};

const deleteReducer = (state) => {
  return state;
};
const importReducer = (state) => {
  return state;
};
const swapReducer = (state, {key1, key2}) => {
  const newState = {table: swapItems(state.label.table, key1, key2)};
  return deepAssign(state, newState, 'label');
};

const reducers = {
  orderInputIndexInit: initReducer,
  orderInputIndexDataInit: initDataReducer,
  orderInputDelete: deleteReducer,
  orderInputImport: importReducer,
  orderInputCheck: checkReducer,
  orderInputSort: sortReducer,
  orderInputSwap: swapReducer
};

const listPageReducer = composeReducers(reducers);

export default listPageReducer;
