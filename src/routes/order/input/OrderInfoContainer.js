import {connect} from 'react-redux';
import OrderInfo from './OrderInfo';
import fetch from '../../../core/fetch';
import toUIParam from './transformOrderInfoData';

const URL_DATA = '/api/order_input_order_info_data';

const ActionType = {
  init: 'orderInputOrderInfoDataInit',
  tabCancel: 'orderInputTabCancel',
  options: 'inputOrderInfoOptions',
  inputChange: 'inputOrderInfoInputChange',
  serviceCheck: 'inputOrderInfoServiceCheck',
  addRow: 'inputOrderInfoAddRow',
  contentChange: 'inputOrderInfoContentChange',
  delete: 'inputOrderInfoDelete'
};

const initActionCreator = () => async (dispatch, getState) => {
  let res, options;
  res = await fetch(URL_DATA);
  if (!res.ok) {
    console.log('get order_input_order_info_data failed!!!');
    return;
  }
  options = await res.json();
  // console.log('opt==', options);
  dispatch({type: ActionType.init, options});
};

const superChangeActionCreator = (serviceKey, key, value) => async (dispatch) =>  {
  let res, options;
  if (serviceKey === 'orderBaseInfo' && key === 'customerGuid')
  {
    res = await fetch("/api/customer_contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        customerGuid: value
      })
    });
  }
  if (!res.ok) {
    console.log('superChange get options failed!!!');
    return;
  }
  options = await res.json();
  console.log('opt==', options);
  dispatch({type: ActionType.init, options});

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
const saveActionCreator = () => async (dispatch, getState) =>  {
  let state = getState();
  let {activeKey} = state.order.input;
  let data = Object.assign({}, state.order.input[activeKey].data);
  delete data.options;
  console.log('save order ==', data);
  let res = await fetch("/api/order_save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    console.log('save order failed!!!');
    return;
  }
  console.log('save order success!!!');
};
const submitActionCreator = (data) => {
  return {type: ActionType.tabCancel};
};

const serviceCheckActionCreator = (serviceKey, checked) => {
  return {
    type: ActionType.serviceCheck,
    serviceKey,
    checked
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
