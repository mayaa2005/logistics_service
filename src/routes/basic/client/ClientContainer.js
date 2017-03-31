import { connect } from 'react-redux';
import Client from './Client';
import fetch from '../../../core/fetch';

const URL_CONFIG = '/api/basic/client/config';
const URL_DATA = '/api/basic/client/data';

const INIT_ACTION = 'basicClientInit';
const TAB_CHANGE_ACTION = 'basicClientTabChange';

const initActionCreator = () => async (dispatch) => {
  let res, data, label;

  res = await fetch(URL_DATA);
  if (!res.ok) {
    return;
  }

  data = await res.json();

  res = await fetch(URL_CONFIG);
  if (!res.ok) {
    return;
  }

  label = await res.json();

  dispatch({type: INIT_ACTION, data, label});
};

const tabChangeActionCreator = (key) => {
  return {type: TAB_CHANGE_ACTION, key};
};

const mapStateToProps = ({basic: {client}}) => {
  const {activeKey} = client;
  return {
    activeKey,
    init: client.init,
    tabs: client.tabs,
    props: client[activeKey]
  };
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

const ClientContainer = connect(mapStateToProps, actionCreators, mergeProps)(Client);

export default ClientContainer;
