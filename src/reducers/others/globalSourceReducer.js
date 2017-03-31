/**
 * Created by pengxiaojing on 2017/2/16.
 */

const initUIInfo = (state, action) => {
  if (action.ui) {
    return Object.assign({}, state, {[action.type]: action.ui});
  } else if (action.status) {
    console.log('get',action.type, action.status);
    return state;
  }
  return state;
};

const initState = {
  //作业单元数组-界面字段名称
  jobUnitsUIInfo:null,
  //货量拆分-界面字段名称
  goodsWeightSplitUIInfo:null,
  //作业单拆分-界面信息
  jobSplitUIInfo: null,
  //订单界面字段名称
  orderInfoUIInfo:null,
  //订单列表界面信息
  orderListUIInfo: null,
  //应收预结算界面字段名称
  settleEditUIInfo: null,
  //应收预结算界面信息
  settleInfo: null,
  //应收改单界面字段名称
  changeReceiveEditUIInfo: null,
  changeReceiveInfo: null,
  //应付改单界面字段名称
  changePayEditUIInfo: null,
  changePayInfo: null,
  //基础资料-车辆档案界面字段名称
  carUIInfo: null,
  carInfo: null
};
const globalSourceReducer = (state = initState, action) => {
  const exist = Object.keys(initState).some(type => action.type === type);
  if (!exist) return state;
  return initUIInfo(state, action);
};

export default globalSourceReducer;
