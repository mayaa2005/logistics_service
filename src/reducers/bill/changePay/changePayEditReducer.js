import {deepAssign} from '../../toolFunction';

const detailTable= {
  costType: '',
  businessAttribute : '',
  costName: '',
  accountUnit:'',
  taxWay:'',
  price:'',
  quantity:'',
  rate:'',
  tax:'',
  netPrice: '',
  payNumber:'',
  remarks: ''
};

const editChangePay = (state, action) => {
  let {changePayInfo, tabKey} = action;
  if(changePayInfo) {
    let newState = Object.assign({}, state);
    newState[tabKey] = changePayInfo;
    return newState;
  }
  return state;
};

const cancelTab = (state, action) => {
  let {tabKey} = action;
  let newState = Object.assign({}, state);
  delete newState[tabKey];
  return newState;
};

const table2AddRow = (state, action) => {
  let {tabKey} = action;
  let newState = Object.assign({}, state);
  newState[tabKey] = Object.assign({}, state[tabKey]);
  let newTable = [];
  if (state[tabKey].detailTable) {
    [...newTable] = state[tabKey].detailTable;
  }
  newTable.push({});
  newState[tabKey].detailTable=newTable;
  return newState;
};

const table2ContentChange = (state, action) => {
  let {tabKey, rowIndex, keyName, value} = action;
  let newState = Object.assign({}, state);
  let newTable = state[tabKey].detailTable.map( (item, index) => {
    let newItem = Object.assign({}, item);
    if (index === rowIndex) {
      newItem[keyName] = value;
    }
    return newItem;
  });
  newState[tabKey] = Object.assign({}, state[tabKey], {detailTable: newTable});
  //console.log(newState);
  return newState;
};

const tableCheck = (state,action ) => {
  let {tabKey, rowIndex, keyName, checked}=action;
  let newState=Object.assign({},state);
  let newTable = state[tabKey].detailTable.map((item, index) => {
    let newItem = Object.assign({}, item);
    if (rowIndex === -1) {
      newItem[keyName] = checked;
    } else if (index == rowIndex) {
      newItem[keyName] = checked;
    }
    return newItem;
  });
  newState[tabKey]=Object.assign({}, state[tabKey], {detailTable: newTable});
  return newState;
};

const table2Delete = (state, action) => {
  let {tabKey } = action;
  let newState = Object.assign({}, state);
  let newTable = state[tabKey].detailTable.filter( (item, index) => item.checked !== true );
  newState[tabKey] = Object.assign({}, state[tabKey], {detailTable: newTable});
  return newState;
};

const changePayEditReducer = (state = {}, action) => {
  switch (action.type) {
    case 'payEditChangePay':
      return editChangePay(state, action);
    case 'payTableCheck':
      return tableCheck(state, action);
    case 'payCancelTab':
      return cancelTab(state, action);
    case 'payTable2AddRow':
      return table2AddRow(state, action);
    case 'payTable2ContentChange':
      return table2ContentChange(state, action);
    case 'payTable2Delete':
      return table2Delete(state, action);
    default:
      return state;
  }
};

export default changePayEditReducer;
