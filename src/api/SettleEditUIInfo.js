
const detailTable= {
  //titleName: '应收明细信息',
  tableCols: {
    index: '序号',
    costType: '费用类型',
    businessAttribute: '业务属性',
    costName: '费用名称',
    accountUnit: '结算单位',
    taxWay: '计税方式',
    price: '单价',
    quantity: '数量',
    rate: '税率',
    tax: '税额',
    netPrice: '净价',
    incomeNumber: '应收金额',
    remarks: '备注',
  }
};

const settleEditUIInfo={
  saveBtn: '保存',
  cancelBtn: '取消',
  submitBtn: '提交',

  documentNo:'单据单号：',
  order:'物流单号：',
  customer:'客户名称：',
  startPlace:'始发地：',
  destination:'目的地：',
  weight:'重量：',
  volume:'体积：',
  status:'状态：',
  operator:'操作人：',
  operateTime:'操作时间：',
  alterMen:'修改人：',
  alterTime:'修改时间：',
  remarks1:'备注：',

  detailTable: detailTable,
};

export default settleEditUIInfo;
