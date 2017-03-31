/**
 * Created by pengxiaojing on 2017/2/14.
 */
import {deepAssign} from '../../../toolFunction';

const init = (state, {orderInfo, tabKey}) => {
  if (orderInfo) {
    let newState = Object.assign({}, state);
    //根据orderInfo.JobUnits解析出需要的二级tab数组
    let secondTabs = (orderInfo.JobUnits || []).map( jobUnit => {
      return {
        key: jobUnit.key,
        title: jobUnit.name
      };
    });
    secondTabs.unshift({
      key: 'index',
      title: '订单信息'
    });
    newState[tabKey] = {
      secondTabs: secondTabs,
      secondTabSelectKey: 'index',
      orderData: orderInfo
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

const tabSelect = (state, {tabKey, secondTabSelectKey }) => {
  return deepAssign(state, {secondTabSelectKey: secondTabSelectKey}, tabKey);
};

const reducers = {
  jobAddTab: init,
  jobCancelTab: unInit,
  jobInfoTabSelect: tabSelect
};

const jobInfoReducer = (state = {}, action) => {
  const exist = Object.keys(reducers).some(type => action.type === type);
  if (!exist) return state;
  return reducers[action.type](state, action);
};

export default jobInfoReducer;
