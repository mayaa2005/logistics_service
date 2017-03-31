import { connect } from 'react-redux';
import ChangeReceive from './ChangeReceive';
import fetch from '../../../core/fetch';

const getChangeReceiveEditUIAction =  'changeReceiveEditUIInfo';
const onGetChangeReceiveEditUIInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.changeReceiveEditUIInfo){
    return;
  }
  dispatch({ type: getChangeReceiveEditUIAction});
  const response = await fetch('/api/changeReceive_edit_ui');
  if (response.status == 404) {
    dispatch({ type: getChangeReceiveEditUIAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('界面',json);
  dispatch({ type: getChangeReceiveEditUIAction, ui: json });
};

const getChangeReceiveInfoAction =  'changeReceiveInfo';
const onGetChangeReceiveInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.changeReceiveInfo){
    return;
  }
  dispatch({ type: getChangeReceiveInfoAction});
  const response = await fetch('/api/changeReceive_info');
  if (response.status == 404) {
    dispatch({ type: getChangeReceiveInfoAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('数据',json);
  dispatch({ type: getChangeReceiveInfoAction, ui: json });
};

const changeReceiveTabAction = 'receiveTabSelect';
const onTabChange = (tabKey) => {
  return {
    type: changeReceiveTabAction,
    tabKey
  };
};

const mapStateToProps = (state, props) => {
  return state.bill.changeReceiveRoot.changeReceive;
};

const mapDispatchToProps = {
  onGetChangeReceiveEditUIInfo: () => onGetChangeReceiveEditUIInfo,
  onGetChangeReceiveInfo: () => onGetChangeReceiveInfo,

  onTabChange: (tabKey) => onTabChange(tabKey)
};

const ChangeReceiveContainer = connect(mapStateToProps,mapDispatchToProps)(ChangeReceive);

export default ChangeReceiveContainer;
