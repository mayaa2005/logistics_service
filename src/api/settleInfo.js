
const detailTable= [
  {
    costType: '费用类型',
    businessAttribute: '业务属性',
    costName: '费用名称',
    accountUnit: '结算单位',
    taxWay: '计税方式',
    price: '1',
    quantity: '100',
    rate: '0.1',
    tax: '10',
    netPrice: '1000',
    incomeNumber: '10000',
    remarks: '备注'
  }
];

const settleInfo = {
  //基本信息字段值
  settleID:'2017-03-10',

  documentNo:'EC-20170310-0001',
  order:'WL-20170310-0001',
  customer:'恒康达国际',
  startPlace:'深圳',
  destination:'目的地：',
  weight:'20',
  volume:'200',
  status:'状态：',
  operator:'操作人：',
  operateTime:'操作时间：',
  alterMen:'修改人：',
  alterTime:'修改时间：',
  remarks1:'备注：',


  detailTable: detailTable,

};

export default settleInfo;
