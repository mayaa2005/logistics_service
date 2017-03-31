import { connect } from 'react-redux';
import EditPage from './EditPage';

const ADD_ACTION = 'billExtraEditAdd';
const COPY_ACTION = 'billExtraEditCopy';
const DEL_ACTION = 'billExtraEditDel';
const CHECK_ACTION = 'billExtraEditCheck';
const TABLE_CHANGE_ACTION = 'billExtraEditTableChange';
const FORM_CHANGE_ACTION = 'billExtraEditFormChange';
const CLOSE_ACTION = 'billExtraTabDel';

const getSelfState = (rootState) => {
  const parent = rootState.bill.extra;
  return parent[parent.activeKey];
};

const buttonActions = {
  add: {type: ADD_ACTION},
  copy: {type: COPY_ACTION},
  del: {type: DEL_ACTION},
  save: {type: CLOSE_ACTION},
  cancel: {type: CLOSE_ACTION}
};

const clickActionCreator = (key) => {
  if (buttonActions.hasOwnProperty(key)) {
    return buttonActions[key];
  } else {
    console.log('unknown key:', key);
    return {type: 'unknown'};
  }
};

const checkActionCreator = (rowIndex, keyName, checked) => {
  return {type: CHECK_ACTION, rowIndex, keyName, checked};
};

const tableChangeActionCreator = (rowIndex, keyName, value) => {
  return {type: TABLE_CHANGE_ACTION, rowIndex, keyName, value};
};

const formChangeActionCreator = (keyName, value) => {
  return {type: FORM_CHANGE_ACTION, keyName, value};
};

const mapStateToProps = (state) => {
  return getSelfState(state);
};

const actionCreators = {
  onClick: clickActionCreator,
  onCheck: checkActionCreator,
  onContentChange: tableChangeActionCreator,
  onFormChange: formChangeActionCreator
};

const EditPageContainer = connect(mapStateToProps, actionCreators)(EditPage);

export default EditPageContainer;
