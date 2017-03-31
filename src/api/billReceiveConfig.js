const config = {
  search: {
    search: '搜索',
    more: '更多',
    less: '简化',
    reset: '重置'
  },
  toolbar: [
    {key: 'edit', title: '编辑', props: {bsStyle: 'primary'}},
    {key: 'review', title: '审核'},
    {key: 'deleteReview', title: '撤销审核'}
  ],
  table: [
    {key: 'key1', title: '状态'},
    {key: 'key2', title: '结算单号'},
    {key: 'key3', title: '物流订单号'},
    {key: 'key4', title: '客户委托号'},
    {key: 'key5', title: '结算单位'},
    {key: 'key6', title: '结算总金额'},
    {key: 'key7', title: '操作人'},
    {key: 'key8', title: '操作时间'},
    {key: 'key9', title: '审核人'},
    {key: 'key10', title: '审核时间'},
    {key: 'key11', title: '备注'}
  ],
  pagination: {
    pageDesp: '共有{maxRecords}条记录，当前第 {currentPage}/{totalPage} 页',
    pageGoto: {placeholder: '跳转页数', btnTitle: '确定'},
    pageSize: {start: '每页显示', end: '条'},
    prevPage: '上一页',
    nextPage: '下一页',
    firstPage: '首页',
    lastPage: '尾页'
  }
};

export default config;
