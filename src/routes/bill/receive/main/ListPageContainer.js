import { connect } from 'react-redux';
import OrderPage from '../../../../components/OrderPage';
import fetch from '../../../../core/fetch';

const URL_CONFIG = '/api/bill_receive_config';
const URL_DATA = '/api/bill_receive_data';

const ActionType = {
  init: 'billReceiveListPageInit',
  edit: 'billReceiveKeyAdd'
};

const mergeAsState = (data, label) => {
  data['pagination']['config'] = label['pagination'];
  data['search']['config'] = label['search'];
  data['toolbar']['buttons'] = label['toolbar'];
  data['table']['cols'] = label['table'];
  return data;
};

const onInit = () => async (dispatch) => {
  let res, payload, data, config;

  res = await fetch(URL_DATA);
  if (!res.ok) {
    return;
  }

  data = await res.json();

  res = await fetch(URL_CONFIG);
  if (!res.ok) {
    return;
  }

  config = await res.json();

  payload = mergeAsState(data, config);

  dispatch({type: ActionType.init, payload});
};

const onEdit = () => {
 return {type: ActionType.edit};
};
const btnEvents = {
  edit: onEdit
};

const onClick = (key) => {
  return btnEvents[key]();
};

const mapStateToProps = (state, props) => {
  return props;
};

const actionCreators = {
  onInit: onInit,
  onClick: onClick
};

const mergeProps = (stateProps, dispatchProps) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit();
    }
  }
  return Object.assign({}, stateProps, dispatchProps);
};

const ListPageContainer = connect(mapStateToProps, actionCreators, mergeProps)(OrderPage);

export default ListPageContainer;
