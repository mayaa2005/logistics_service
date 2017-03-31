import {deepAssign, composeReducers, mapReducer} from '../../toolFunction';
import orderReducer from './order';
import editReducer from './edit';

const INDEX_INIT_ACTION = 'billExtraIndexInit';
const EDIT_INIT_ACTION = 'billExtraEditInit';

const initIndex = (data, label, pageSize, pageSizeType) => {
  return {type: INDEX_INIT_ACTION, data, label, pageSize, pageSizeType};
};

const initEdit = (data, label) => {
  return {type: EDIT_INIT_ACTION, data, label};
};

const initReducer = (state, {data, label}) => {
  const init = false;
  const activeKey = 'index';
  const tabs = [{key: 'index', title: label.index.title}];
  const index = orderReducer(undefined, initIndex(data, label.index, label.pageSize, label.pageSizeType));
  return deepAssign(state, {label, init, activeKey, tabs, index});
};

const changeTabReducer = (state, {key}) => {
  return deepAssign(state, {activeKey: key});
};

const addTab = (tabs, key, title, label, data) => {
  const newTabs = tabs.concat({key, title});
  const edit = editReducer(undefined, initEdit(data, label));
  return {activeKey: key, tabs: newTabs, [key]: edit};
};

const hasTab = (tabs, key) => {
  return tabs.some(tab => tab.key === key);
};

const addTabReducer = (state, {data, edit}) => {
  const dataKey = 'extraChargeNumber';
  if (edit && hasTab(state.tabs, data[dataKey])) {
    return deepAssign(state, {activeKey: data[dataKey]});
  } else {
    const label = state.label.edit;
    const key = edit ? data[dataKey] : `edit_${state.tabs.length}`;
    const title = edit ? data[dataKey] : label.title;
    return deepAssign(state, addTab(state.tabs, key, title, label, data));
  }
};

const delTabReducer = (state) => {
  let index = state.tabs.findIndex(tab => tab.key === state.activeKey);
  const tabs = state.tabs.filter(tab => tab.key !== state.activeKey);
  if (index === tabs.length) {
    index--;
  }
  return deepAssign(state, {tabs, activeKey: tabs[index].key});
};

const reducers = {
  billExtraInit: initReducer,
  billExtraTabChange: changeTabReducer,
  billExtraTabAdd: addTabReducer,
  billExtraTabDel: delTabReducer
};

const keyReducer = ({activeKey}) => {
  const reducer = activeKey === 'index' ? orderReducer : editReducer;
  return {keys: [activeKey], reducer};
};

const extraReducer = composeReducers(reducers, mapReducer(keyReducer), {init: true});

export default extraReducer;
