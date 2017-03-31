import {connect} from 'react-redux';
import ChangeReceiveEdit from './ChangeReceiveEdit';
import fetch from '../../../core/fetch';

const ActionType = {
  tableCheck: 'receiveTableCheck',
  cancelTab: 'CancelTab',
  newDetail: 'NewDetail',
  copyNewDetail: 'CopyNewDetail',
  table2AddRow: 'receiveTable2AddRow',
  table2Delete: 'receiveTable2Delete',
  table2ContentChange: 'receiveTable2ContentChange',
  onInputChange: 'InputChange'
};

const onTableCheck = (tabKey, rowIndex, keyName, checked) => {
  return {
    type: ActionType.tableCheck,
    tabKey,
    rowIndex,
    keyName,
    checked
  };
};

const onCancelTab = ( tabKey) => {
  return {
    type: ActionType.onCancelTab,
    tabKey
  }
};
const onSave = ( tabKey, changeReceiveInfo) => {
  return{
    type:ActionType.onCancelTab,
    tabKey
  };
};

const onSubmit = ( tabKey, changeReceiveInfo) => {
  return {
    type: ActionType.cancelTab,
    tabKey
  }
};

const onModalChange = ( tabKey, isShow) => {
  return {
    type: ActionType.onModalChange,
    tabKey,
    isShow
  }
};

const onTable2ContentChange = (tabKey, rowIndex, keyName, value) => {
  //console.log(rowIndex, keyName,value);
  return {
    type: ActionType.table2ContentChange,
    tabKey,
    rowIndex,
    keyName,
    value
  }
};

const onTable2AddRow = ( tabKey) => {
  return {
    type: ActionType.table2AddRow,
    tabKey
  }
};

const onCopyNewDetail = ( tabKey,rowIndex,keyName, value) => {
  return {
    type: ActionType.copyNewDetail,
    tabKey,
    rowIndex,
    keyName,
    value
  }
};

const onTable2Delete = ( tabKey) => {
  return {
    type: ActionType.table2Delete,
    tabKey
  }
};

const mapStateToProps = (state, props) => {
  return ({
    //let settleInfo={};
    tabKey: props.tabKey,
    changeReceiveInfo:  state.bill.changeReceiveRoot.changeReceiveEdit[props.tabKey],
    changeReceiveEditUIInfo: state.others.globalSource.changeReceiveEditUIInfo
  });
};

const mapDispatchToProps = {
  onTableCheck:(tabKey,  rowIndex, keyName, checked) => onTableCheck(tabKey,rowIndex, keyName, checked),
  onCancelTab: ( tabKey) => onCancelTab( tabKey),
  onSave: (tabKey, changeReceiveInfo) => onSave( tabKey, changeReceiveInfo),
  onSubmit: ( tabKey, changeReceiveInfo) => onSubmit( tabKey, changeReceiveInfo),
  onTable2AddRow: ( tabKey) => onTable2AddRow( tabKey),
  onCopyNewDetail: ( tabKey,rowIndex, keyName, value) => onCopyNewDetail( tabKey,rowIndex, keyName, value),
  onTable2ContentChange: ( tabKey,rowIndex, keyName, value) => onTable2ContentChange(tabKey,  rowIndex, keyName, value),
  onTable2Delete: ( tabKey) => onTable2Delete( tabKey)
};

const ChangeReceiveEditContainer = connect(mapStateToProps, mapDispatchToProps)(ChangeReceiveEdit);

export default ChangeReceiveEditContainer;
