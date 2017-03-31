import orderInfo from '../../common/orderInfoLabel';

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
    {key: 'orderStatus', title: '状态'},
    {key: 'logisticsOrderNumber', title: '物流订单号'},
    {key: 'orderingNumber', title: '客户委托号'},
    {key: 'customerName', title: '委托客户'},
    {key: 'specifyCustomer', title: '指定委托方'},
    {key: 'contactName', title: '客户联系人'},
    {key: 'contactPhone', title: '联系人电话'},
    {key: 'contactEmail', title: '联系人邮箱'},
    {key: 'referenceNumber', title: '委托参考号码'},
    {key: 'paymentCustomerName', title: '付款客户'},
    {key: 'contractNumber', title: '合约号'},
    {key: 'salesPersonName', title: '业务员'},
    {key: 'goodsName', title: '中文品名'},
    {key: 'goodsCount', title: '数量'},
    {key: 'goodsVolume', title: '体积'},
    {key: 'roughWeight', title: '毛重'},
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

const label = {orderInfo, index};

export default label;
