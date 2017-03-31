import { connect } from 'react-redux';
import Supplier from './Supplier';
import fetch from '../../../core/fetch';
import {postOption} from '../../../common/common';

const URL_CONFIG = '/api/basic/supplier/config';
const URL_LIST = '/api/basic/supplier/list';

const INIT_ACTION = 'basicSupplierInit';
const TAB_CHANGE_ACTION = 'basicSupplierTabChange';

const getSelfState = (rootState) => {
  return rootState.basic.supplier;
};

const initActionCreator = () => async (dispatch) => {
  let res, data, config, option;

  res = await fetch(URL_CONFIG);
  if (!res.ok) {
    return;
  }

  config = await res.json();
  option = postOption({itemFrom: 0, itemTo: config.pageSize});
  res = await fetch(URL_LIST, option);
  if (!res.ok) {
    return;
  }

  data = await res.json();
  if (data.returnCode === 0) {
    dispatch({type: INIT_ACTION, result: data.result, config});
  }
};

const tabChangeActionCreator = (key) => {
  return {type: TAB_CHANGE_ACTION, key};
};

const mapStateToProps = (state) => {
  const {activeKey, init, tabs} = getSelfState(state);
  return {activeKey, init, tabs};
};

const actionCreators = {
  onInit: initActionCreator,
  onTabChange: tabChangeActionCreator
};

const mergeProps = (stateProps, dispatchProps) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit();
    }
  }

  return Object.assign({}, stateProps, dispatchProps);
};

const SupplierContainer = connect(mapStateToProps, actionCreators, mergeProps)(Supplier);

export default SupplierContainer;
