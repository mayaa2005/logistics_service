import { connect } from 'react-redux';
import OrderSettleList from './OrderSettleList';

const ActionType = {
  cols: 'settleListCols',
  settleList: "settleList",
  check: "settleCheckList",
  swap: "settleSwapCol",
  sort: "settleSortCol",
  modal: "settleModal",
  checkChange: "settleModalCheckChange",
  editOrder: 'settleEditOrder'
};

const getSettleListCols = async (dispatch) => {
  dispatch({ type: ActionType.cols });
  const response = await fetch('/api/settle_list_cols');
  if (response.status == 404) {
    dispatch({ type: ActionType.cols, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('面',json);
  dispatch({ type: ActionType.cols, items: json });
};

const getSettleList = async (dispatch) => {
  dispatch({ type: ActionType.settleList });
  const response = await fetch('/api/settle_list');
  if (response.status == 404) {
    dispatch({ type: ActionType.settleList, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('界面',json);
  dispatch({ type: ActionType.settleList, items: json });
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

const getModifyOrder = async (dispatch) => {
  dispatch({ type: ActionType.editOrder });
  const response = await fetch('/api/settle_info');
  if (response.status == 404) {
    dispatch({ type: ActionType.editOrder, status: 'fail' });
    return;
  }
  const key = makeUUID();
  const json = await response.json();
  dispatch({ type: ActionType.editOrder, settleInfo: json, tabKey: `EditOrder-${key}` });
};

const onCheck = (isCheckAll, checked, index) => {
  return {
    type: ActionType.check,
    isCheckAll,
    checked,
    index
  }
};

const onSwapCol = (key1, key2) => {
  return {
    type: ActionType.swap,
    key1,
    key2
  }
};

const onSort = (key) => {
  return {
    type: ActionType.sort,
    key
  }
};
const onChangeModalShow = (isShow) => {
  return {
    type: ActionType.modal,
    isShow
  }
};
const onCheckChange = (name) => {
  return {
    type: ActionType.checkChange,
    name
  }
};

const mapStateToProps = (state, props) => {
  return state.order.settleRoot.settleList;
};

const mapDispatchToProps = {
  onSettleListCols: () => getSettleListCols,
  onSettleList: () => getSettleList,
  onModifyOrder: () => getModifyOrder,
  onCheck: (isCheckAll, checked, index) => onCheck(isCheckAll, checked, index),
  onSwapCol: (key1, key2) => onSwapCol(key1, key2),
  onSort: (key) => onSort(key),
  onChangeModalShow: (isShow) => onChangeModalShow(isShow),
  onCheckChange: (name) => onCheckChange(name)
};

const OrderSettleListContainer = connect(mapStateToProps, mapDispatchToProps)(OrderSettleList);

export default OrderSettleListContainer;
