/**
 * Created by pengxiaojing on 2017/3/6.
 */
import {deepAssign} from '../../../toolFunction';

const init = (state, {tabKey, orderInfo}) => {
  if (orderInfo) {
    let newState = Object.assign({}, state);
    newState[tabKey] = {
      isShow: false,
      orderInfo: orderInfo,
      radio1: true,
      radio2: false,
      table1: null,
      table2: null,
      resultList: []
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
const initModalData = (state, {orderInfo}) => {
  if (orderInfo) {
    return Object.assign({}, state, {isShow: true});
  }
  return state;
};
const getTable1Data = (state, {table1, status}) => {
  if (table1) {
    return Object.assign({}, state, {table1: table1});
  }else if (status) {
    console.log('get jobUnitList', status);
    return state;
  }
  return state;
};
const getTable2Data = (state, {table2, status}) => {
  if (table2) {
    return Object.assign({}, state, {table2: table2});
  }else if (status) {
    console.log('get jobCodeList', status);
    return state;
  }
  return state;
};

const modalChange = (state, {isShow}) => {
  return Object.assign({}, state, {isShow: isShow});
};

const radioChange = (state, {radioName}) => {
  let newState = Object.assign({}, state);
  if (radioName == 'radio1' && !state.radio1){
    newState.radio1 = true;
    newState.radio2 = false;
    newState.resultList = [];
  }else if (radioName == 'radio2' && !state.radio2) {
    newState.radio1 = false;
    newState.radio2 = true;
    newState.resultList = [];
  }
  return newState;
};
const addJob = (state, {tableName, rowIndex}) => {
  let [...newResultList] = state.resultList;
  if (tableName == 'table1'){
    newResultList.push(state[tableName][rowIndex].jobUnit);
  }else {
    newResultList.push(state[tableName][rowIndex].codeName);
  }
  return Object.assign({}, state, {resultList: newResultList});
};

const deleteJob = (state, {tableName, rowIndex}) => {
  let newResultList = [];
  if (tableName == 'table1'){
    newResultList = state.resultList.filter((item) => item !== state[tableName][rowIndex].jobUnit);
  }else {
    newResultList = state.resultList.filter((item) => item !== state[tableName][rowIndex].codeName);
  }
  return Object.assign({}, state, {resultList: newResultList});
};

const reducers = {
  splitInitJobSplitModalData: initModalData,
  splitJobSplitTable1Data: getTable1Data,
  splitJobSplitTable2Data: getTable2Data,
  splitJobSplitModalChange: modalChange,
  splitJobSplitRadioChange: radioChange,
  splitJobSplitAddJob: addJob,
  splitJobSplitDeleteJob: deleteJob
};

const mainReducer = (state, action) => {
  const {tabKey} = action;
  const newState = reducers[action.type](state[tabKey], action);
  return deepAssign(state, newState, tabKey);
};

const jobSplitModalReducer = (state = {}, action) => {
  if (action.type === 'splitAddTab') {
    return init(state, action);
  }else if (action.type === 'splitCancelTab'){
    return unInit(state, action);
  }
  const exist = Object.keys(reducers).some(type => action.type === type);
  return exist ? mainReducer(state, action) : state;
};

export default jobSplitModalReducer;
