import { connect } from 'react-redux';
import {deepAssign} from '../../../reducers/toolFunction';
import OrderPage from '../../../components/OrderPage';
import fetch from '../../../core/fetch';
import {postOption} from '../../../common/common';

const URL_LIST = '/api/bill/extra/list';
const URL_AUDIT = '/api/bill/extra';
const URL_DEL = '/api/bill/extra';

const UPDATE_LIST_ACTION = 'billExtraUpdate';
const ADD_TAB_ACTION = 'billExtraTabAdd';
const AUDIT_ACTION = 'billExtraAudit';
const DEL_ACTION = 'billExtraDel';

const CHANGE_ACTION = 'billExtraChange';
const RESET_ACTION = 'billExtraReset';

const CHECK_ACTION = 'billExtraCheck';
const SORT_ACTION = 'billExtraSort';
const SWAP_ACTION = 'billExtraSwap';

const PAGE_NUMBER_ACTION = 'billExtraPageNumber';
const PAGE_SIZE_ACTION = 'billExtraPageSize';

const getSelfState = (rootState) => {
  const parent = rootState.bill.extra;
  return parent[parent.activeKey];
};

const checkedOneItem = (rootState) => {
  const {table: {items}} = getSelfState(rootState);
  const checkedItems = items.filter(item => item.checked);
  return checkedItems.length !== 1 ? null : checkedItems[0];
};

const editAction = (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (item) {
    dispatch({type: ADD_TAB_ACTION, data: item, edit: true});
  }
};

const auditActionCreator = (checkStatus) => async (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (!item || item.checkStatus === checkStatus) {
    return;
  }

  const option = postOption({checkStatus, extraChargeGuid: item.extraChargeGuid}, 'put');
  let res = await fetch(URL_AUDIT, option);
  if (!res.ok) {
    return;
  }

  const json = await res.json();
  if (json.returnCode === 0) {
    dispatch({type: AUDIT_ACTION, result: json.checkResult, item});
  }
};

const delAction = async (dispatch, getState) => {
  const item = checkedOneItem(getState());
  if (!item || item.checkStatus) {
    return;
  }

  let res = await fetch(`${URL_DEL}/${item.extraChargeGuid}`, {method: 'delete'});
  if (!res.ok) {
    return;
  }

  const json = await res.json();
  if (json.returnCode === 0) {
    dispatch({type: DEL_ACTION, item});
  }
};

const toolbarActions = {
  add: {type: ADD_TAB_ACTION, edit: false},
  edit: editAction,
  audit: auditActionCreator(1),
  revoke: auditActionCreator(0),
  del: delAction
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

const updateList = async (dipatch, currentPage, pageSize, searchData) => {
  const option = postOption(buildFilters(currentPage, pageSize, searchData));
  let res = await fetch(URL_LIST, option);
  if (res.ok) {
    let json = await res.json();
    if (json.returnCode === 0) {
      dipatch({type: UPDATE_LIST_ACTION, data: json});
    }
  }
};

const searchActionCreator = () => async (dipatch, getState) => {
  const selfState = getSelfState(getState());
  const {pagination: {page}} = selfState;
  updateList(dipatch, page.currentPage, page.pageSize, selfState.search.data);
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
  let selfState = getSelfState(state);
  const items = selfState.table.items.map(item => {
    let {...newItem} = item;
    newItem.checkStatus = selfState.label.checkStatus[item.checkStatus];
    return newItem;
  });
  return deepAssign(selfState, {items}, 'table');
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

const OrderPageContainer = connect(mapStateToProps, actionCreators)(OrderPage);

export default OrderPageContainer;
