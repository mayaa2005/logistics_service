import {deepAssign, composeReducers, mapReducer} from '../../toolFunction';
import orderReducer from './order';
import editReducer from './edit';

const INDEX_INIT_ACTION = 'basicSupplierIndexInit';
const EDIT_INIT_ACTION = 'basicSupplierEditInit';

const initIndex = (result, config, pageSize, pageSizeType) => {
  return {type: INDEX_INIT_ACTION, result, config, pageSize, pageSizeType};
};

const initEdit = (data, config) => {
  return {type: EDIT_INIT_ACTION, data, config};
};

const initReducer = (state, {result, config}) => {
  const init = false;
  const activeKey = 'index';
  const tabs = [{key: 'index', title: config.index.title}];
  const index = orderReducer(undefined, initIndex(result, config.index, config.pageSize, config.pageSizeType));
  return deepAssign(state, {config, init, activeKey, tabs, index});
};

const changeTabReducer = (state, {key}) => {
  return deepAssign(state, {activeKey: key});
};

const addTab = (tabs, key, title, config, data) => {
  const newTabs = tabs.concat({key, title});
  const edit = editReducer(undefined, initEdit(data, config));
  return {activeKey: key, tabs: newTabs, [key]: edit};
};

const hasTab = (tabs, key) => {
  return tabs.some(tab => tab.key === key);
};

const addTabReducer = (state, {data, edit, dataKey}) => {
  if (edit && hasTab(state.tabs, data[dataKey])) {
    return deepAssign(state, {activeKey: data[dataKey]});
  } else {
    const config = state.config.edit;
    const key = edit ? data[dataKey] : `edit_${state.tabs.length}`;
    const title = edit ? data[dataKey] : config.title;
    return deepAssign(state, addTab(state.tabs, key, title, config, data));
  }
};

const delTabReducer = (state) => {
  const activeKey = state.activeKey;
  let index = state.tabs.findIndex(tab => tab.key === activeKey);
  const tabs = state.tabs.filter(tab => tab.key !== activeKey);
  if (index === tabs.length) {
    index--;
  }
  return deepAssign(state, {tabs, activeKey: tabs[index].key, [activeKey]: null});
};

const reducers = {
  basicSupplierInit: initReducer,
  basicSupplierTabChange: changeTabReducer,
  basicSupplierTabAdd: addTabReducer,
  basicSupplierTabDel: delTabReducer
};

const keyReducer = ({activeKey}) => {
  const reducer = activeKey === 'index' ? orderReducer : editReducer;
  return {keys: [activeKey], reducer};
};

const extraReducer = composeReducers(reducers, mapReducer(keyReducer), {init: true});

export default extraReducer;
