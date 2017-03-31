/**
 * Created by xiaojing on 17/2/26.
 */
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderInfo from './OrderInfo';
import fetch from '../../core/fetch';

const ActionType = {
  onGetUIInfo: 'orderInfoUIInfo',
  onGetOptions: 'orderInfoOptions',
  onInputChange: 'InputChange',
  onCancelTab: 'CancelTab',
  onServiceCheck: 'ServiceTypeCheck',
  onAddRow: 'Table2AddRow',
  onContentChange: 'Table2ContentChange',
  onDelete: 'Table2Delete',
  onModalChange: 'GoodsSplitModalChange',
  onInitGoodsModal: 'InitGoodsSplitModalData',
  onInitJobModal: 'InitJobSplitModalData'
};

const onGetUIInfo = () => async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.orderInfoUIInfo){
    // console.log('订单详细界面已加载');
    return;
  }
  dispatch({ type: ActionType.onGetUIInfo});
  const response = await fetch('/api/order_info_ui');
  if (response.status == 404) {
    dispatch({ type: ActionType.onGetUIInfo, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.onGetUIInfo, ui: json });
};

const onGetOptions = ({rootType, tabKey}) => async (dispatch) => {
  //let res = await fetch('/api/order_info_options');
  //if (!res.ok) {
  //  return;
  //}
  //let data = await res.json();
  //dispatch({ type: ActionType.onGetOptions, options: data, tabKey });
};

const onSuperChange = ({rootType, tabKey},infoType, key, id, value) => async (dispatch) =>  {
  dispatch( {
    type: `${rootType}${ActionType.onInputChange}`,
    tabKey,
    infoType,
    key,
    value
  });
  //let res = await fetch('/api/order_info_options');
  //if (!res.ok) {
  //  return;
  //}
  //let data = await res.json();
  //dispatch({ type: ActionType.onGetOptions, options: data, tabKey });

};

const onInputChange = ({rootType, tabKey}, infoType, key, value) => {
  return {
    type: `${rootType}${ActionType.onInputChange}`,
    tabKey,
    infoType,
    key,
    value
  }
};
const onCancelTab = ({rootType, tabKey}) => {
  return {
    type: `${rootType}${ActionType.onCancelTab}`,
    tabKey
  }
};
const onSave = ({rootType, tabKey}, orderInfo) => {
  return{
    type: `${rootType}${ActionType.onCancelTab}`,
    tabKey
  };
};
const onSubmit = ({rootType, tabKey}, orderInfo) => {
  return {
    type: `${rootType}${ActionType.cancelTab}`,
    tabKey
  }
};
const onServiceCheck = ({rootType, tabKey}, serviceType) => {
  return {
    type: `${rootType}${ActionType.onServiceCheck}`,
    tabKey,
    serviceType
  }
};
const onAddRow = ({rootType, tabKey}, tableName, serviceType) => {
  return {
    type: `${rootType}${ActionType.onAddRow}`,
    tabKey,
    tableName,
    serviceType
  }
};
const onContentChange = ({rootType, tabKey}, tableName, serviceType, rowIndex, keyName, value) => {
  return {
    type: `${rootType}${ActionType.onContentChange}`,
    tabKey,
    tableName,
    serviceType,
    rowIndex,
    keyName,
    value
  }
};
const onDelete = ({rootType, tabKey}, tableName, serviceType, rowIndex, keyName) => {
  return {
    type: `${rootType}${ActionType.onDelete}`,
    tabKey,
    tableName,
    serviceType,
    rowIndex,
    keyName
  }
};
const onModalChange = ({rootType, tabKey}, isShow) => {
  return {
    type: `${rootType}${ActionType.onModalChange}`,
    tabKey,
    isShow
  }
};
const onInitGoodsModal = ({rootType, tabKey}, orderInfo) => {
  return {
    type: `${rootType}${ActionType.onInitGoodsModal}`,
    tabKey,
    orderInfo
  }
};
const onInitJobModal = ({rootType, tabKey}, orderInfo) => {
  return {
    type: `${rootType}${ActionType.onInitJobModal}`,
    tabKey,
    orderInfo
  }
};


const mapStateToProps = (state, props) => {
  return Object.assign({}, props, {orderInfoUIInfo: state.others.globalSource.orderInfoUIInfo});
};

const actionCreators = {
  onGetUIInfo: onGetUIInfo,
  onGetOptions: onGetOptions,
  onInputChange: onInputChange,
  onSuperChange: onSuperChange,
  onCancelTab: onCancelTab,
  onSave: onSave,
  onSubmit: onSubmit,
  onServiceCheck: onServiceCheck,
  onAddRow: onAddRow,
  onContentChange: onContentChange,
  onDelete: onDelete,
  onModalChange: onModalChange,
  onInitGoodsModal: onInitGoodsModal,
  onInitJobModal: onInitJobModal
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

const OrderInfoContainer = connect(mapStateToProps, mapDispatchToProps)(OrderInfo);

export default OrderInfoContainer;
