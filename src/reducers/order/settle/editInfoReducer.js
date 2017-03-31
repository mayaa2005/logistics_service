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
  incomeNumber:'',
  remarks: ''
};


const editOrder = (state, action) => {
  let {settleInfo, tabKey} = action;
  console.log(tabKey);
  if(settleInfo) {
    let newState = Object.assign({}, state);
    newState[tabKey] = settleInfo;
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

const newDetail = (state, action) => {
  let {tabKey} = action;
  let newState = Object.assign({}, state);
  newState[tabKey] = Object.assign({}, state[tabKey]);
  let [...newTable] = state[tabKey].detailTable;
  newTable.push(detailTable);
  newState[tabKey].detailTable=newTable;
  return newState;
};

const table2ContentChange = (state, action) => {
  let {tabKey, rowIndex, keyName, value} = action;
  console.log(action);
  console.log(state);
  let newState = Object.assign({}, state);
  //let [...newTable] = state[tabKey].detailTable;
  //newTable[rowIndex] = Object.assign({}, newTable[rowIndex]);
  //newTable[rowIndex][keyName] = value;
  let newTable = state[tabKey].detailTable.map( (item, index) => {
    let newItem = Object.assign({}, item);
    if (index === rowIndex) {
      newItem[keyName] = value;
    }
    return newItem;
  });
  newState[tabKey] = Object.assign({}, state[tabKey], {detailTable: newTable});
  console.log(newState);
  return newState;
};


const table2Delete = (state, action) => {
  let {tabKey,  serviceType, rowIndex } = action;
  let newState = Object.assign({}, state);
  newState[tabKey] = Object.assign({}, state[tabKey]);
  return newState;
};


const editInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'settleEditOrder':
      return editOrder(state, action);
    case 'settleCancelTab':
      return cancelTab(state, action);
    case 'settleNewDetail':
      return newDetail(state, action);
    case 'settleTable2ContentChange':
      return table2ContentChange(state, action);
    case 'settleTable2Delete':
      return table2Delete(state, action);
    default:
      return state;
  }
};

export default editInfoReducer;
