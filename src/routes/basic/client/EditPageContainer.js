import { connect } from 'react-redux';
import EditPage from './EditPage';

const ActionType = {
  formChange: 'basicClientEditFormChange',
  tableContentChange: 'basicClientEditTableContentChange',
  tableCheck: 'basicClientEditTableCheck',
  tableAdd: 'basicClientEditTableAdd',
};

const tableContentChangeActionCreator = (key, rowIndex, keyName, value) => {
  return {type: ActionType.tableContentChange, key, rowIndex, keyName, value};
};

const tableCheckActionCreator = (key, rowIndex, keyName, checked) => {
  return {type: ActionType.tableCheck, key, rowIndex, keyName, checked};
};

const tableAddActionCreator = (key) => {
  console.log('option of add for table:', key);
  return {type: ActionType.tableAdd, key};
};

const tableActiveActionCreator = (key) => {
  console.log('option of active for table:', key);
};
const tableInvalidActionCreator = (key) => {
  console.log('option of invalid for table:', key);
};

const toolbarActions = {
  add: tableAddActionCreator,
  active: tableActiveActionCreator,
  invalid: tableInvalidActionCreator
};

const tableOptionActionCreator = (tableKey, buttonKey) => {
  if (toolbarActions.hasOwnProperty(buttonKey)) {
    return toolbarActions[buttonKey](tableKey);
  } else {
    console.log('unknown key:', buttonKey);
    return {type: 'unknown'};
  }
};


const saveActionCreator = () => {
  console.log('option of save');
};

const cancelActionCreator = () => {
  console.log('option of cancel');
};
const btnActions = {
  save: saveActionCreator,
  cancel: cancelActionCreator
};
const btnClickActionCreator = (key) => {
  if (btnActions.hasOwnProperty(key)) {
    return btnActions[key];
  } else {
    console.log('unknown key:', key);
    return {type: 'unknown'};
  }
};

const formChangeActionCreator = (groupKey, index, key, isUrl, value) => {
  return {type: ActionType.formChange, groupKey, index, key, isUrl, value};
};

const mapStateToProps = (state, props) => {
  console.log('edit props==', props);
  return  props;
};

const actionCreators = {
  onTableOption: tableOptionActionCreator,
  onTableContentChange: tableContentChangeActionCreator,
  onTableCheck: tableCheckActionCreator,

  onBtnClick: btnClickActionCreator,

  onFormChange: formChangeActionCreator
};

const EditPageContainer = connect(mapStateToProps, actionCreators)(EditPage);

export default EditPageContainer;
