/**
 * Created by pengxiaojing on 2017/2/14.
 */

const initTab = (state, {tabTitle}) =>{
  let [...newTabs] = state.tabs;
  newTabs[0] = { title: tabTitle, key:'index'};
  return Object.assign({}, state, {tabs: newTabs});
};

const tabSelect = (state, {tabKey}) => {
  return Object.assign({}, state, {selectKey: tabKey});
};

const addTab = (state, {tabKey, orderInfo, status}) => {
  if (orderInfo) {
    let tabTitle = orderInfo.orderID;
    let [...newTabs] = state.tabs;
    newTabs.push( { title: tabTitle, key:tabKey });
    return Object.assign({}, state, {tabs:newTabs}, {selectKey:tabKey});
  }else if (status) {
    console.log('get splitOrder:', status);
    return state;
  }
  return state;
};

const cancelTab = (state, {tabKey}) => {
  let newTabs = state.tabs.filter((tab) => tab.key !== tabKey);
  return Object.assign({}, state, {tabs: newTabs}, {selectKey: 'index'});
};

const reducers = {
  splitInitTab: initTab,
  splitAddTab: addTab,
  splitCancelTab: cancelTab,
  splitTabSelect: tabSelect
};

const initState = {
  tabs: [
    { title: '', key:'index'}
  ],
  selectKey:'index'
};

const orderSplitReducer = (state = initState, action) => {
  const exist = Object.keys(reducers).some(type => action.type === type);
  if (!exist) return state;
  return reducers[action.type](state, action);
};

export default orderSplitReducer;
