const data  = {
  table: {
    items: [
      {},{},{},{},{},{},{},{},{},{}
    ]
  },
  pagination: {
    page: {
      maxRecords: 199,
      pageSize: 10,
      currentPage: 1
    },
    pageSizeType: ['10', '20', '30', '40', '50']
  },
  search: {
    isMore: false,
    filters: [
      {type: 'text', key: 'key1', title: '物流订单号'},
      {type: 'text', key: 'key2', title: '客户委托号'},
      {type: 'text', key: 'key3', title: '委托客户'},
      {type: 'text', key: 'key4', title: '状态'},
      {type: 'text', key: 'more1', title: '更多1'},
      {type: 'text', key: 'more2', title: '更多2'},
      {type: 'text', key: 'more3', title: '更多3'}
    ]
  },
  toolbar: {}
};

export default data;
