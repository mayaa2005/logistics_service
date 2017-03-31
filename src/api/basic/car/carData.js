const data  = {
  table: {
    items: [
      {key1: '', key2: '',key3: '粤B12345', key4: '海格', key5: '张三', key6: ''},{},{},{},{},{},{},{},{},{}
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
      {type: 'text', key: 'source', title: '始发地'},
      {type: 'text', key: 'destination', title: '目的地'},
      {type: 'text', key: 'transport', title: '运输方式'},
      {type: 'text', key: 'job-id', title: '作业单号'},
      {type: 'text', key: 'more1', title: '更多1'},
      {type: 'text', key: 'more2', title: '更多2'},
      {type: 'text', key: 'more3', title: '更多3'}
    ]
  },
  toolbar: {}
};

export default data;
