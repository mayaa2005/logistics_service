/**
 * Created by pengxiaojing on 2017/2/27.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SplitCountModal from './SplitCountModal';

const ActionType = {
  onCancelModal: 'splitCountModalCancel',
  onCountClick: 'splitCountModalCountClick',
  onTableDelete: 'splitCountModalTableDelete',
  onContentChange: 'splitCountModalContentChange',
  onMakeSure: 'splitCountModalMakeSure'
};

const onCancelModal = ({tabKey}, isShow) => {
  return {
    type: ActionType.onCancelModal,
    tabKey,
    isShow
  };
};
const onCountClick = ({tabKey}, rowIndex) => {
  return {
    type: ActionType.onCountClick,
    tabKey,
    rowIndex
  };
};
const onTableDelete = ({tabKey}, rowIndex) => {
  return {
    type: ActionType.onTableDelete,
    tabKey,
    rowIndex
  };
};
const onContentChange = ({tabKey}, rowIndex, keyName, value) => {
  return {
    type: ActionType.onContentChange,
    tabKey,
    rowIndex,
    keyName,
    value
  };
};
const onMakeSure = ({tabKey}, tableName, rowIndex, tableData) => {
  return {
    type: ActionType.onMakeSure,
    tabKey,
    tableName,
    rowIndex,
    tableData
  };
};

const mapStateToProps = (state, props) => {
  return Object.assign({}, props,
    {splitUIInfo: state.others.globalSource.goodsWeightSplitUIInfo})
};

const actionCreators = {
  onCancelModal: onCancelModal,
  onCountClick: onCountClick,
  onTableDelete: onTableDelete,
  onContentChange: onContentChange,
  onMakeSure: onMakeSure
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

const SplitCountModalContainer = connect(mapStateToProps, mapDispatchToProps)(SplitCountModal);

export default SplitCountModalContainer;
