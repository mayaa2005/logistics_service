import {connect} from 'react-redux';
import SettleEdit from './SettleEdit';
import fetch from '../../../core/fetch';

const ActionType = {
  cancelTab: 'CancelTab',
  table2ContentChange: 'settleTable2ContentChange',
  table2Delete: 'Table2Delete',
  newDetail: 'NewDetail',
  copyNewDetail: 'CopyNewDetail'
};

const onCancelTab = ( tabKey) => {
  return {
    type: ActionType.cancelTab,
    tabKey
  }
};
const onSave = ( tabKey, settleInfo) => {
  return{
    type:ActionType.cancelTab,
    tabKey
  };
};
const onSubmit = ( tabKey, settleInfo) => {
  return {
    type: ActionType.cancelTab,
    tabKey
  }
};

const onNewDetail = ( tabKey) => {
  return {
    type: ActionType.newDetail,
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

const onTable2ContentChange = (tabKey, rowIndex, keyName, value) => {
  console.log(rowIndex, keyName,value);
  return {
    type: ActionType.table2ContentChange,
    tabKey,
    rowIndex,
    keyName,
    value
  }
};
const onTable2Delete = ( tabKey, rowIndex, keyName) => {
  return {
    type: ActionType.table2Delete,
    tabKey,
    rowIndex,
    keyName
  }
};

const mapStateToProps = (state, props) => {
  return ({
    //let settleInfo={};
    tabKey: props.tabKey,
    settleInfo:  state.order.settleRoot.editInfo[props.tabKey],
    settleEditUIInfo: state.others.globalSource.settleEditUIInfo
  });
};


//const settleMountAction={type:'settleMount'};
const mapDispatchToProps = {
  onCancelTab: ( tabKey) => onCancelTab( tabKey),
  onSave: (tabKey, settleInfo) => onSave( tabKey, settleInfo),
  onSubmit: ( tabKey, settleInfo) => onSubmit( tabKey, settleInfo),
  onNewDetail: ( tabKey) => onNewDetail( tabKey),
  onCopyNewDetail: ( tabKey,rowIndex, keyName, value) => onCopyNewDetail( tabKey,rowIndex, keyName, value),
  onTable2ContentChange: ( tabKey,rowIndex, keyName, value) => onTable2ContentChange(tabKey,  rowIndex, keyName, value),
  onTable2Delete: ( tabKey,rowIndex, keyName) => onTable2Delete( tabKey, rowIndex, keyName),
};

const SettleEditContainer = connect(mapStateToProps, mapDispatchToProps)(SettleEdit);

export default SettleEditContainer;
