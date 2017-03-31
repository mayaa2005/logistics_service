import { connect } from 'react-redux';
import {deepAssign} from '../../../reducers/toolFunction';
import OrderPage from '../../../components/OrderPage';
import fetch from '../../../core/fetch';
import {postOption} from '../../../common/common';
import {toOrderPageParams} from '../../../common/orderAdapter';

const ITEM_KEY = 'supplierCode';
const URL_LIST = '/api/basic/supplier/list';
const URL_DEL = '/api/basic/supplier';
const URL_ACTIVE = '/api/basic/supplier/active';

// 表格更新(点击搜索或分页)
const UPDATE_LIST_ACTION = 'basicSupplierUpdate';
// 增加TAB标签(点击新增或编辑按钮触发)
const ADD_TAB_ACTION = 'basicSupplierTabAdd';
// 搜索组件数据改变
const CHANGE_ACTION = 'basicSupplierChange';
// 点击了搜索组件的重置按钮
const RESET_ACTION = 'basicSupplierReset';
// 点击了表格的复选框
const CHECK_ACTION = 'basicSupplierCheck';
// 点击了表头
const SORT_ACTION = 'basicSupplierSort';
// 拖放表头
const SWAP_ACTION = 'basicSupplierSwap';
// 改变页码
const PAGE_NUMBER_ACTION = 'basicSupplierPageNumber';
// 改变页大小
const PAGE_SIZE_ACTION = 'basicSupplierPageSize';
// 表格中删除某条记录
const ITEM_DEL_ACTION = 'basicSupplierItemDel';
// 表格中某条记录改变
const ITEM_CHANGE_ACTION = 'basicSupplierItemChange';

const getSelfState = (rootState) => {
  const parent = rootState.basic.supplier;
  return parent[parent.activeKey];
};

const checkedOneItem = (rootState) => {
  const {tableItems} = getSelfState(rootState);
  const checkedItems = tableItems.filter(item => item.checked);
  return checkedItems.length !== 1 ? null : checkedItems[0];
};

const editAction = (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (item) {
    dispatch({type: ADD_TAB_ACTION, data: item, dataKey: ITEM_KEY, edit: true});
  }
};

const delAction = async (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (!item) {
    return;
  }

  let res = await fetch(`${URL_DEL}/${item.guid}`, {method: 'delete'});
  if (!res.ok) {
    return;
  }

  const {returnCode, result} = await res.json();
  if (returnCode === 0) {
    if (result) {
      dispatch({type: ITEM_CHANGE_ACTION, item, result});
    } else {
      dispatch({type: ITEM_DEL_ACTION, item});
    }
  }
};

const activeAction = async (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (!item) {
    return;
  }

  let res = await fetch(`${URL_ACTIVE}/${item.guid}`, {method: 'put'});
  if (!res.ok) {
    return;
  }

  const {returnCode, result} = await res.json();
  if (returnCode === 0) {
    dispatch({type: ITEM_CHANGE_ACTION, item, result});
  }
};

const toolbarActions = {
  add: {type: ADD_TAB_ACTION, edit: false},
  edit: editAction,
  del: delAction,
  active: activeAction
};

const clickActionCreator = (key) => {
  if (toolbarActions.hasOwnProperty(key)) {
    return toolbarActions[key];
  } else {
    console.log('unknown key:', key);
    return {type: 'unknown'};
  }
};

const createActionCreator = (type) => () => {
  return {type};
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
    const {returnCode, result} = await res.json();
    if (returnCode === 0) {
      dispatch({type: UPDATE_LIST_ACTION, result});
    }
  }
};

const searchActionCreator = () => async (dispatch, getState) => {
  const selfState = getSelfState(getState());
  updateList(dispatch, selfState.currentPage, selfState.pageSize, selfState.searchData);
};

const changeActionCreator = (key, value) => {
  return {type: CHANGE_ACTION, key, value};
};

const checkActionCreator = (isAll, checked, rowIndex) => {
  return {type: CHECK_ACTION, isAll, checked, rowIndex};
};

const sortActionCreator = (key) => {
  return {type: SORT_ACTION, key};
};

const swapActionCreator = (key1, key2) => {
  return {type: SWAP_ACTION, key1, key2};
};

const pageNumberActionCreator = (pageNumber) => {
  return {type: PAGE_NUMBER_ACTION, pageNumber};
};

const pageSizeActionCreator = (pageSize, pageNumber) => {
  return {type: PAGE_SIZE_ACTION, pageSize, pageNumber};
};

const mapStateToProps = (state) => {
  return toOrderPageParams(getSelfState(state));
};

const actionCreators = {
  onSearch: searchActionCreator,
  onChange: changeActionCreator,
  onReset: createActionCreator(RESET_ACTION),

  onCheck: checkActionCreator,
  onSort: sortActionCreator,
  onSwapCol: swapActionCreator,

  onPageNumberChange: pageNumberActionCreator,
  onPageSizeChange: pageSizeActionCreator,

  onClick: clickActionCreator
};

const MainPageContainer = connect(mapStateToProps, actionCreators)(OrderPage);

export default MainPageContainer;

