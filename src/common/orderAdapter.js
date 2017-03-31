/*
OrderPage对应的state的结构如下：
 {
  config: {object}    // 配置信息(标签和类型)
  meta: {object}      // 元数据(keys和GUID)
  bak: {object}       // 放置备份数据(即原始数据)
  tableItems: [array]
  tableCols: [array]
  searchData: {object}
  currentPage: number
  maxRecords: number
  pageSize: number
  pageSizeType: [array]
}
*/

const toTableItems = ({keys, data}) => {
  return data.map((item) => {
    const children = keys.slice(1, -1).reduce((state, key) => {
      state[key] = item[key];
      return state;
    }, {});
    return Object.assign(item[keys[0]], {children});
  });
};

// 转换从服务端传递过来的数据，该数据会保存到store中
const toOrderPageState = (result, config, {pageSize, pageSizeType}) => {
  return {
    config,
    pageSize,
    pageSizeType,
    bak: {},
    meta: {keys: result.keys},
    tableItems: toTableItems(result),
    tableCols: config.table,
    searchData: {},
    currentPage: 1,
    maxRecords: result.returnTotalItem
  }
};

const toTable = ({tableItems, tableCols, config}) => {
  const items = tableItems.map(item => Object.assign({}, item, {active: config.active[item.active]}));
  return {items, cols: tableCols};
};

const toSearch = ({searchData, config}) => {
  return {
    isMore: false,
    data: searchData,
    ...config.search
  };
};

const toPagination = ({pageSize, pageSizeType, currentPage, maxRecords, config}) => {
  return {
    config: config.pagination,
    pageSizeType,
    page: {currentPage, pageSize, maxRecords}
  }
};

const toToolbar = ({config: {toolbar}}) => {
  return {buttons: toolbar};
};

// 转换从store传递过来的state，该数据会渲染到OrderPage UI组件中
const toOrderPageParams = (state) => {
  return {
    table: toTable(state),
    search: toSearch(state),
    pagination: toPagination(state),
    toolbar: toToolbar(state)
  };
};

export {toTableItems, toOrderPageState, toOrderPageParams};
