const index = {
  title: '客户档案',
  active: ['未激活', '激活', '失效'],
  search: {
    config: {
      search: '搜索',
      more: '更多',
      less: '简化',
      reset: '重置'
    },
    filters: {
      customerCode: '客户编码',
      customerName: '客户名称',
      customerShortName: '客户简称',
      active: '激活状态'
    }
  },
  toolbar: [
    {key: 'add', title: '新增'},
    {key: 'edit', title: '编辑'},
    {key: 'delete', title: '删除'},
    {key: 'active', title: '激活'},
    {key: 'import', title: '导入'},
    {key: 'export', title: '导出'}
  ],
  table: [
    {key: 'customerCode', title: '客户编码'},
    {key: 'customerName', title: '客户名称'},
    {key: 'customerShortName', title: '客户简称'},
    {key: 'balanceWay', title: '结算方式'},
    {key: 'creditMoney', title: '信用金额'},
    {key: 'creditDays', title: '信用天数'},
    {key: 'isContract', title: '是否合同客户'},
    {key: 'contractStartTime', title: '合同生效日期'},
    {key: 'contractEndTime', title: '合同终止日期'},
    {key: 'active', title: '激活状态'},
    {key: 'institutionName', title: '归属法人代表'}
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
  subTitle: {
    baseForm: '基本信息',
    cooperationForm: '合作及计算信息',
    relationForm: '关联信息'
  },
  panels:[
    {key:'customerBaseInfo', title:'客户资料'},
    {key:'customerContact', title:'联系人档案'},
    {key:'customerFactory', title:'收发货人档案'},
    {key:'customerAgent', title:'代理跟进分配'},
    {key:'customerServiceDistribution', title:'客服分配'},
    {key:'customerTaxRate', title:'税率档案'}
  ],
  toolbar: [
    {key: 'add', title: '新增'},
    {key: 'active', title: '激活'},
    {key: 'invalid', title: '失效'}
  ],
  buttons:[
    {key: 'save', title: '保存', bsStyle: 'success'},
    {key: 'cancel', title: '取消', bsStyle: 'danger'}
  ],

  baseInfo:{
    baseForm: [
      {key: 'customerCode', label: '客户编码', type: 'text'},
      {key: 'customerName', label: '客户名称', type: 'text'},
      {key: 'customerShortName', label: '客户简称', type: 'text'},
      {key: 'customerEnglishName', label: '英文名称', type: 'text'},
      {key: 'customerHeaderInformation', label: '抬头信息', type: 'text'},
      {key: 'customerTelephone', label: '电话', type: 'text'},
      {key: 'customerFax', label: '传真', type: 'text'},
      {key: 'customerAddress', label: '详细地址', type: 'text'},
      {key: 'customerCreditCode', label: '公司信用代码', type: 'text'},
      {key: 'customerCountry', label: '国家', type: 'select', typeRelated:[{title:'中国', value:'china', url:'/api/basic/client/country/china'},{title:'英国', value:'english', url:''}]},
      {key: 'customerProvince', label: '省份', type: 'text'},
      {key: 'customerCity', label: '城市', type: 'text'},
      {key: 'customerDistrict', label: '行政区', type: 'text'},
      {key: 'customerStreet', label: '街道', type: 'text'},
      {key: 'customerLongitude', label: '经度', type: 'text'},
      {key: 'customerLatitude', label: '纬度', type: 'text'},
      {key: 'description', label: '公司描述', type: 'text'},
      {key: 'institutionGuid', label: '归属法人代表', type: 'text'}
    ],
    cooperationForm:[
      { key: 'isContract', label: '合同客户', type: 'radio', typeRelated:[{title:'是', value:1},{title:'否', value:0}] },
      { key: 'contractStartTime', label: '合同生效日期', type: 'date' },
      { key: 'contractEndTime', label: '合同终止日期', type: 'text' },
      { key: 'balanceWay', label: '结算方式', type: 'text' },
      { key: 'balanceCurrency', label: '结算币种', type: 'text' },
      { key: 'creditDays', label: '信用天数', type: 'text' },
      { key: 'creditMoney', label: '信用金额', type: 'text' },
      { key: 'advanceLimit', label: '垫付资金上限', type: 'text' },
      { key: 'checkAccountDeadlineTime', label: '对账截止日期', type: 'text' },
      { key: 'paymentTime', label: '付款日期', type: 'text' },
      { key: 'invoiceDescription', label: '发票说明', type: 'text' },
      { key: 'isNeedDebitNote', label: 'DEBIT NOTE', type: 'text' },
      { key: 'salesPersonGuid', label: '销售人员', type: 'text' }
    ],
    relationForm:[
      { key: 'supplierGuid', label: '关联供应商标识', type: 'text' },
      { key: 'isAgent', label: '代理', type: 'text' },
      { key: 'isInternalCompany', label: '内部公司', type: 'text' },
      { key: 'relationThreePartyCode', label: '内部系统客户标识', type: 'text' },
      { key: 'isOrderingCustomer', label: '接单客户', type: 'text' },
      { key: 'firstContractTime', label: '第一次合作时间', type: 'text' },
      { key: 'lastContractTime', label: '最后一次合作时间', type: 'text' },
      { key: 'active', label: '激活状态', type: 'text' }
    ]
  },
  customerContact: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'contactName', title: '联系人姓名', type: 'text'},
    {key: 'contactEnglishName', title: '英文名', type: 'text'},
    {key: 'contactSex', title: '性别', type: 'text'},
    {key: 'contactTelephone', title: '联系电话', type: 'text'},
    {key: 'contactMobile', title: '手机', type: 'text'},
    {key: 'contactFax', title: '传真', type: 'text'},
    {key: 'contactEmail', title: '邮箱', type: 'text'},
    {key: 'contactWeChatOpenId', title: '微信', type: 'text'},
    {key: 'contactPost', title: '职务', type: 'text'},
    {key: 'contactFortes', title: '特长', type: 'text'},
    {key: 'contactOrigin', title: '籍贯', type: 'text'},
    {key: 'contactBirthday', title: '生日', type: 'text'},
    {key: 'contactRemark', title: '备注', type: 'text'},
    {key: 'active', title: '激活状态', type: 'text'},
    {key: 'customerContactType', title: '联系人类别', type: 'text'}
  ],
  customerFactory: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'factoryName', title: '名称', type: 'text'},
    {key: 'factoryShortName', title: '简称', type: 'text'},
    {key: 'factoryEnglishName', title: '国家', type: 'text'},
    {key: 'factoryProvince', title: '省份', type: 'text'},
    {key: 'factoryCity', title: '城市', type: 'text'},
    {key: 'factoryDistrict', title: '行政区', type: 'text'},
    {key: 'factoryStreet', title: '街道', type: 'text'},
    {key: 'factoryAddress', title: '地址', type: 'text'},
    {key: 'factoryChargingPlaceId', title: '计费地点', type: 'text'},
    {key: 'factoryLongitude', title: '经度', type: 'text'},
    {key: 'factoryLatitude', title: '纬度', type: 'text'},
    {key: 'isConsignee', title: '是否收货人', type: 'text'},
    {key: 'isConsignor', title: '是否发货人', type: 'text'},
    {key: 'isNotify', title: '是否通知人', type: 'text'},
    {key: 'isCustoms', title: '是否报关行', type: 'text'},
    {key: 'isWarehouseAddress', title: '是否交舱地址', type: 'text'},
    {key: 'isTailPaperAddress', title: '是否尾址地址', type: 'text'},
    {key: 'headerInformation', title: '公司抬头', type: 'text'},
    {key: 'factoryContactName', title: '联系人', type: 'text'},
    {key: 'factoryContactTelephone', title: '联系人电话', type: 'text'},
    {key: 'factoryContactFax', title: '联系人传真', type: 'text'},
    {key: 'factoryContactEmail', title: '联系人邮箱', type: 'text'},
    {key: 'mapFile', title: '地图文件', type: 'text'},
    {key: 'active', title: '激活状态', type: 'text'},
  ],
  customerAgent: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'agentGuid', title: '海外代理', type: 'text'},
    {key: 'agentUserGuid', title: '海代跟进人员', type: 'text'},
    {key: 'active', title: '激活状态', type: 'text'}
  ],
  customerServiceDistribution: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'customerUserGUID', title: '客服人员', type: 'text'},
    {key: 'formulaGuid', title: '物流分子式', type: 'text'},
    {key: 'active', title: '激活状态', type: 'text'}
  ],
  customerTaxRate: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'taxRate', title: '税率', type: 'text'},
    {key: 'taxWay', title: '计税方式', type: 'text'},
    {key: 'startDate', title: '开始日期', type: 'text'},
    {key: 'endDate', title: '结束日期', type: 'text'},
    {key: 'active', title: '激活状态', type: 'text'}
  ]
};

const config = {
  edit,
  index,
  pageSize: 10,
  pageSizeType: ['10', '20', '30', '40', '50']
};

export default config;
