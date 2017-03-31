const settleListCols =  [
  { key: 'status', title: '当前状态', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'documentNo', title: '单据编号', align: "center", hide: false, sort: true, requireShow: true },
  { key: 'order', title: '物流订单号', align: "center", hide: false, sort: true, requireShow: true },
  { key: 'proxy', title: '客户委托号', align: "center", hide: false, sort: true, requireShow: false},
  { key: 'incomeTotalNumber ', title: '应收总金额', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'operator', title: '操作人', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'operateTime', title: '操作时间', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'approver', title: '审批人', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'approveTime', title: '审批时间', align: "center", hide: false, sort: true, requireShow: false },
];

export default settleListCols;
