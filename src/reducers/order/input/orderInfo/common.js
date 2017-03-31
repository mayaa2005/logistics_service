import {deepAssign} from '../../../toolFunction';
import orderBaseInfoReducer from './orderBaseInfo';
import nativeTransportReducer from './nativeTransport';

const optionsReducer = (state, {options}) => {
  let newState = deepAssign(state, options, 'data', 'options');
  return newState;
};

const serviceReducers = {
  orderBaseInfo: orderBaseInfoReducer,
  nativeTransport: nativeTransportReducer
};
const inputChangeReducer = (state, action) => {
  if (serviceReducers.hasOwnProperty(action.serviceKey)) {
    return serviceReducers[action.serviceKey](state, action);
  }
}
const serviceCheckReducer = (state, {serviceKey, checked}) => {
  let newServiceTypeList = [];
  if (state.data.serviceTypeList) {
    [...newServiceTypeList] = state.data.serviceTypeList;
  }
  if(checked) {
    newServiceTypeList.push({serviceTypeGuid:serviceKey, serviceContent:{}});
  } else {
    newServiceTypeList = state.data.serviceTypeList.filter(item => item.serviceTypeGuid !== serviceKey);
  }
  return deepAssign(state, {serviceTypeList:newServiceTypeList}, 'data');
};

const addRowReducer = (state, {tableName, serviceKey}) => {
  let newTable = [];
  if (serviceKey == 'all') {
    if (state.data[tableName]) {
      [...newTable] = state.data[tableName];
    }
    newTable.push({});
    return deepAssign(state, {[tableName]: newTable}, 'data');
  }else {
    let newServiceTypeList = state.data.serviceTypeList.map(item => {
      if (item.serviceTypeGuid === serviceKey) {
        let newServiceContent = Object.assign({}, item.serviceContent);
        let newTable = [];
        if (newServiceContent[tableName]) {
          [...newTable] = newServiceContent[tableName];
        }
        newTable.push({});
        newServiceContent[tableName] = newTable;
        return deepAssign(item, {serviceContent: newServiceContent});
      }else {
        return item;
      }
    });
    return deepAssign(state, {serviceTypeList: newServiceTypeList}, 'data');
  }
};

const contentChangeReducer = (state, {tableName, serviceKey, rowIndex, keyName, value}) => {
  let newTable = [];
  if (serviceKey == 'all') {
    if (state.data[tableName]) {
      [...newTable] = state.data[tableName];
    }
    newTable[rowIndex] = Object.assign({}, newTable[rowIndex]);
    newTable[rowIndex][keyName] = value;
    return deepAssign(state, {[tableName]: newTable}, 'data');
  }else {
    let newServiceTypeList = state.data.serviceTypeList.map(item => {
      if (item.serviceTypeGuid === serviceKey) {
        let newServiceContent = Object.assign({}, item.serviceContent);
        let newTable = [];
        if (newServiceContent[tableName]) {
          [...newTable] = newServiceContent[tableName];
        }
        newTable[rowIndex] = Object.assign({}, newTable[rowIndex]);
        newTable[rowIndex][keyName] = value;
        newServiceContent[tableName] = newTable;
        return deepAssign(item, {serviceContent: newServiceContent});
      }else {
        return item;
      }
    });
    return deepAssign(state, {serviceTypeList: newServiceTypeList}, 'data');
  }
};
const deleteReducer = (state, {tableName, serviceKey, rowIndex, keyName}) => {
  let newTable = [];
  if (serviceKey == 'all') {
    newTable = state.data[tableName].filter( (item, index) => index != rowIndex );
    return deepAssign(state, {[tableName]: newTable}, 'data');
  }else {
    let newServiceTypeList = state.data.serviceTypeList.map(item => {
      if (item.serviceTypeGuid === serviceKey) {
        let newServiceContent = Object.assign({}, item.serviceContent);
        let newTable = newServiceContent[tableName].filter( (item, index) => index != rowIndex );
        newServiceContent[tableName] = newTable;
        return deepAssign(item, {serviceContent: newServiceContent});
      }else {
        return item;
      }
    });
    return deepAssign(state, {serviceTypeList: newServiceTypeList}, 'data');
  }
};

export {optionsReducer, inputChangeReducer, serviceCheckReducer, addRowReducer, contentChangeReducer, deleteReducer};
