import {deepAssign, composeReducers, swapItems} from '../../toolFunction';
import {toTableItems, toOrderPageState} from '../../../common/orderAdapter';

const initReducer = (state, {result, config, pageSize, pageSizeType}) => {
  return toOrderPageState(result, config, {pageSize, pageSizeType});
};

const updateReducer = (state, {result}) => {
  const tableItems = toTableItems(result);
  return deepAssign(state, {tableItems});
};

const changeReducer = (state, {key, value}) => {
  return deepAssign(state, {[key]: value}, 'searchData');
};

const searchReducer = (state) => {
  return state;
};

const resetReducer = (state) => {
  return deepAssign(state, {searchData: {}});
};

const checkReducer = (state, {isAll, checked, rowIndex}) => {
  let tableItems = state.tableItems;
  if (isAll) {
    tableItems.filter(item => item.checked = checked);
  } else {
    tableItems[rowIndex].checked = checked;
  }
  return deepAssign(state, {tableItems});
};

const sortReducer = (state) => {
  return state;
};

const swapReducer = (state, {key1, key2}) => {
  const tableCols = swapItems(state.tableCols, key1, key2);
  return deepAssign(state, {tableCols});
};

const pageNumberReducer = (state, {pageNumber}) => {
  return deepAssign(state, {currentPage: pageNumber});
};

const pageSizeReducer = (state, {pageNumber, pageSize}) => {
  return deepAssign(state, {currentPage: pageNumber, pageSize});
};

const itemDelReducer = (state, {item}) => {
  const tableItems = state.tableItems.filter(tableItem => tableItem !== item);
  return deepAssign(state, {tableItems});
};

const itemChangeReducer = (state, {item, result}) => {
  const tableItems = state.tableItems.map(tableItem => {
    return tableItem === item ? deepAssign(item, result) : tableItem;
  });
  return deepAssign(state, {tableItems});
};

const orderReducer = composeReducers({
  basicSupplierIndexInit: initReducer,
  basicSupplierUpdate: updateReducer,

  basicSupplierChange: changeReducer,
  basicSupplierSearch: searchReducer,
  basicSupplierReset: resetReducer,

  basicSupplierCheck: checkReducer,
  basicSupplierSort: sortReducer,
  basicSupplierSwap: swapReducer,

  basicSupplierPageNumber: pageNumberReducer,
  basicSupplierPageSize: pageSizeReducer,

  basicSupplierItemDel: itemDelReducer,
  basicSupplierItemChange: itemChangeReducer
});

export default orderReducer;
