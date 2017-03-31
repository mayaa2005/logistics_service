const baseInfo= {
  children: {
    order:'物流订单号：',
    jobNo:'作业单号：',
    jobUnit:'作业单元：',
    changeOrderResponsibility:'改单责任方：',
    changeOrderReason:'改单原因：',
    status:'状态：',
    applicant :'申请人：',
    applyTime:'申请时间：',
    remarks1:'备注：',
  }
};
const detailTable= {
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

const changeReceiveEditUIInfo={
  saveBtn: '保存',
  cancelBtn: '取消',
  submitBtn: '提交',

  new: '新增',
  newBtn: '新增',
  copyNewBtn: '复制新增',
  editBtn: '编辑',
  deleteBtn: '删除',
  importBtn: '导入',
  checkBtn: '审核',
  outCheckBtn: '撤销审核',

  changeOrderNo:'改单编号：',

  baseInfo:baseInfo,
  detailTable: detailTable,
};

export default changeReceiveEditUIInfo;
