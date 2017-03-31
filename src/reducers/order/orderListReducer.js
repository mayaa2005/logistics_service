/**
 * Created by pengxiaojing on 2017/2/14.
 */

import { swapItems, deepAssign } from '../toolFunction';

const orderListCols = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { orderListCols: items });
  } else if (status) {
    console.log('orderListCols:', status);
    return state;
  }
  return state;
};

const orderList = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { orderList: items });
  } else if (status) {
    console.log('orderList:', status);
    return state;
  }
  return state;
};

const checkList = (state, action) => {
  let {isCheckAll, checked, index} = action;
  let [...items] = state.orderList;
  if (isCheckAll) {
    for (let item of items) {
      item.checked = checked;
    }
  } else {
    items[index].checked = checked;
  }
  return Object.assign({}, state, {orderList: items});
};
const swapCol = (state, action) => {
  let {key1, key2} = action;
  let [...cols] = state.orderListCols;
  return Object.assign({}, state, { orderListCols: swapItems(cols, key1, key2)} );
};

const sortCol = (state, action) => {
  return state;
};

const modal = (state, action) => {
  return Object.assign({}, state, {showModal: action.isShow});
};
const modalCheckChange = (state, action) => {
  let [...cols2] = state.orderListCols;
  for (let col of cols2) {
    if (col.title == action.name){
      col.hide = !col.hide;
      break;
    }
  }
  return Object.assign({}, state, {orderListCols: cols2});
};

const initState = {
  input: {
    orderListCols: null,
    orderList: null,
    showModal: false,
  },
  split: {
    orderListCols: null,
    orderList: null,
    showModal: false,
  },
  job: {
    orderListCols: null,
    orderList: null,
    showModal: false,
  },
  settle: {
    orderListCols: null,
    orderList: null,
    showModal: false,
  }
};

const reducers = {
  orderListCols: orderListCols,
  orderListItems: orderList,
  orderListCheck: checkList,
  orderListSwapCol: swapCol,
  orderListSortCol: sortCol,
  orderListModal: modal,
  orderListModalCheck: modalCheckChange
};

const mainReducer = (state, action) => {
  const {rootType} = action;
  const newState = reducers[action.type](state[rootType], action);
  return deepAssign(state, newState, rootType);
};

const orderListReducer = (state = initState, action) => {
  const exist = Object.keys(reducers).some(type => action.type === type);
  return exist ? mainReducer(state, action) : state;
};

export default orderListReducer;
