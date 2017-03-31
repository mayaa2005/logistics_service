import { connect } from 'react-redux';
import OrderPage from '../../../components/OrderPage';
import fetch from '../../../core/fetch';

const URL_DATA = '/api/order_input_index_data';

const ActionType = {
  init: 'orderInputIndexDataInit',
  add: 'orderInputTabAdd',
  delete: 'orderInputDelete',
  import: 'orderInputImport',
  check: 'orderInputCheck',
  sort: 'orderInputSort',
  swap: 'orderInputSwap',
  pageNumber: 'orderInputPageNumber',
  pageSize: 'orderInputPageSize'
};

const initActionCreator = () => async (dispatch) => {
  let res, data;
  res = await fetch(URL_DATA);
  if (!res.ok) {
    console.log('get order_input_index_data failed!!!');
    return;
  }
  data = await res.json();
  dispatch({type: ActionType.init, data});
};

const newActionCreator = () => {
  return {type: ActionType.add, orderStatus:'new', data:{}};
};
const copyActionCreator = () => async (dispatch, getState) => {
  let state = getState();
  let {activeKey} = state.order.input;
  let table = state.order.input[activeKey].data.table;
  let data;
  for (let item of table.items) {
    if (item.checked) {
      data = item;
      break;
    }
  }
  // if (!data) return;

  dispatch({type: ActionType.add, orderStatus:'copy', data});
};
const editActionCreator = () => async (dispatch, getState) => {
  let state = getState();
  let {activeKey} = state.order.input;
  let table = state.order.input[activeKey].data.table;
  let data;
  for (let item of table.items) {
    if (item.checked) {
      data = item;
      break;
    }
  }
  if (!data) return;
  dispatch({type: ActionType.add, orderStatus:'edit', data});
};

const deleteActionCreator = () => {
  return {type: ActionType.delete};
};
const importActionCreator = () => {
  return {type: ActionType.import};
};

const buttons = {
  new: newActionCreator,
  copy: copyActionCreator,
  edit: editActionCreator,
  delete: deleteActionCreator,
  import: importActionCreator
};

const clickActionCreator = (key) => {
  if (buttons[key]) {
    return buttons[key]();
  } else {
    console.log('unknown key:', key);
    return {type: 'unknown'};
  }
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

const getTableItems = (items) => {
  let newItems = items.map(item => item.orderBaseInfo);
  return newItems;
};
const uiParam  = {
  table: {
    items: [],
    cols:[]
  },
  pagination: {
    page: {},
    pageSizeType: [],
    config:{}
  },
  search: {
    isMore: false,
    filters: [],
    config: {}
  },
  toolbar: {
    buttons:[]
  }
};
const toUIParam = ({data, label}) => {
  let param = uiParam;
  param.table.items = getTableItems(data.table.items);
  param.table.cols = label.table;
  param.pagination = data.pagination;
  param.pagination['config'] = label.pagination;
  param.search = data.search;
  param.search['config'] = label.search;
  param.toolbar.buttons = label.toolbar;
  return param;
};

const mapStateToProps = (state, props) => {
  return props.init ? {init:true} : toUIParam(props);
};

const actionCreators = {
  onInit: initActionCreator,
  onClick: clickActionCreator,
  onCheck: checkActionCreator,
  onSort: sortActionCreator,
  onSwapCol: swapActionCreator,
  onPageNumberChange: pageNumberActionCreator,
  onPageSizeChange: pageSizeActionCreator
};

const mergeProps = (stateProps, dispatchProps) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit();
    }
  }
  return Object.assign({}, stateProps, dispatchProps);
};

const ListPageContainer = connect(mapStateToProps, actionCreators, mergeProps)(OrderPage);

export default ListPageContainer;
