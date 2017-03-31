import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JobInfo from './JobInfo';

const ActionType = {
  onTabChange: 'jobInfoTabSelect',
  onTabCancel: 'jobCancelTab'
};

const onTabChange = ({tabKey}, secondTabSelectKey) => {
  return {type: ActionType.onTabChange, tabKey, secondTabSelectKey};
};

const onTabCancel = ({tabKey}) => {
  return {type: ActionType.onTabCancel, tabKey};
};

const mapStateToProps = (state, props) => {
  return Object.assign({}, props, {jobUnitsUIInfo: state.others.globalSource.jobUnitsUIInfo});
};

const actionCreators = {
  onTabChange: onTabChange,
  onTabCancel: onTabCancel
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

const JobInfoContainer = connect(mapStateToProps, mapDispatchToProps)(JobInfo);

export default JobInfoContainer;
