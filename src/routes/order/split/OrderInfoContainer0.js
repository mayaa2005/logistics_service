import {connect} from 'react-redux';
import OrderInfo from './OrderInfo';
import fetch from '../../../core/fetch';

const URL_DATA = '/api/order_split_order_info_data';

const ActionType = {
  init: 'orderSplitOrderInfoDataInit',
  tabCancel: 'orderSplitTabCancel',
  options: 'splitOrderInfoOptions',
  inputChange: 'splitOrderInfoInputChange',
  serviceCheck: 'splitOrderInfoServiceCheck',
  addRow: 'splitOrderInfoAddRow',
  contentChange: 'splitOrderInfoContentChange',
  delete: 'splitOrderInfoDelete'
};

const initActionCreator = () => async (dispatch, getState) => {
  let res, data;
  let state = getState();
  let {activeKey} = state.order.input;
  let {orderStatus, logisticsOrderNumber} = state.order.input[activeKey];
  res = await fetch(URL_DATA);
  if (!res.ok) {
    console.log('get order_split_order_info_data failed!!!');
    return;
  }
  data = await res.json();
  dispatch({type: ActionType.init, data});
};

const superChangeActionCreator = (serviceKey, key, value) => async (dispatch) =>  {
  let res = await fetch('/api/order_info_options');
  if (!res.ok) {
   return;
  }
  let options = await res.json();
  dispatch({ type: ActionType.options, options });

};

const inputChangeActionCreator = (serviceKey, key, value) => {
  return {
    type: ActionType.inputChange,
    serviceKey,
    key,
    value
  }
};
const tabCancelActionCreator = () => {
  return {type: ActionType.tabCancel};
};
const saveActionCreator = ( data) => {
  return {type: ActionType.tabCancel};
};
const submitActionCreator = (data) => {
  return {type: ActionType.tabCancel};
};

const serviceCheckActionCreator = (serviceKey) => {
  return {
    type: ActionType.serviceCheck,
    serviceKey
  }
};
const addRowActionCreator = (tableName, serviceKey) => {
  return {
    type: ActionType.addRow,
    tableName,
    serviceKey
  }
};
const contentChangeActionCreator = (tableName, serviceKey, rowIndex, keyName, value) => {
  return {
    type: ActionType.contentChange,
    tableName,
    serviceKey,
    rowIndex,
    keyName,
    value
  }
};
const deleteActionCreator = (tableName, serviceKey, rowIndex, keyName) => {
  return {
    type: ActionType.delete,
    tableName,
    serviceKey,
    rowIndex,
    keyName
  }
};


const transformData = (data, options) => {
  console.log(options);
  let { customerList=[], paymentCustomers=[]} = options;
  let delegateClient = customerList.map((item) => {
    return {guidKey:'delegateClient', guidValue:item.customerGuid, nameKey:'xxx', nameValue:item.customerName};
  });
  data['options'] = {
    delegateClient: delegateClient
  };
  return data;
};

const uiParam  = {
  label: {},
  data: {
    baseInfo: {},
    goodsInfo: {},
    serviceType: {},

    domesticTransport: {},
    portTransportIn: {},
    portTransportOut: {},
    portLocalTransport: {},
    bookingTransport: {},
    bondedTransport: {},
    railwayTransport: {},
    seaTransport: {},
    airTransport: {},
    toDO: {},
    delegateOption: {},
    coastalTrade: {},
    portTransport: {},

    goodsInfoTable: [],
    cabinetInfoTable: [],
  }
};
const toUIParam = ({data, label}) => {
  let param = uiParam;
  param.label = label;
  param.data = data;
  return param;
};
const mapStateToProps = (state, props) => {
  return props.init ? {init:true} : toUIParam(props);
};

const actionCreators = {
  onInit: initActionCreator,
  onCancelTab: tabCancelActionCreator,
  onInputChange: inputChangeActionCreator,
  onSuperChange: superChangeActionCreator,
  onSave: saveActionCreator,
  onSubmit: submitActionCreator,
  onServiceCheck: serviceCheckActionCreator,
  onAddRow: addRowActionCreator,
  onContentChange: contentChangeActionCreator,
  onDelete: deleteActionCreator
};

const mergeProps = (stateProps, dispatchProps) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit();
    }
  }
  return Object.assign({}, stateProps, dispatchProps);
};

const OrderInfoContainer = connect(mapStateToProps, actionCreators, mergeProps)(OrderInfo);

export default OrderInfoContainer;
