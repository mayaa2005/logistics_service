/**
 * Created by pengxiaojing on 2017/2/27.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from '../../../../core/fetch';
import GoodsSplitModal from './GoodsSplitModal';


const ActionType = {
  onGetUIInfo: 'goodsWeightSplitUIInfo',
  onModalChange: 'splitGoodsSplitModalChange',
  onTableCheck: 'splitModalTableCheck',
  onTableSplit: 'splitModalTableSplit',
  onTableMerge: 'splitModalTableMerge',
  onTableRadio: 'splitModalTableRadio',
  onMakeRelation: 'splitModalMakeRelation',
  onDeleteRelation: 'splitModalDeleteRelation',
  onListSelect: 'splitModalListSelect'
};

const onGetUIInfo = () => async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.goodsWeightSplitUIInfo){
    //console.log('货量拆分界面字段名称已加载');
    return;
  }
  dispatch({ type: ActionType.onGetUIInfo});
  const response = await fetch('/api/goods_split_ui');
  if (response.status == 404) {
    dispatch({ type: ActionType.onGetUIInfo, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.onGetUIInfo, ui: json });
};

const onModalChange = ({tabKey}, isShow) => {
  return {
    type: ActionType.onModalChange,
    tabKey,
    isShow
  };
};
const onTableCheck = ({tabKey}, tableName, rowIndex, keyName, checked) => {
  return {
    type: ActionType.onTableCheck,
    tabKey,
    tableName,
    rowIndex,
    keyName,
    checked
  };
};
const onTableSplit = ({tabKey}, tableName, rowIndex, rowData) => {
  return {
    type: ActionType.onTableSplit,
    tabKey,
    tableName,
    rowIndex,
    rowData
  };
};
const onTableMerge = ({tabKey}, tableName, keyName) => {
  return {
    type: ActionType.onTableMerge,
    tabKey,
    tableName,
    keyName
  };
};
const onTableRadio = ({tabKey}, tableName, rowIndex, keyName) => {
  return {
    type: ActionType.onTableRadio,
    tabKey,
    tableName,
    rowIndex,
    keyName
  };
};
const onMakeRelation = ({tabKey}, cabinetKeyName, goodsKeyName) => {
  return {
    type: ActionType.onMakeRelation,
    tabKey,
    cabinetKeyName,
    goodsKeyName
  };
};
const onDeleteRelation = ({tabKey}) => {
  return {
    type: ActionType.onDeleteRelation,
    tabKey
  };
};
const onListSelect = ({tabKey}, index, childIndex) => {
  return {
    type: ActionType.onListSelect,
    tabKey,
    index,
    childIndex
  };
};

const mapStateToProps = (state, props) => {
  return Object.assign({}, props,
    {splitUIInfo: state.others.globalSource.goodsWeightSplitUIInfo});
};

const actionCreators = {
  onGetUIInfo: onGetUIInfo,
  onModalChange: onModalChange,
  onTableCheck: onTableCheck,
  onTableSplit: onTableSplit,
  onTableMerge: onTableMerge,
  onTableRadio: onTableRadio,
  onMakeRelation: onMakeRelation,
  onDeleteRelation: onDeleteRelation,
  onListSelect: onListSelect
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

const GoodsSplitModalContainer = connect(mapStateToProps, mapDispatchToProps)(GoodsSplitModal);

export default GoodsSplitModalContainer;
