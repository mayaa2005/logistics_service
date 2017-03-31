const changePayListCols =  [
  { key: 'status', title: '状态', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'changeOrderNo', title: '改单编号', align: "center", hide: false, sort: true, requireShow: true },
  { key: 'taskNo', title: '任务单号', align: "center", hide: false, sort: true, requireShow: true },
  { key: 'changeOrderReason', title: '改单原因', align: "center", hide: false, sort: true, requireShow: false},
  { key: 'settlement TotalNumber ', title: '结算总金额', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'operator', title: '操作人', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'operateTime', title: '操作时间', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'approver', title: '审核人', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'approveTime', title: '审核时间', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'remarks', title: '备注', align: "center", hide: false, sort: true, requireShow: false },
];

export default changePayListCols;
