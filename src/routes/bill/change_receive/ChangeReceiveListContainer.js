import { connect } from 'react-redux';
import ChangeReceiveList from './ChangeReceiveList';

const ActionType = {
  cols: 'receiveChangeReceiveListCols',
  changeReceiveList: "receiveChangeReceiveList",
  check: "receiveChangeReceiveCheckList",
  swap: "receiveChangeReceiveSwapCol",
  sort: "receiveChangeReceiveSortCol",
  modal: "receiveChangeReceiveModal",
  checkChange: "receiveChangeReceiveModalCheckChange",
  editChangeReceive: 'receiveEditChangeReceive',
  newChangeReceive: 'receiveNewChangeReceive'
};

const getChangeReceiveListCols = async (dispatch) => {
  dispatch({ type: ActionType.cols });
  const response = await fetch('/api/changeReceive_list_cols');
  if (response.status == 404) {
    dispatch({ type: ActionType.cols, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('面',json);
  dispatch({ type: ActionType.cols, items: json });
};

const getChangeReceiveList = async (dispatch) => {
  dispatch({ type: ActionType.changeReceiveList });
  const response = await fetch('/api/changeReceive_list');
  if (response.status == 404) {
    dispatch({ type: ActionType.changeReceiveList, status: 'fail' });
    return;
  }
  const json = await response.json();
  //  `console.log('界面',json);
  dispatch({ type: ActionType.changeReceiveList, items: json });
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

const getModifyChangeReceive = async (dispatch) => {
  dispatch({ type: ActionType.editChangeReceive });
  const response = await fetch('/api/changeReceive_info');
  if (response.status == 404) {
    dispatch({ type: ActionType.editChangeReceive, status: 'fail' });
    return;
  }
  const key = makeUUID();
  const json = await response.json();
  dispatch({ type: ActionType.editChangeReceive, changeReceiveInfo: json, tabKey: `EditChangeReceive-${key}` });
};

const onNewChangeReceive =  ( tabTitle) => {
  let key = makeUUID();
  return{
    type: ActionType.editChangeReceive,
    tabKey:`NewChangeReceiver-${key}`,
    changeReceiveInfo: {},
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
  return state.bill.changeReceiveRoot.changeReceiveList;
};

const mapDispatchToProps = {
  onChangeReceiveListCols: () => getChangeReceiveListCols,
  onChangeReceiveList: () => getChangeReceiveList,
  onModifyChangeReceive: () => getModifyChangeReceive,
  onNewChangeReceive:(tabTitle) => onNewChangeReceive(tabTitle),
  onCheck: (isCheckAll, checked, index) => onCheck(isCheckAll, checked, index),
  onSwapCol: (key1, key2) => onSwapCol(key1, key2),
  onSort: (key) => onSort(key),
  onChangeModalShow: (isShow) => onChangeModalShow(isShow),
  onCheckChange: (name) => onCheckChange(name)
};

const ChangeReceiveListContainer = connect(mapStateToProps, mapDispatchToProps)(ChangeReceiveList);

export default ChangeReceiveListContainer;
