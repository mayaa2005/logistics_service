/**
 * Created by pengxiaojing on 2017/3/6.
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from '../../../../core/fetch';
import JobSplitModal from './JobSplitModal';

const ActionType = {
  onGetUIInfo: 'jobSplitUIInfo',
  getTable1Data: 'splitJobSplitTable1Data',
  getTable2Data: 'splitJobSplitTable2Data',
  onModalChange: 'splitJobSplitModalChange',
  onRadioChange: 'splitJobSplitRadioChange',
  onAddClick: 'splitJobSplitAddJob',
  onDeleteClick: 'splitJobSplitDeleteJob'
};

const onGetUIInfo = () => async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.jobSplitUIInfo){
    //console.log('作业单拆分界面字段名称已加载');
    return;
  }
  dispatch({ type: ActionType.onGetUIInfo});
  const response = await fetch('/api/job_split_ui');
  if (response.status == 404) {
    dispatch({ type: ActionType.onGetUIInfo, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.onGetUIInfo, ui: json });
};


const getTable1Data = ({tabKey}) => async (dispatch) => {
  dispatch({ type: ActionType.getTable1Data});
  const response = await fetch('/api/job_unit_list');
  if (response.status == 404) {
    dispatch({ type: ActionType.getTable1Data, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.getTable1Data, table1: json, tabKey });
};
const getTable2Data = ({tabKey}) => async (dispatch) => {
  dispatch({ type: ActionType.getTable2Data});
  const response = await fetch('/api/job_code_list');
  if (response.status == 404) {
    dispatch({ type: ActionType.getTable2Data, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: ActionType.getTable2Data, table2: json, tabKey });
};

const onModalChange = ({tabKey}, isShow) => {
  return {
    type: ActionType.onModalChange,
    tabKey,
    isShow
  }
};
const onRadioChange = ({tabKey}, radioName) => {
  return {
    type: ActionType.onRadioChange,
    tabKey,
    radioName
  }
};
const onAddClick = ({tabKey}, tableName, rowIndex) => {
  return {
    type: ActionType.onAddClick,
    tabKey,
    tableName,
    rowIndex
  }
};
const onDeleteClick = ({tabKey}, tableName, rowIndex) => {
  return {
    type: ActionType.onDeleteClick,
    tabKey,
    tableName,
    rowIndex
  }
};

const mapStateToProps = (state, props) => {
  return Object.assign({}, props,
    {splitUIInfo: state.others.globalSource.jobSplitUIInfo})
};

const actionCreators = {
  onGetUIInfo: onGetUIInfo,
  getTable1Data: getTable1Data,
  getTable2Data: getTable2Data,
  onModalChange: onModalChange,
  onRadioChange: onRadioChange,
  onAddClick: onAddClick,
  onDeleteClick: onDeleteClick
};

const insertArgs = (obj, ...args) => {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = obj[key].bind(null, ...args);
    return newObj;
  }, {});
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(insertArgs(actionCreators, props), dispatch);
};

const JobSplitModalContainer = connect(mapStateToProps, mapDispatchToProps)(JobSplitModal);

export default JobSplitModalContainer;
