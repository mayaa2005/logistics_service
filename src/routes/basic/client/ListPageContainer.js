import { connect } from 'react-redux';
import {deepAssign} from '../../../reducers/toolFunction';
import {postOption} from '../../../common/common';
import ListPage from './ListPage';

const URL_LIST = '/api/basic/client/list';
const URL_ACTIVE = '/api/basic/client/active';
const URL_DEL = '/api/basic/client/delete';

const ActionType = {
  add: 'basicClientTabAdd',
  delete: 'basicClientDelete',
  active: 'basicClientActive',
  //import: 'basicClientImport',
  //export: 'basicClientExport',

  update: 'basicClientUpdate',
  change: 'basicClientChange',
  reset: 'basicClientReset',

  check:  'basicClientCheck',
  sort: 'basicClientSort',
  swap: 'basicClientSwap',

  pageNumber: 'basicClientPageNumber',
  pageSize: 'basicClientPageSize'
};

const getSelfState = (rootState) => {
  const parent = rootState.basic.client;
  return parent[parent.activeKey];
};

const addActionCreator = (dispatch, getState) => {
  let rootState = getState();
  const {keys=[]} = getSelfState(rootState);
  dispatch({type: ActionType.add, keys, edit: false});
};

const checkedOneItem = (rootState) => {
  const {table: {items}} = getSelfState(rootState);
  const checkedItems = items.filter(item => item.checked);
  return checkedItems.length !== 1 ? null : checkedItems[0];
};

const editActionCreator = (dispatch, getState) => {
  let rootState = getState();
  const item = checkedOneItem(rootState);
  const {keys=[]} = getSelfState(rootState);
  if (item) {
    dispatch({type: ActionType.add, keys, data: item, edit: true});
  }
};

const deleteActionCreator = async (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (!item || item.checkStatus) {
    return;
  }
  let key = 'customerGuid';
  let res = await fetch(`${URL_DEL}/${item[key]}`, {method: 'delete'});
  if (!res.ok) {
    return;
  }

  const json = await res.json();
  if (json.returnCode === 0) {
    dispatch({type: ActionType.delete, item, data:json});
  }
};

const activeActionCreator = async (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (!item || item.checkStatus) {
    return;
  }
  let key = 'customerGuid';
  let res = await fetch(`${URL_ACTIVE}/${item[key]}`, {method: 'put'});
  if (!res.ok) {
    return;
  }

  const json = await res.json();
  if (json.returnCode === 0) {
    dispatch({type: ActionType.active, item, data:json});
  }
};

const importActionCreator = () => {
};
const exportActionCreator = () => {
};

const toolbarActions = {
  add: addActionCreator,
  edit: editActionCreator,
  delete: deleteActionCreator,
  active: activeActionCreator,
  import: importActionCreator,
  export: exportActionCreator
};

const clickActionCreator = (key) => {
  if (toolbarActions.hasOwnProperty(key)) {
    return toolbarActions[key];
  } else {
    console.log('unknown key:', key);
    return {type: 'unknown'};
  }
};

const buildFilters = (currentPage, pageSize, searchData) => {
  let filters = Object.keys(searchData).reduce((pre, key) => {
    if (searchData[key] !== '') {
      pre[key] = searchData[key];
    }
    return pre;
  }, {});
  filters.itemFrom = (currentPage - 1) * pageSize;
  filters.itemTo = filters.itemFrom + pageSize;
  return filters;
};

const updateList = async (dispatch, currentPage, pageSize, searchData) => {
  const option = postOption(buildFilters(currentPage, pageSize, searchData));
  let res = await fetch(URL_LIST, option);
  if (res.ok) {
    let json = await res.json();
    if (json.returnCode === 0) {
      dispatch({type: ActionType.update, data: json});
    }
  }
};

const searchActionCreator = () => async (dispatch, getState) => {
  const selfState = getSelfState(getState());
  const {pagination: {page}} = selfState;
  updateList(dispatch, page.currentPage, page.pageSize, selfState.search.data);
};

const changeActionCreator = (key, value) => {
  return {type: ActionType.change, key, value};
};

const resetActionCreator = () => {
  return {type: ActionType.reset};
};

const checkActionCreator = (isAll, checked, rowIndex) => {
  return {type: ActionType.check, isAll, checked, rowIndex};
};

const sortActionCreator = (key) => {
  return {type: ActionType.sort, key};
};

const swapActionCreator = (key1, key2) => {
  return {type: ActionType.swap, key1, key2};
};

const pageNumberActionCreator = (pageNumber) => {
  return {type: ActionType.pageNumber, pageNumber};
};

const pageSizeActionCreator = (pageSize, pageNumber) => {
  return {type: ActionType.pageSize, pageSize, pageNumber};
};

const mapStateToProps = (state) => {
  let selfState = getSelfState(state);
  const items = selfState.table.items.map(item => {
    let stateKey = 'active';
    let {...newItem} = item;
    newItem[stateKey] = selfState.label[stateKey][Number(item[stateKey])];
    return newItem;
  });
  return deepAssign(selfState, {items}, 'table');
};

const actionCreators = {
  onClick: clickActionCreator,

  onSearch: searchActionCreator, //TODO
  onChange: changeActionCreator,
  onReset: resetActionCreator,

  onCheck: checkActionCreator,
  onSort: sortActionCreator,
  onSwapCol: swapActionCreator,

  onPageNumberChange: pageNumberActionCreator,
  onPageSizeChange: pageSizeActionCreator,
};

const ListPageContainer = connect(mapStateToProps, actionCreators)(ListPage);

export default ListPageContainer;
