import { connect } from 'react-redux';
import ChangePay from './ChangePay';
import fetch from '../../../core/fetch';

const getChangePayEditUIAction =  'changePayEditUIInfo';
const onGetChangePayEditUIInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.changePayEditUIInfo){
    return;
  }
  dispatch({ type: getChangePayEditUIAction});
  const response = await fetch('/api/changePay_edit_ui');
  if (response.status == 404) {
    dispatch({ type: getChangePayEditUIAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('界面',json);
  dispatch({ type: getChangePayEditUIAction, ui: json });
};

const getChangePayInfoAction =  'changePayInfo';
const onGetChangePayInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.changePayInfo){
    return;
  }
  dispatch({ type: getChangePayInfoAction});
  const response = await fetch('/api/changePay_info');
  if (response.status == 404) {
    dispatch({ type: getChangePayInfoAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('数据',json);
  dispatch({ type: getChangePayInfoAction, ui: json });
};

const changePayTabAction = 'payTabSelect';
const onTabChange = (tabKey) => {
  return {
    type: changePayTabAction,
    tabKey
  };
};

const mapStateToProps = (state, props) => {
  return state.bill.changePayRoot.changePay;
};

const mapDispatchToProps = {
  onGetChangePayEditUIInfo: () => onGetChangePayEditUIInfo,
  onGetChangePayInfo: () => onGetChangePayInfo,
  onTabChange: (tabKey) => onTabChange(tabKey)
};

const ChangePayContainer = connect(mapStateToProps,mapDispatchToProps)(ChangePay);

export default ChangePayContainer;
