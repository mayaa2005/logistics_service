const index = {
  title: '额外费用列表',
  checkStatus: ['未审核', '已审核'],
  search: {
    config: {
      search: '搜索',
      more: '更多',
      less: '简化',
      reset: '重置'
    },
    filters: {
      extraChargeNumber: '单据编号',
      logisticsOrderNumber: '物流单号',
      taskOrderNumber: '任务单号',
      checkStatus: '状态'
    }
  },
  toolbar: [
    {key: 'add', title: '新增', bsStyle: 'primary'},
    {key: 'edit', title: '编辑'},
    {key: 'audit', title: '审核'},
    {key: 'revoke', title: '撤销审核'},
    {key: 'del', title: '删除'}
  ],
  table: [
    {key: 'checkStatus', title: '状态'},
    {key: 'extraChargeNumber', title: '单据编号'},
    {key: 'logisticsOrderNumber', title: '物流订单号'},
    {key: 'taskOrderNumber', title: '任务单号'},
    {key: 'receivableMoney', title: '应收总金额'},
    {key: 'payableMoney', title: '应付总金额'},
    {key: 'operatorMan', title: '操作人'},
    {key: 'operatorTime', title: '操作时间'},
    {key: 'checkMan', title: '审批人'},
    {key: 'checkTime', title: '审批时间'},
    {key: 'remark', title: '备注'}
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

const edit = {
  title: '新增',
  subTitle: '额外费用明细信息',
  table: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'chargeGenerateDirection', title: '费用方向', type: 'text'},
    {key: 'jobOrderNumber', title: '作业单号', type: 'text'},
    {key: 'chargeType', title: '费用类型', type: 'text'},
    {key: 'businessType', title: '业务属性', type: 'text'},
    {key: 'chargeName', title: '费用名称', type: 'text'},
    {key: 'balanceUnit', title: '结算单位', type: 'text'},
    {key: 'rateWay', title: '计税方式', type: 'text'},
    {key: 'unitPrice', title: '单价', type: 'text'},
    {key: 'totalQuantity', title: '数量', type: 'text'},
    {key: 'measureUnit', title: '计量单位', type: 'text'},
    {key: 'rate', title: '税率', type: 'text'},
    {key: 'rateMoney', title: '税额', type: 'text'},
    {key: 'netPrice', title: '净价', type: 'text'},
    {key: 'totalMoney', title: '费用金额', type: 'text'},
    {key: 'remark', title: '备注', type: 'text'}
  ],
  buttons: {
    add: '新增',
    copy: '复制新增',
    del: '删除',
    save: '保存',
    cancel: '取消'
  },
  forms: [
    {key: 'logisticsOrderNumber', title: '物流订单号', type: 'text'},
    {key: 'taskOrderNumber', title: '任务单号', type: 'text'},
    {key: 'eventType', title: '发生类别', type: 'text'},
    {key: 'responsibilityDefine', title: '责任定义', type: 'text'},
    {key: 'paymentWill', title: '客户支付意向', type: 'text'},
    {key: 'changeResponsibility', title: '变更责任', type: 'text'},
    {key: 'description', title: '详细说明', type: 'text'}
  ]
};

const config = {
  edit,
  index,
  pageSize: 10,
  pageSizeType: ['10', '20', '30', '40', '50']
};

export default config;
