/**
 * Created by pengxiaojing on 2017/2/8.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from '../../core/fetch';
import OrderList from './orderList';

const ActionType = {
  onGetUIInfo: 'orderListUIInfo',
  initTab: 'InitTab',
  addTab: 'AddTab',
  cols: 'orderListCols',
  items: "orderListItems",
  check: "orderListCheck",
  swap: "orderListSwapCol",
  sort: "orderListSortCol",
  modalShow: "orderListModal",
  modalCheck: "orderListModalCheck"
};

const onGetUIInfo = ({rootType}) => async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.orderListUIInfo){
    // console.log('订单列表界面已加载');
    return;
  }
  dispatch({ type: ActionType.onGetUIInfo});
  const response = await fetch('/api/order_list_ui');
  if (response.status == 404) {
    dispatch({ type: ActionType.onGetUIInfo, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.onGetUIInfo, ui: json });
  dispatch({ type: `input${ActionType.initTab}`, tabTitle:json.inputList});
  dispatch({ type: `split${ActionType.initTab}`, tabTitle:json.splitList});
  dispatch({ type: `job${ActionType.initTab}`, tabTitle:json.jobList});
  dispatch({ type: `settle${ActionType.initTab}`, tabTitle:json.settleList});
};

const makeUUID = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid;
};

const onNewOrder =  ({rootType}, tabTitle) => {
  let key = makeUUID();
  return{
    type: `${rootType}${ActionType.addTab}`,
    tabKey:`newOrder-${key}`,
    orderInfo: {},
    tabTitle
  };
};
const onCopyNewOrder = ({rootType}, tabTitle) => async (dispatch) => {
  dispatch({ type: `${rootType}${ActionType.addTab}` });
  const response = await fetch('/api/order_info');
  if (response.status == 404) {
    dispatch({ type: `${rootType}${ActionType.addTab}`, status: 'fail' });
    return;
  }
  let key = makeUUID();
  const json = await response.json();
  dispatch({ type: `${rootType}${ActionType.addTab}`, tabKey:`copyNewOrder-${key}`, orderInfo: json, tabTitle  });
};

const onEditOrder = ({rootType}) => async (dispatch) => {
  dispatch({ type: `${rootType}${ActionType.addTab}` });
  const response = await fetch('/api/order_info');
  if (response.status == 404) {
    dispatch({ type: `${rootType}${ActionType.addTab}`, status: 'fail' });
    return;
  }
  let key = makeUUID();
  const json = await response.json();
  dispatch({ type: `${rootType}${ActionType.addTab}`, tabKey:`${rootType}EditOrder-${key}`, orderInfo:json} );
};

const getOrderListCols = ({rootType}) => async (dispatch) => {
  dispatch({ type: ActionType.cols, rootType });
  const response = await fetch('/api/order_list_cols');
  if (response.status == 404) {
    dispatch({ type: ActionType.cols, status: 'fail', rootType });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.cols, items: json, rootType });
};

const getOrderList = ({rootType}) => async (dispatch) => {
  dispatch({ type: ActionType.items, rootType });
  const response = await fetch('/api/order_list');
  if (response.status == 404) {
    dispatch({ type: ActionType.items, status: 'fail', rootType });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.items, items: json, rootType });
};

const onCheck = ({rootType}, isCheckAll, checked, index) => {
  return {
    type: ActionType.check,
    isCheckAll,
    checked,
    index,
    rootType
  }
};

const onSwapCol = ({rootType}, key1, key2) => {
  return {
    type: ActionType.swap,
    key1,
    key2,
    rootType
  }
};

const onSort = ({rootType}, key) => {
  return {
    type: ActionType.sort,
    key,
    rootType
  }
};
const onChangeModalShow = ({rootType}, isShow) => {
  return {
    type: ActionType.modalShow,
    isShow,
    rootType
  }
};
const onCheckChange = ({rootType}, name) => {
  return {
    type: ActionType.modalCheck,
    name,
    rootType
  }
};

const mapStateToProps = (state, props) => {
  return Object.assign({}, props, {uiInfo: state.others.globalSource.orderListUIInfo});
};

const actionCreators = {
  onGetUIInfo: onGetUIInfo,
  onOrderListCols: getOrderListCols,
  onOrderList: getOrderList,
  onNewOrder: onNewOrder,
  onCopyNewOrder: onCopyNewOrder,
  onEditOrder: onEditOrder,
  onCheck: onCheck,
  onSwapCol: onSwapCol,
  onSort: onSort,
  onChangeModalShow: onChangeModalShow,
  onCheckChange: onCheckChange
};

const insertArgs = (obj, ...args) => {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = obj[key].bind(null, ...args);
    return newObj;
  }, {});
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(insertArgs(actionCreators, props), dispatch);
};

const OrderListContainer = connect(mapStateToProps, mapDispatchToProps)(OrderList);

export default OrderListContainer;
