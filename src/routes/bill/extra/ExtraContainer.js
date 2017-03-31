import { connect } from 'react-redux';
import Extra from './Extra';
import fetch from '../../../core/fetch';
import {postOption} from '../../../common/common';

const URL_CONFIG = '/api/bill/extra/config';
const URL_LIST = '/api/bill/extra/list';

const INIT_ACTION = 'billExtraInit';
const TAB_CHANGE_ACTION = 'billExtraTabChange';

const initActionCreator = () => async (dispatch) => {
  let res, data, label, option;

  res = await fetch(URL_CONFIG);
  if (!res.ok) {
    return;
  }

  label = await res.json();
  option = postOption({itemFrom: 0, itemTo: label.pageSize});
  res = await fetch(URL_LIST, option);
  if (!res.ok) {
    return;
  }

  data = await res.json();
  dispatch({type: INIT_ACTION, data, label});
};

const tabChangeActionCreator = (key) => {
  return {type: TAB_CHANGE_ACTION, key};
};

const mapStateToProps = ({bill: {extra: {activeKey, init, tabs}}}) => {
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

const ExtraContainer = connect(mapStateToProps, actionCreators, mergeProps)(Extra);

export default ExtraContainer;
