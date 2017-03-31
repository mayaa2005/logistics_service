const editOrder = (state, action) => {
  let {tabKey, settleInfo, status} = action;
  if (settleInfo) {
    let [...newTabs] = state.tabs;
    newTabs.push( { title: '编辑', key:tabKey });
    let newState = Object.assign({}, state, {tabs:newTabs}, {selectKey:tabKey});
    return newState;
  }else if (status) {
    console.log('get settleEditInfo:', status);
    return state;
  }
  return state;
};

const cancelTab = (state, action) => {
  let {tabKey} = action;
  let newTabs = state.tabs.filter((tab) => tab.key !== tabKey);
  return Object.assign({}, state, {tabs: newTabs}, {selectKey: 'index'});
};

const initState = {
  tabs: [
    {  key:'index', title: '应收预结算列表'}
  ],
  selectKey:'index'
};

const orderSettleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'settleTabSelect':
      return Object.assign({}, state, {selectKey: action.tabKey});
    case 'settleEditOrder':
      return editOrder(state, action);
    case 'settleCancelTab':
      return cancelTab(state, action);
    default:
      return state;
  }
};

export default orderSettleReducer;
