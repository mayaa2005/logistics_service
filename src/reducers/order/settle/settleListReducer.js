import { swapItems } from '../../toolFunction';

const settleListCols = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { settleListCols: items });
  } else if (status) {
    console.log('settleListCols:', status);
    return state;
  }
  return state;
};

const settleList = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { settleList: items });
  } else if (status) {
    console.log('settleList:', status);
    return state;
  }
  return state;
};

const checkList = (state, action) => {
  let {isCheckAll, checked, index} = action;
  let [...items] = state.settleList;
  if (isCheckAll) {
    for (let item of items) {
      item.checked = checked;
    }
  } else {
    items[index].checked = checked;
  }
  return Object.assign({}, state, {settleList: items});
};
const swapCol = (state, action) => {
  let {key1, key2} = action;
  let [...cols] = state.settleListCols;
  return Object.assign({}, state, { settleListCols: swapItems(cols, key1, key2)} );
};
const modal = (state, action) => {
  return Object.assign({}, state, {showModal: action.isShow});
};
const modalCheckChange = (state, action) => {
  let [...cols2] = state.settleListCols;
  for (let col of cols2) {
    if (col.title == action.name){
      col.hide = !col.hide;
      break;
    }
  }
  return Object.assign({}, state, {settleListCols: cols2});
};

const initState = {
  settleListCols: [],
  settleList: [],
  showModal: false,
};
const settleListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'settleListCols':
      return settleListCols(state, action);
    case 'settleList':
      return settleList(state, action);
    case "settleCheckList":
      return checkList(state, action);
    case "settleSwapCol":
      return swapCol(state, action);
    case "settleSortCol":
      return state;
    case "settleModal":
      return modal(state, action);
    case "settleModalCheckChange":
      return modalCheckChange(state, action);
    default:
      return state;
  }
};

export default settleListReducer;
