
const orderListCols =  [
  { key: 'proxy', title: '客户委托号', align: "center", hide: false, sort: true, requireShow: false},
  { key: 'order', title: '物流订单号', align: "center", hide: false, sort: true, requireShow: true },
  { key: 'status', title: '当前状态', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'client', title: '客户', align: "center", hide: false, sort: true, requireShow: true },
  { key: 'type', title: '进出类型', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'loadAddress', title: '装货地', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'destination', title: '目的地', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'loadTime', title: '要求装货时间', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'sendTime', title: '要求送货时间', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'brand', title: '品名', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'company', title: '包装单位', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'piece', title: '件量', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'weight', title: '重量', align: "center", hide: false, sort: true, requireShow: false },
  { key: 'volume', title: '体积', align: "center", hide: false, sort: true, requireShow: false },
];

export default orderListCols;
