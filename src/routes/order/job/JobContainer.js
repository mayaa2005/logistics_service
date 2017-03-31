import { connect } from 'react-redux';
import fetch from '../../../core/fetch';
import Job from './Job';

const jobUnitAction = 'jobUnitsUIInfo';
const onGetJobUnitsUIInfo = async (dispatch, getState) => {
  let state = getState();
  if (state.others.globalSource.jobUnitsUIInfo){
    //console.log('作业单元界面字段名称已加载');
    return;
  }
  dispatch({ type: jobUnitAction});
  const response = await fetch('/api/job_units_ui');
  if (response.status == 404) {
    dispatch({ type: jobUnitAction, status: 'fail' });
    return;
  }
  const json = await response.json();
  dispatch({ type: jobUnitAction, ui: json });
};

const tabSelectActionType = 'jobTabSelect';
const onTabChange = (tabKey) => {
  return {
    type: tabSelectActionType,
    tabKey
  }
};

const mapStateToProps = (state, props) => {
  return state.order.jobRoot;
};

const mapDispatchToProps = {
  onGetJobUnitsUIInfo: () => onGetJobUnitsUIInfo,
  onTabChange: (tabKey) => onTabChange(tabKey)
};

const JobContainer = connect(mapStateToProps, mapDispatchToProps)(Job);

export default JobContainer;
