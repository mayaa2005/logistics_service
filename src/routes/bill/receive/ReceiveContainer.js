
import { connect } from 'react-redux';
import Receive from './Receive';

const ActionType = {
  init: 'billReceiveInit',
  tabChange:  'billReceiveKeyChange'
};

const onInit = () => (dispatch) => {
  const initState = {
    init: false,
    tabs:[{key:'billReceiveIndex', title:'应收结算列表'}],
    currentKey: 'billReceiveIndex',
    billReceiveIndex: {init: true}
  };
  setTimeout(() => {
    dispatch({type: ActionType.init, initState});
  }, 0);
};

const onTabChange = (currentKey) => {
  return {
    type: ActionType.tabChange,
    currentKey
  }
};

const mapStateToProps = (state, props) => {
  return state.bill.receive;
};

const actionCreators = {
  onInit: onInit,
  onTabChange: onTabChange
};

const mergeProps = (stateProps, dispatchProps) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit();
    }
  }
  return Object.assign({}, stateProps, dispatchProps);
};

const ReceiveContainer = connect(mapStateToProps, actionCreators, mergeProps)(Receive);

export default ReceiveContainer;
