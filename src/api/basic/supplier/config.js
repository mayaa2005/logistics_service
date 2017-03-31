const index = {
  title: '供应商档案',
  active: ['未激活', '已激活', '已失效'],
  search: {
    config: {
      search: '搜索',
      more: '更多',
      less: '简化',
      reset: '重置'
    },
    filters: [
      {key: 'supplierCode', title: '供应商代码', type: 'text'},
      {key: 'supplierName', title: '中文名称', type: 'text'},
      {key: 'active', title: '状态', type: 'text'}
    ]
  },
  toolbar: [
    {key: 'add', title: '新增', bsStyle: 'primary'},
    {key: 'edit', title: '编辑'},
    {key: 'del', title: '删除'},
    {key: 'active', title: '激活'},
    {key: 'input', title: '导入'},
    {key: 'output', title: '导出'}
  ],
  table: [
    {key: 'supplierCode', title: '供应商代码'},
    {key: 'active', title: '状态'},
    {key: 'supplierName', title: '中文名称'},
    {key: 'supplierEnglishName', title: '英文名称'},
    {key: 'supplierCreditCode', title: '公司信用代码'},
    {key: 'isContract', title: '签署合同'},
    {key: 'contractStartDate', title: '合同生效日'},
    {key: 'contractEndDate', title: '合同到期日'},
    {key: 'balanceMode', title: '结算方式'},
    {key: 'creditDay', title: '信用天数'}
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

const contact = [
  {key: 'checked', title: '', type: 'checkbox'},
  {key: 'index', title: '序号', type: 'index'},
  {key: 'supplierContactName', title: '联系人姓名', type: 'text'},
  {key: 'supplierContactEnglishName', title: '英文名', type: 'text'},
  {key: 'contactSex', title: '性别', type: 'text'},
  {key: 'contactTelephone', title: '联系电话', type: 'text'},
  {key: 'contactMobile', title: '手机', type: 'text'},
  {key: 'contactFax', title: '传真', type: 'text'},
  {key: 'contactEmail', title: '电子邮件', type: 'text'},
  {key: 'contactWeChatOpenid', title: '微信', type: 'text'},
  {key: 'contactPosition', title: '职务', type: 'text'},
  {key: 'contactSpeciality', title: '特长', type: 'text'},
  {key: 'contactNativePlace', title: '籍贯', type: 'text'},
  {key: 'contactBirthday', title: '生日', type: 'text'},
  {key: 'remark', title: '备注', type: 'text'},
  {key: 'supplierContactType', title: '联系人类别', type: 'text'},
  {key: 'active', title: '激活状态', type: 'text'}
];

const job = [
  {key: 'checked', title: '', type: 'checkbox'},
  {key: 'index', title: '序号', type: 'index'},
  {key: 'taskUnitTypeGuid', title: '作业单元', type: 'select'}
];

const car = [
  {key: 'checked', title: '', type: 'checkbox'},
  {key: 'index', title: '序号', type: 'index'},
  {key: 'carNumber', title: '车牌号', type: 'text'},
  {key: 'crossBorderCarNumber', title: '跨境车牌', type: 'text'},
  {key: 'icCardNumber', title: 'IC卡号', type: 'text'},
  {key: 'customsNumber', title: '海关号码', type: 'text'},
  {key: 'driver', title: '司机姓名', type: 'text'},
  {key: 'mainlandPhone', title: '司机电话', type: 'text'},
  {key: 'crossBorderPhone', title: '跨境电话', type: 'text'},
  {key: 'companyHeader', title: '车辆抬头公司', type: 'text'},
  {key: 'companyHeaderAddress', title: '牌头地址', type: 'text'},
  {key: 'companyHeaderContactPeople', title: '牌头联系人', type: 'text'},
  {key: 'companyHeaderContactPhone', title: '牌头联系电话', type: 'text'},
  {key: 'carWeight', title: '车身重量', type: 'text'},
  {key: 'companyCode', title: '企业代码', type: 'text'},
  {key: 'otherRemark', title: '其他说明', type: 'text'},
  {key: 'active', title: '激活状态', type: 'text'}
];

const driver = [
  {key: 'checked', title: '', type: 'checkbox'},
  {key: 'index', title: '序号', type: 'index'},
  {key: 'driver', title: '司机姓名', type: 'text'},
  {key: 'driverIdcardNumber', title: '司机身份证', type: 'text'},
  {key: 'driverEnglishName', title: '英文名', type: 'text'},
  {key: 'mainlandPhone', title: '大陆电话', type: 'text'},
  {key: 'crossBorderPhone', title: '跨境电话', type: 'text'},
  {key: 'otherRemark', title: '其他说明', type: 'text'},
  {key: 'active', title: '激活状态', type: 'text'}
];

const rate = [
  {key: 'checked', title: '', type: 'checkbox'},
  {key: 'index', title: '序号', type: 'index'},
  {key: 'chargeItemGuid', title: '费用名称', type: 'select'},
  {key: 'taxRate', title: '税率', type: 'text'},
  {key: 'taxMode', title: '计税方式', type: 'select'},
  {key: 'oilRatio', title: '油卡比例', type: 'text'},
  {key: 'startDate', title: '开始日期', type: 'text'},
  {key: 'endDate', title: '结束日期', type: 'text'},
  {key: 'active', title: '激活状态', type: 'text'}
];

const radios = [
  {value: 'yes', title: '是'},
  {value: 'no', title: '否'}
];

const country = [
  {value: 'China', title: '中国'},
  {value: 'English', title: '英国'},
  {value: 'American', title: '美国'}
];

const controls = [
  {key: 'supplierCode', title: '供应商代码', type: 'text'},
  {key: 'supplierName', title: '中文名称', type: 'text'},
  {key: 'supplierShortName', title: '简称', type: 'text'},
  {key: 'supplierEnglishName', title: '英文名称', type: 'text'},
  {key: 'customerCode', title: '客户编码', type: 'text'},
  {key: 'supplierCreditCode', title: '公司信用代码', type: 'text'},
  {key: 'supplierCountry', title: '国家', type: 'select', option: country},
  {key: 'supplierProvince', title: '省份', type: 'select'},
  {key: 'supplierCity', title: '城市', type: 'select'},
  {key: 'supplierDistrict', title: '行政区', type: 'text'},
  {key: 'supplierStreet', title: '街道', type: 'text'},
  {key: 'supplierAddress', title: '地址', type: 'text'},
  {key: 'isContract', title: '签署合同', type: 'radio', option: radios},
  {key: 'contractStartDate', title: '合同生效日', type: 'text'},
  {key: 'contractEndDate', title: '合同到期日', type: 'text'},
  {key: 'balanceMode', title: '结算方式', type: 'select'},
  {key: 'creditDay', title: '信用天数', type: 'text'},
  {key: 'active', title: '状态', type: 'select'},
  {key: 'isAgent', title: '代理', type: 'radio', option: radios},
  {key: 'isInternal', title: '内部公司', type: 'radio', option: radios},
  {key: 'internationalCode', title: '国际代码', type: 'text'},
  {key: 'relationThirdPartyCode', title: '资源管理系统编码', type: 'select'},
  {key: 'firstTime', title: '第一次合作时间', type: 'text'},
  {key: 'lastTime', title: '最后一次合作时间', type: 'text'},
  {key: 'supplierDescription', title: '供应商描述', type: 'text'},
  {key: 'isTrailerCompany', title: '拖车公司', type: 'radio', option: radios},
  {key: 'isSeaBookingAgent', title: '海运订舱代理', type: 'radio', option: radios},
  {key: 'isSeaCompany', title: '船公司', type: 'radio', option: radios},
  {key: 'isAirBookingAgent', title: '空运订舱代理', type: 'radio', option: radios},
  {key: 'isAirCompany', title: '航空公司', type: 'radio', option: radios},
  {key: 'isCustomsBroker', title: '报关行', type: 'radio', option: radios},
  {key: 'isRailBookingAgent', title: '铁路订舱代理', type: 'radio', option: radios},
  {key: 'isRailCompany', title: '铁路公司', type: 'radio', option: radios},
  {key: 'isCommissionCompany', title: '代办公司', type: 'radio', option: radios}
];

const buttons2 = [
  {key: 'add', title: '新增'}
];

const buttons4 = [
  {key: 'add', title: '新增'},
  {key: 'active', title: '激活'},
  {key: 'inactive', title: '失效'}
];

const edit = {
  title: '新增',
  parts: [
    {key: 'supplierInfo', title: '供应商资料', type: 'form', controls},
    {key: 'supplierContact', title: '供应商联系人', type: 'table', cols: contact, buttons: buttons4},
    {key: 'supplierTaskUnitType', title: '供应商合作作业单元', type: 'table', cols: job, buttons: buttons2},
    {key: 'supplierCarInfo', title: '车辆档案', type: 'table', cols: car, buttons: buttons4},
    {key: 'supplierDriverInfo', title: '司机档案', type: 'table', cols: driver, buttons: buttons4},
    {key: 'supplierTaxRate', title: '税率档案', type: 'table', cols: rate, buttons: buttons4}
  ],
  footer: {
    save: '保存',
    cancel: '取消'
  }
};

const config = {
  index,
  edit,
  pageSize: 10,
  pageSizeType: ['10', '20', '30', '40', '50']
};

export default config;
