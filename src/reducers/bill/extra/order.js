import {deepAssign, composeReducers, swapItems} from '../../toolFunction';

const toTableItems = (extraChargeList) => {
  return extraChargeList.map(({extraChargeBaseInfo, chargeDetail}) => {
    extraChargeBaseInfo.chargeDetail = chargeDetail;
    return extraChargeBaseInfo;
  });
};

const toSearchFilters = ({search:{filters}}) => {
  let items = [
    {type: 'text', key: 'extraChargeNumber'},
    {type: 'text', key: 'logisticsOrderNumber'},
    {type: 'text', key: 'taskOrderNumber'},
    {type: 'text', key: 'checkStatus'}
  ];
  return items.map(item => {
    item.title = filters[item.key];
    return item;
  });
};

const toInitState = ({extraChargeList, returnTotalItem}, label, pageSize, pageSizeType) => {
  return {
    label,
    table: {
      items: toTableItems(extraChargeList),
      cols: label.table
    },
    search: {
      isMore: false,
      data: {},
      config: label.search.config,
      filters: toSearchFilters(label)
    },
    pagination: {
      pageSizeType: pageSizeType,
      config: label.pagination,
      page: {
        maxRecords: returnTotalItem,
        pageSize: pageSize,
        currentPage: 1
      }
    },
    toolbar: {
      buttons: label.toolbar
    }
  };
};

const initReducer = (state, {data, label, pageSize, pageSizeType}) => {
  return toInitState(data, label, pageSize, pageSizeType);
};

const updateReducer = (state, {data: {extraChargeList}}) => {
  const items = toTableItems(extraChargeList);
  return deepAssign(state, {items}, 'table');
};

const changeReducer = (state, {key, value}) => {
  return deepAssign(state, {[key]: value}, 'search', 'data');
};

const searchReducer = (state) => {
  return state;
};

const resetReducer = (state) => {
  return deepAssign(state, {data: {}}, 'search');
};

const checkReducer = (state, {isAll, checked, rowIndex}) => {
  let items = state.table.items;
  if (isAll) {
    items.filter(item => item.checked = checked);
  } else {
    items[rowIndex].checked = checked;
  }
  return deepAssign(state, {items}, 'table');
};

const sortReducer = (state) => {
  return state;
};

const swapReducer = (state, {key1, key2}) => {
  const cols = swapItems(state.table.cols, key1, key2);
  return deepAssign(state, {cols}, 'table');
};

const pageNumberReducer = (state, {pageNumber}) => {
  return deepAssign(state, {currentPage: pageNumber}, 'pagination', 'page');
};

const pageSizeReducer = (state, {pageNumber, pageSize}) => {
  return deepAssign(state, {currentPage: pageNumber, pageSize}, 'pagination', 'page');
};

const auditReducer = (state, {result, item}) => {
  let [...items] = state.table.items;
  let rowIndex = items.findIndex(originItem => originItem === item);
  Object.assign(items[rowIndex], result);
  return deepAssign(state, {items}, 'table');
};

const delReducer = (state, {item}) => {
  const items = state.table.items.filter(originItem => originItem !== item);
  const newState = deepAssign(state, {items}, 'table');
  const records = state.pagination.page.maxRecords;
  return deepAssign(newState, {maxRecords: records - 1}, 'pagination', 'page');
};

const orderReducer = composeReducers({
  billExtraIndexInit: initReducer,
  billExtraUpdate: updateReducer,

  billExtraChange: changeReducer,
  billExtraSearch: searchReducer,
  billExtraReset: resetReducer,

  billExtraCheck: checkReducer,
  billExtraSort: sortReducer,
  billExtraSwap: swapReducer,

  billExtraPageNumber: pageNumberReducer,
  billExtraPageSize: pageSizeReducer,

  billExtraAudit: auditReducer,
  billExtraDel: delReducer
});

export default orderReducer;
