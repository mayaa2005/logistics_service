import orderInfo from './orderInfoUIInfo';

const index = {
  title: '订单创建列表',
  search: {
    search: '搜索',
    more: '更多',
    less: '简化',
    reset: '重置'
  },
  toolbar: [
    {key: 'new', title: '新增', props: {bsStyle: 'primary'}},
    {key: 'copy', title: '复制新增'},
    {key: 'edit', title: '编辑'},
    {key: 'delete', title: '删除'},
    {key: 'import', title: '导入'}
  ],
  table: [
    {key: 'key1', title: '状态'},
    {key: 'key2', title: '单据编号'},
    {key: 'key3', title: '任务单编号'},
    {key: 'key4', title: '应收总金额'},
    {key: 'key5', title: '应付总金额'},
    {key: 'key6', title: '操作人'},
    {key: 'key7', title: '操作时间'},
    {key: 'key8', title: '审批人'},
    {key: 'key9', title: '审批时间'},
    {key: 'key10', title: '备注'}
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

const config = {orderInfo, index};

export default config;
