import {deepAssign, composeReducers, swapItems} from '../../toolFunction';

const toTableItems = (keys=[], data=[]) => {
  return data.map((item) => {
    let newItem = item[keys[0]];
    keys.map((key, index) => {
      if (index > 0) {
        newItem = Object.assign( {}, newItem, {[key]: item[key]} );
      }
    });
    return newItem;
  });
};

const toSearchFilters = ({search:{filters}}) => {
  let items = [
    {type: 'text', key: 'customerCode'},
    {type: 'text', key: 'customerName'},
    {type: 'text', key: 'customerShortName'},
    {type: 'text', key: 'active'}
  ];
  return items.map(item => {
    item.title = filters[item.key];
    return item;
  });
};

const toInitState = ({keys, data, returnTotalItems}, label, pageSize, pageSizeType) => {
  return {
    label,
    keys,
    table: {
      items: toTableItems(keys, data),
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
        maxRecords: returnTotalItems,
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

const updateReducer = (state, {data:{ result: {keys, data, returnTotalItems}} }) => {
  const items = toTableItems(keys, data);
  let newState = deepAssign(state, {items}, 'table');
  return deepAssign(newState, {maxRecords: returnTotalItems}, 'pagination', 'page');
};

const changeReducer = (state, {key, value}) => {
  return deepAssign(state, {[key]: value}, 'search', 'data');
};

const resetReducer = (state) => {
  return deepAssign(state, {data: {}}, 'search');
};

const checkReducer = (state, {isAll, checked, rowIndex}) => {
  let items = state.table.items;
  if (isAll) {
    items.map(item => item.checked = checked);
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

const activeReducer = (state, {data:{result}, item}) => {
  let [...items] = state.table.items;
  let rowIndex = items.findIndex(originItem => originItem === item);
  Object.assign(items[rowIndex], result);
  return deepAssign(state, {items}, 'table');
};

const delReducer = (state, action) => {
  let {item, data:{result}} = action;
  let items = [];
  if (!result){
    items = state.table.items.filter(originItem => originItem !== item);
  }else {
    items = state.table.items.map(originItem => originItem == item ? deepAssign(originItem, result) : originItem);
  }
  const newState = deepAssign(state, {items}, 'table');
  const records = state.pagination.page.maxRecords;
  return deepAssign(newState, {maxRecords: records - 1}, 'pagination', 'page');
};

const orderReducer = composeReducers({
  basicClientIndexInit: initReducer,

  basicClientUpdate: updateReducer,
  basicClientChange: changeReducer,
  basicClientReset: resetReducer,

  basicClientCheck: checkReducer,
  basicClientSort: sortReducer,
  basicClientSwap: swapReducer,

  basicClientPageNumber: pageNumberReducer,
  basicClientPageSize: pageSizeReducer,

  basicClientActive: activeReducer,
  basicClientDelete: delReducer
});

export default orderReducer;
