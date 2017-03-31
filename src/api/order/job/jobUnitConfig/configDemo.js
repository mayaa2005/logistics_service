/*
*   国内整车运输
*/

//form元素的具体配置参考组件SuperFormGroup的用法说明
const baseForm = {
  groupKey: 'dataKey',
  items: [
    {key: 'customerCode', label: '客户编码', type: 'text', bRequired: true},
    {key: 'customerCountry', label: '国家', type: 'select', typeRelated:[{title:'中国', value:'china', url:'/api/basic/client/country/china'},{title:'英国', value:'english', url:''}]},
    {key: 'isContract', label: '合同客户', type: 'radio', typeRelated:[{title:'是', value:1},{title:'否', value:0}]},
    {key: 'contractStartTime', label: '合同生效日期', type: 'date'},
    {key: 'description', label: '备注', type: 'text'}
  ],
  values: {}
};
const goodsForm = {
  groupKey: 'dataKey',
  items: [
    {key: 'key1', label: '字段1', type: 'text', bRequired: true},
    {key: 'key2', label: '字段2', type: 'text', bRequired: true},
    {key: 'key3', label: '字段3', type: 'text', bRequired: true},
    {key: 'key4', label: '字段4', type: 'text', bRequired: true},
    {key: 'key5', label: '字段5', type: 'text', bRequired: true}
  ],
  values: {}
};

//cols的具体配置参数参考组件SuperTable2的用法说明
const cabinetTable = {
  items:[],
  cols: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'contactName', title: '联系人姓名', type: 'text'},
    {key: 'contactEnglishName', title: '英文名', type: 'text'},
    {key: 'contactSex', title: '性别', type: 'text'}
  ]
};
const addressTable = {
  items:[],
  cols: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'contactName', title: '联系人姓名', type: 'text'},
    {key: 'contactEnglishName', title: '英文名', type: 'text'},
    {key: 'contactSex', title: '性别', type: 'text'}
  ]
};
const serviceTable = {
  items:[],
  cols: [
    {key: 'checked', title: '', type: 'checkbox'},
    {key: 'index', title: '序号', type: 'index'},
    {key: 'contactName', title: '联系人姓名', type: 'text'},
    {key: 'contactEnglishName', title: '英文名', type: 'text'},
    {key: 'contactSex', title: '性别', type: 'text'}
  ]
};
const cabinetBtn = [
  {key:'add', title:'新增行', bsStyle:'primary'}, //bsStyle默认为primary可不写
  {key:'delete', title:'删除'}
];
const addressBtn = [
  {key:'add', title:'新增行'},
  {key:'delete', title:'删除'}
];
const serviceBtn = [
  {key:'add', title:'新增行'},
  {key:'delete', title:'删除'},
  {key:'count', title:'核算增值费用'}
];
const optionBtn = [
  {key:'save', title:'保存', bsStyle:'success'},
  {key:'cancel', title:'取消', bsStyle:'danger'}
];

//section的具体配置参考组件JobUnit的用法说明
const configDemo = {
  title: '国内整车运输',
  jobKey: 'L00',
  sections: [
    {key: 'baseInfo', title:'基本信息', type:'form', typeRelated: baseForm},
    {key: 'goodsInfo', title:'货量信息', type:'form', typeRelated: goodsForm},
    {key: 'cabinet', title:'车型/车量', type:'table', typeRelated: cabinetTable, buttons: cabinetBtn},
    {key: 'address', title:'装送货地址', type:'table', typeRelated: addressTable, buttons: addressBtn},
    {key: 'service', title:'增值服务', type:'table', typeRelated: serviceTable, buttons: serviceBtn},
    {key: 'operation', type:'operation', buttons: optionBtn}
  ]
};

export default configDemo;
