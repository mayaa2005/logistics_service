import { connect } from 'react-redux';
import Input from './Input';
import fetch from '../../../core/fetch';

const URL_LABEL = '/api/order_input_label';

const ActionType = {
  init: 'orderInputInit',
  tabChange: 'orderInputTabChange'
};

const initActionCreator = () => async (dispatch) => {
  let res, label;
  res = await fetch(URL_LABEL);
  if (!res.ok) {
    return;
  }
  label = await res.json();
  dispatch({type: ActionType.init, label});
};

const tabChangeActionCreator = (key) => {
  return {type: ActionType.tabChange, key};
};

const mapStateToProps = ({order: {input}}) => {
  const {activeKey} = input;
  return {
    activeKey,
    init: input.init,
    tabs: input.tabs,
    props: input[activeKey]
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

const InputContainer = connect(mapStateToProps, actionCreators, mergeProps)(Input);

export default InputContainer;
