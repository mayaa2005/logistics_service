import {deepAssign, composeReducers, mapReducer} from '../../toolFunction';
import listPageReducer from './listPage';
import orderInfoReducer from './orderInfo';

const INDEX_INIT_ACTION = 'orderInputIndexInit';
const ORDER_INFO_INIT_ACTION = 'orderInputOrderInfoInit';

const indexInit = (label) => {
  return {type: INDEX_INIT_ACTION, label};
};

const orderInfoInit = (label, orderStatus, data) => {
  return {type: ORDER_INFO_INIT_ACTION, label, orderStatus, data};
};

const initReducer = (state, {label}) => {
  const init = false;
  const activeKey = 'index';
  const tabs = [{key: 'index', title: label.index.title}];
  const index = listPageReducer(undefined, indexInit(label.index));
  return {label, init, activeKey, tabs, index};
};

const changeReducer = (state, {key}) => {
  return deepAssign(state, {activeKey: key});
};

const addReducer = (state, {orderStatus, data}) => {
  const activeKey = `add_${state.tabs.length}`;
  const label = state.label.orderInfo;
  let [...tabs] = state.tabs;
  let newState = {tabs, activeKey};
  let title = orderStatus === 'edit' ?  data.orderBaseInfo.logisticsOrderNumber : label.title;
  tabs.push({title: title, key: activeKey});
  newState[activeKey] = orderInfoReducer(undefined, orderInfoInit(label, orderStatus, data));
  return deepAssign(state, newState);
};

const cancelReducer = (state) => {
  let newTabs = state.tabs.filter((tab) => tab.key !== state.activeKey);
  return Object.assign({}, state, {tabs: newTabs}, {activeKey: 'index'});
};

const reducers = {
  orderInputInit: initReducer,
  orderInputTabAdd: addReducer,
  orderInputTabChange: changeReducer,
  orderInputTabCancel: cancelReducer
};

const keyReducer = ({activeKey}) => {
  const reducer = activeKey === 'index' ? listPageReducer : orderInfoReducer;
  return {keys: [activeKey], reducer};
};

const inputReducer = composeReducers(reducers, mapReducer(keyReducer), {init: true});

export default inputReducer;
