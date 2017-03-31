import { connect } from 'react-redux';
import Settle from './Settle';
import fetch from '../../../core/fetch';

const getSettleEditUIAction =  'settleEditUIInfo';
const onGetSettleEditUIInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.settleEditUIInfo){
    //console.log('界面字段名称已加载');
    return;
  }
  dispatch({ type: getSettleEditUIAction});
  const response = await fetch('/api/settle_edit_ui');
  if (response.status == 404) {
    dispatch({ type: getSettleEditUIAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('界面',json);
  dispatch({ type: getSettleEditUIAction, ui: json });
};

const getSettleInfoAction =  'settleInfo';
const onGetSettleInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.settleInfo){
    //console.log('界面字段名称已加载');
    return;
  }
  dispatch({ type: getSettleInfoAction});
  const response = await fetch('/api/settle_info');
  if (response.status == 404) {
    dispatch({ type: getSettleInfoAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  //console.log('数据',json);
  dispatch({ type: getSettleInfoAction, ui: json });
};


const settleTabAction = 'settleTabSelect';
const onTabChange = (tabKey) => {
  return {
    type: settleTabAction,
    tabKey
  };
};

const mapStateToProps = (state, props) => {
  //console.log('eeeeee===', state.order.settleRoot);
  return state.order.settleRoot.settle;
};

const mapDispatchToProps = {
  onGetSettleEditUIInfo: () => onGetSettleEditUIInfo,
  onGetSettleInfo: () => onGetSettleInfo,

  onTabChange: (tabKey) => onTabChange(tabKey)
};

const SettleContainer = connect(mapStateToProps,mapDispatchToProps)(Settle);

export default SettleContainer;
