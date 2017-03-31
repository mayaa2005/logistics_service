const editChangePay = (state, action) => {
  let {tabKey, changePayInfo, status,tabTitle} = action;
  if (changePayInfo) {
    tabTitle = tabTitle ? tabTitle : changePayInfo.edit;
    let [...newTabs] = state.tabs;
    newTabs.push( { title: tabTitle, key:tabKey });
    let newState = Object.assign({}, state, {tabs:newTabs}, {selectKey:tabKey});
    return newState;
  }else if (status) {
    console.log('get changePayInfo', status);
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
    {  key:'index', title: '应付改单列表'}
  ],
  selectKey:'index'
};

const payChangePayReducer = (state = initState, action) => {
  switch (action.type) {
    case 'payTabSelect':
      return Object.assign({}, state, {selectKey: action.tabKey});
    case 'payEditChangePay':
      return editChangePay(state, action);
    case 'payCancelTab':
      return cancelTab(state, action);
    default:
      return state;
  }
};

export default payChangePayReducer;
