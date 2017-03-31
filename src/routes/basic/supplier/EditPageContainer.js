import { connect } from 'react-redux';
import EditPage from './EditPage';
import {toEditParams} from '../../../common/supplierEditAdapter';
import fetch from '../../../core/fetch';
import {postOption} from '../../../common/common';

const ADD_URL = '/api/basic/supplier';
const EDIT_URL = '/api/basic/supplier';

const CHANGE_ACTION = 'basicSupplierChange';
const CONTENT_CHANGE_ACTION = 'basicSupplierContentChange';
const CHECK_ACTION = 'basicSupplierCheck';
const ADD_ROW_ACTION = 'basicSupplierAddRow';
const ACTIVE_ACTION = 'basicSupplierActive';
const INACTIVE_ACTION = 'basicSupplierInactive';
const CLOSE_TAB_ACTION = 'basicSupplierTabDel';
const ACTIVE_PART_ACTION = 'basicSupplierActivePart';

const getSelfState = (rootState) => {
  const parent = rootState.basic.supplier;
  return parent[parent.activeKey];
};

const bindEmpty = (ignores = []) => {
  if (ignores.length === 0) {
    return obj => Object.keys(obj).every(key => !obj[key]);
  } else {
    const keys = obj => Object.keys(obj).filter(key => ignores.indexOf(key) === -1);
    return obj => keys(obj).every(key => !obj[key]);
  }
};

const isEmpty = bindEmpty(['modify', 'guid', 'checked']);

const getDiffData = (tableItems) => {
  const data = tableItems.reduce((data, item) => {
    if (item.modify) {
      const empty = isEmpty(item);
      if (item.guid) {
        if (empty) {
          data.delete.push(item.guid);
        } else {
          data.update.push(item);
        }
      } else {
        if (!empty) {
          data.add.push(item);
        }
      }
    }
    return data;
  }, {update: [], add: [], delete: []});

  if (data.update.length !== 0 || data.add.length !== 0 || data.delete.length !== 0) {
    return data;
  } else {
    return null;
  }
};

const getModifyData = (state) => {
  let modify = false;
  const data = state.keys.reduce((data, key, index) => {
    if (index === 0) {
      if (state[key].modify) {
        data[key] = state[key];
        modify = true;
      }
    } else {
      const diffData = getDiffData(state[key]);
      if (diffData) {
        data[key] = diffData;
        modify = true;
      }
    }
    return data;
  }, {guid: state[state.keys[0]].guid});
  return modify ? data : null;
};

const getAddData = (state) => {
  return state.keys.reduce((data, key) => {
    data[key] = state[key];
    return data;
  }, {});
};

const addSupplier = async (dispatch, state) => {
  const data = getAddData(state);
  const res = await fetch(ADD_URL, postOption(data));
  if (res.ok) {
    const {returnCode} = await res.json();
    if (returnCode === 0) {
      dispatch({type: CLOSE_TAB_ACTION});
    }
  }
};

const editSupplier = async (dispatch, state) => {
  const data = getModifyData(state);
  if (data) {
    const res = await fetch(EDIT_URL, postOption(data, 'put'));
    if (res.ok) {
      const {returnCode} = await res.json();
      if (returnCode === 0) {
        dispatch({type: CLOSE_TAB_ACTION});
      }
    }
  } else {
    dispatch({type: CLOSE_TAB_ACTION});
  }
};

const saveAction = async (dispatch, getState) => {
  const state = getSelfState(getState());
  if (state.edit) {
    await editSupplier(dispatch, state);
  } else {
    await addSupplier(dispatch, state);
  }
};

const clickActionCreator = (key, keyButton) => {
  if (keyButton === 'add') {
    return {type: ADD_ROW_ACTION, key};
  } else if (keyButton === 'active') {
    return {type: ACTIVE_ACTION, key};
  } else if (keyButton === 'inactive') {
    return {type: INACTIVE_ACTION, key};
  } else if (keyButton === 'save') {
    return saveAction;
  } else if (keyButton === 'cancel') {
    return {type: CLOSE_TAB_ACTION};
  } else {
    return {type: 'unknown key'};
  }
};

const changeActionCreator = (key, value) => {
  return {type: CHANGE_ACTION, key, value};
};

const contentChangeActionCreator = (key, rowIndex, keyName, value) => {
  return {type: CONTENT_CHANGE_ACTION, key, rowIndex, keyName, value};
};

const checkActionCreator = (key, rowIndex, keyName, checked) => {
  return {type: CHECK_ACTION, key,  rowIndex, keyName, checked};
};

const activePartActionCreator = (activePart) => {
  return {type: ACTIVE_PART_ACTION, activePart};
};

const mapStateToProps = (state) => {
  return toEditParams(getSelfState(state));
};

const actionCreators = {
  onClick: clickActionCreator,
  onChange: changeActionCreator,
  onContentChange: contentChangeActionCreator,
  onCheck: checkActionCreator,
  onActivePart: activePartActionCreator
};

const EditPageContainer = connect(mapStateToProps, actionCreators)(EditPage);

export default EditPageContainer;

