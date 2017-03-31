import { swapItems } from '../../toolFunction';

const changeReceiveListCols = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { changeReceiveListCols: items });
  } else if (status) {
    console.log('changeReceiveListCols:', status);
    return state;
  }
  return state;
};

const changeReceiveList = (state, action) => {
  let {items, status} = action;
  if (items) {
    return Object.assign({}, state, { changeReceiveList: items });
  } else if (status) {
    console.log('changeReceiveList:', status);
    return state;
  }
  return state;
};

const checkList = (state, action) => {
  let {isCheckAll, checked, index} = action;
  let [...items] = state.changeReceiveList;
  if (isCheckAll) {
    for (let item of items) {
      item.checked = checked;
    }
  } else {
    items[index].checked = checked;
  }
  return Object.assign({}, state, {changeReceiveList: items});
};
const swapCol = (state, action) => {
  let {key1, key2} = action;
  let [...cols] = state.changeReceiveListCols;
  return Object.assign({}, state, { changeReceiveListCols: swapItems(cols, key1, key2)} );
};
const modal = (state, action) => {
  return Object.assign({}, state, {showModal: action.isShow});
};
const modalCheckChange = (state, action) => {
  let [...cols2] = state.changeReceiveListCols;
  for (let col of cols2) {
    if (col.title == action.name){
      col.hide = !col.hide;
      break;
    }
  }
  return Object.assign({}, state, {changeReceiveListCols: cols2});
};

const initState = {
  changeReceiveListCols: [],
  changeReceiveList: [],
  showModal: false,
};
const changeReceiveListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'receiveChangeReceiveListCols':
      return changeReceiveListCols(state, action);
    case 'receiveChangeReceiveList':
      return changeReceiveList(state, action);
    case "receiveChangeReceiveCheckList":
      return checkList(state, action);
    case "receiveChangeReceiveSwapCol":
      return swapCol(state, action);
    case "receiveChangeReceiveSortCol":
      return state;
    case "receiveChangeReceiveModal":
      return modal(state, action);
    case "receiveChangeReceiveModalCheckChange":
      return modalCheckChange(state, action);
    default:
      return state;
  }
};

export default changeReceiveListReducer;
