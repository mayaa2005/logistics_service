import { connect } from 'react-redux';
import ChangePayList from './ChangePayList';

const ActionType = {
  cols: 'payChangePayListCols',
  changePayList: "payChangePayList",
  check: "payChangePayCheckList",
  swap: "payChangePaySwapCol",
  sort: "payChangePaySortCol",
  modal: "payChangePayModal",
  checkChange: "payChangePayModalCheckChange",
  editChangePay:"payEditChangePay",
  newChangePay:"payNewChangePay"
};

const getChangePayListCols = async (dispatch) => {
  dispatch({ type: ActionType.cols });
  const response = await fetch('/api/changePay_list_cols');
  if (response.status == 404) {
    dispatch({ type: ActionType.cols, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.cols, items: json });
};

const getChangePayList = async (dispatch) => {
  dispatch({ type: ActionType.changePayList });
  const response = await fetch('/api/changePay_list');
  if (response.status == 404) {
    dispatch({ type: ActionType.changePayList, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.changePayList, items: json });
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

const getModifyChangePay = async (dispatch) => {
  dispatch({ type: ActionType.editChangePay });
  const response = await fetch('/api/changePay_info');
  if (response.status == 404) {
    dispatch({ type: ActionType.editChangePay, status: 'fail' });
    return;
  }
  const key = makeUUID();
  const json = await response.json();
  dispatch({ type: ActionType.editChangePay, changePayInfo: json, tabKey: `editChangePay-${key}` });
};

const onNewChangePay =  ( tabTitle) => {
  let key = makeUUID();
  return{
    type: ActionType.editChangePay,
    tabKey:`NewChangePay-${key}`,
    changePayInfo: {},
    tabTitle
  };
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
  return state.bill.changePayRoot.changePayList;
};

const mapDispatchToProps = {
  onChangePayListCols: () => getChangePayListCols,
  onChangePayList: () => getChangePayList,
  onCheck: (isCheckAll, checked, index) => onCheck(isCheckAll, checked, index),
  onSwapCol: (key1, key2) => onSwapCol(key1, key2),
  onSort: (key) => onSort(key),
  onChangeModalShow: (isShow) => onChangeModalShow(isShow),
  onCheckChange: (name) => onCheckChange(name),
  onModifyChangePay: () => getModifyChangePay,
  onNewChangePay: (tabTitle) => onNewChangePay(tabTitle)
};

const ChangePayListContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePayList);

export default ChangePayListContainer;
