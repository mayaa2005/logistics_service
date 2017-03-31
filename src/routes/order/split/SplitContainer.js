import { connect } from 'react-redux';
import Split from './Split';
import fetch from '../../../core/fetch';

const URL_LABEL = '/api/order_split_label';

const ActionType = {
  init: 'orderSplitInit',
  tabChange: 'orderSplitTabChange'
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

const mapStateToProps = ({order: {split}}) => {
  const {activeKey} = split;
  return {
    activeKey,
    init: split.init,
    tabs: split.tabs,
    props: split[activeKey]
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

const SplitContainer = connect(mapStateToProps, actionCreators, mergeProps)(Split);

export default SplitContainer;
