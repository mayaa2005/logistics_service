/**
 * Created by pengxiaojing on 2017/2/28.
 */

import {deepAssign} from '../toolFunction';

const init = (state, {orderInfo, tabKey}) => {
  if(orderInfo) {
    return Object.assign({}, state, {[tabKey]: orderInfo}, {selectKey: tabKey});
  }
  return state;
};

const unInit = (state, {tabKey}) => {
  let newState = Object.assign({}, state);
  delete newState[tabKey];
  return newState;
};

const changeSelectKey = (state, {tabKey}) => {
  return Object.assign({}, state, {selectKey: tabKey});
};

const serviceTypeCheck = (state, {serviceType}) => {
  let value = state.serviceType ? !state.serviceType[serviceType] : true;
  return deepAssign(state, {[serviceType]: value}, 'serviceType');
};

const inputChange = (state, {infoType, key, value}) => {
  return deepAssign(state, {[key]: value}, infoType);
};

const table2AddRow = (state, {tableName, serviceType }) => {
  let newTable = [];
  if (serviceType == 'all') {
    if (state[tableName]) {
      [...newTable] = state[tableName];
    }
    newTable.push({});
    return Object.assign({}, state, {[tableName]: newTable});
  }else {
    if (state[serviceType] && state[serviceType][tableName]) {
      [...newTable] = state[serviceType][tableName];
    }
    newTable.push({});
    return deepAssign(state, {[tableName]: newTable}, serviceType);
  }
};

const table2ContentChange = (state, {tableName, serviceType, rowIndex, keyName, value}) => {
  let newTable = [];
  if (serviceType == 'all') {
    [...newTable] = state[tableName];
    newTable[rowIndex] = Object.assign({}, newTable[rowIndex]);
    newTable[rowIndex][keyName] = value;
    return Object.assign({}, state, {[tableName]: newTable});
  }else {
    [...newTable] = state[serviceType][tableName];
    newTable[rowIndex] = Object.assign({}, newTable[rowIndex]);
    newTable[rowIndex][keyName] = value;
    return deepAssign(state, {[tableName]: newTable}, serviceType);
  }
};

const table2Delete = (state, {tableName, serviceType, rowIndex }) => {
  let newTable = [];
  if (serviceType == 'all') {
    newTable = state[tableName].filter( (item, index) => index != rowIndex );
    return Object.assign({}, state, {[tableName]: newTable});
  }else {
    newTable = state[serviceType][tableName].filter( (item, index) => index != rowIndex );
    return deepAssign(state, {[tableName]: newTable}, serviceType);
  }
};
const orderInfoOptions = (state, {options}) => {
  let { customerList=[], paymentCustomers=[]} = options;
  let newState = deepAssign(state, options, 'originOptions');
  let delegateClient = customerList.map((item) => {
    return {id:item.customerGuid, value:item.customerName};
  });
  newState['options'] = {
    delegateClient: delegateClient
  };
  return newState;
};
const reducers = {
  inputServiceTypeCheck: serviceTypeCheck,
  inputInputChange: inputChange,
  inputTable2AddRow: table2AddRow,
  inputTable2ContentChange: table2ContentChange,
  inputTable2Delete: table2Delete,

  splitServiceTypeCheck: serviceTypeCheck,
  splitInputChange: inputChange,
  splitTable2AddRow: table2AddRow,
  splitTable2ContentChange: table2ContentChange,
  splitTable2Delete: table2Delete,

  jobServiceTypeCheck: serviceTypeCheck,
  jobInputChange: inputChange,
  jobTable2AddRow: table2AddRow,
  jobTable2ContentChange: table2ContentChange,
  jobTable2Delete: table2Delete,

  orderInfoOptions: orderInfoOptions,
};

const mainReducer = (state, action) => {
  const {tabKey} = action;
  const newState = reducers[action.type](state[tabKey], action);
  return deepAssign(state, newState, tabKey);
};

const orderInfoReducer = (state = {}, action) => {
  if (action.type === 'inputAddTab' || action.type === 'jobAddTab' || action.type === 'splitAddTab') {
      return init(state, action);
  }
  else if (action.type === 'inputCancelTab' || action.type === 'jobCancelTab' || action.type === 'splitCancelTab'){
    return unInit(state, action);
  }
  else if (action.type === 'inputTabSelect' || action.type === 'jobTabSelect' || action.type === 'splitTabSelect'){
    return changeSelectKey(state, action);
  }
  const exist = Object.keys(reducers).some(type => action.type === type);
  return exist ? mainReducer(state, action) : state;
};

export default orderInfoReducer;
