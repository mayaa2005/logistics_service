import { swapItems } from '../../toolFunction';

const changePayListCols = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { changePayListCols: items });
  } else if (status) {
    console.log('changePayListCols:', status);
    return state;
  }
  return state;
};

const changePayList = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { changePayList: items });
  } else if (status) {
    console.log('changePayList:', status);
    return state;
  }
  return state;
};

const checkList = (state, action) => {
  let {isCheckAll, checked, index} = action;
  let [...items] = state.changePayList;
  if (isCheckAll) {
    for (let item of items) {
      item.checked = checked;
    }
  } else {
    items[index].checked = checked;
  }
  return Object.assign({}, state, {changePayList: items});
};
const swapCol = (state, action) => {
  let {key1, key2} = action;
  let [...cols] = state.changePayListCols;
  return Object.assign({}, state, { changePayListCols: swapItems(cols, key1, key2)} );
};
const modal = (state, action) => {
  return Object.assign({}, state, {showModal: action.isShow});
};
const modalCheckChange = (state, action) => {
  let [...cols2] = state.changePayListCols;
  for (let col of cols2) {
    if (col.title == action.name){
      col.hide = !col.hide;
      break;
    }
  }
  return Object.assign({}, state, {changePayListCols: cols2});
};

const initState = {
  changePayListCols: [],
  changePayList: [],
  showModal: false,
};
const changePayListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'payChangePayListCols':
      return changePayListCols(state, action);
    case 'payChangePayList':
      return changePayList(state, action);
    case "payChangePayCheckList":
      return checkList(state, action);
    case "receiveChangeReceiveSwapCol":
      return swapCol(state, action);
    case "payChangePaySortCol":
      return state;
    case "payChangePayModal":
      return modal(state, action);
    case "payChangePayModalCheckChange":
      return modalCheckChange(state, action);
    default:
      return state;
  }
};

export default changePayListReducer;
