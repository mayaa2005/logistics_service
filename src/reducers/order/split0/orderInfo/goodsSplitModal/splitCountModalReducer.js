/**
 * Created by pengxiaojing on 2017/2/14.
 */
import {deepAssign} from '../../../../toolFunction';

const init = (state, {tabKey, orderInfo}) => {
  if (orderInfo) {
    let newState = Object.assign({}, state);
    newState[tabKey] = {
      isShow: false
    };
    return newState;
  }
  return state;
};
const unInit = (state, {tabKey}) => {
  let newState = Object.assign({}, state);
  delete newState[tabKey];
  return newState;
};

const initData = (state, {tableName, rowIndex, rowData }) => {
  let newItem = Object.assign({}, rowData,
    {number: ''},
    {weight: ''},
    {size: ''}
  );
  let table = [];
  table.push(newItem);
  return Object.assign({}, state,
    {isShow: true},
    {originData: rowData},
    {originRowIndex: rowIndex},
    {originTableName: tableName},
    {table: table}
  );
};

const modalCancel = (state, {isShow}) => {
  return Object.assign({}, state, {isShow: isShow});
};

const check = (state, action) => {
  return true;
};

const countClick = (state, action) => {
  if (check(state, action)) {
    let {number, weight, size} = state.originData;
    let newNumber = Number(number);
    let newWeight = Number(weight);
    let newSize = Number(size);
    let newTable = state.table.map((item) => {
      newNumber -= Number(item.number);
      newWeight -= Number(item.weight);
      newSize -= Number(item.size);
      return item;
    });
    let newRow = Object.assign({}, state.originData, {number: String(newNumber)}, {weight: String(newWeight)}, {size: String(newSize)});
    newTable.push(newRow);
    return Object.assign({}, state, {table: newTable});
  }else {

  }
  return state;
};
const tableDelete = (state, {rowIndex}) => {
  let {number, weight, size} = state.table[rowIndex];
  let newNumber = Number(number);
  let newWeight = Number(weight);
  let newSize = Number(size);
  let length = state.table.length;
  if (length > 1) {
    let newTable = state.table.filter((item, index) => index !== rowIndex);
    newNumber += Number(newTable[length-2].number);
    newWeight += Number(newTable[length-2].weight);
    newSize += Number(newTable[length-2].size);
    newTable[length-2] = Object.assign({}, newTable[length-2], {number: String(newNumber)}, {weight: String(newWeight)}, {size: String(newSize)});
    return Object.assign({}, state, {table: newTable});
  }else {
    let newRow = Object.assign({}, state.originData, {number: ''}, {weight: ''}, {size: ''});
    return Object.assign({}, state, {table: [newRow]});
  }
};
const contentChange = (state, {rowIndex, keyName, value}) => {
  let newTable = state.table.map((item, index) => {
    let newItem = Object.assign({}, item);
    if (index === rowIndex) {
      newItem[keyName] = value;
    }
    return newItem;
  });
  return Object.assign({}, state, {table: newTable});
};

const reducers = {
  splitModalTableSplit: initData,
  splitCountModalCancel: modalCancel,
  splitCountModalCountClick: countClick,
  splitCountModalTableDelete: tableDelete,
  splitCountModalContentChange: contentChange
};

const mainReducer = (state, action) => {
  const {tabKey} = action;
  const newState = reducers[action.type](state[tabKey], action);
  return deepAssign(state, newState, tabKey);
};

const splitCountModalReducer = (state = {}, action) => {
  if (action.type === 'splitAddTab') {
    return init(state, action);
  }else if (action.type === 'splitCancelTab'){
    return unInit(state, action);
  }
  const exist = Object.keys(reducers).some(type => action.type === type);
  return exist ? mainReducer(state, action) : state;
};

export default splitCountModalReducer;
