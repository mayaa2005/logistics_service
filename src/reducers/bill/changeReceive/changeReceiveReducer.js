const editChangeReceive = (state, action) => {
  let {tabKey, changeReceiveInfo, status,tabTitle} = action;
  if (changeReceiveInfo) {
    tabTitle = tabTitle ? tabTitle : changeReceiveInfo.edit;
    let [...newTabs] = state.tabs;
    newTabs.push( { title: tabTitle, key:tabKey });
    let newState = Object.assign({}, state, {tabs:newTabs}, {selectKey:tabKey});
    return newState;
  }else if (status) {
    console.log('get changeReceiveInfo', status);
    return state;
  }
  return state;
};

const tabSelect = (state, {tabKey}) => {
  return Object.assign({}, state, {selectKey: tabKey});
};

const cancelTab = (state, action) => {
  let {tabKey} = action;
  let newTabs = state.tabs.filter((tab) => tab.key !== tabKey);
  return Object.assign({}, state, {tabs: newTabs}, {selectKey: 'index'});
};

const initState = {
  tabs: [
    {  key:'index', title: '应收改单列表'}
  ],
  selectKey:'index'
};

const receiveChangeReceiveReducer = (state = initState, action) => {
  switch (action.type) {
    case 'receiveTabSelect':
      return Object.assign({}, state, {selectKey: action.tabKey});
    case 'receiveEditChangeReceive':
      return editChangeReceive(state, action);
    case 'receiveCancelTab':
      return cancelTab(state, action);
    default:
      return state;
  }
};

export default receiveChangeReceiveReducer;
