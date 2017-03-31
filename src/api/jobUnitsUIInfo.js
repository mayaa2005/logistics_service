
const portInfo = {
  titleName: '港口信息',
  children: {
    startPort: '起运港',
    startPortDescription: '起运港描述',
    destinationPort: '目的港',
    destinationPortDescription: '目的港描述',
    middlePort: '中转港',
    middlePortDescription: '中转港描述',
    destination:  '目的地',
    destinationDescription: '目的地描述',
  }
};

const bookingInfo = {
  titleName: '订舱信息',
  children: {
    shipCompany: '船公司',
    shipName: '船名称',
    voyage: '航次',
    closePassesDate: '截关日期',
    expectSailDate: '预计开船日期',
    expectArriveDate: '预计到港日期',
    clientPayWay: '客户付款方式',
    transportProvisions: '运输条款',
    clientBillType: '客户提单类型',
  }
};

const goodsInfo = {
  titleName: '货物信息',
  children: {
    englishName:'英文品名',
    chineseName: '中文名称',
    numbers: '数量',
    mark: '唛头',
    packingUnit: '包装单位',
    allWeight: '毛重',
    size: '体积',
    netWeight: '净重',
    description: '附加说明',
  }
};

const contactInfo = {
  titleName: '联系信息',
  children: {
    consignor:'发货人',
    consignorHead: '发货人抬头',
    consignee: '收货人',
    consigneeHead: '收货人抬头',
    notifier: '通知人',
    notifierHead: '通知人抬头',
    agent: '代理人',
    agentHead: '代理人抬头',
  }
};

const jobUnitsUIInfo =[
  {
    key: '001',
    name: '海运散货出口非指定-委托',
    labels: {
      portInfo: portInfo,
      bookingInfo: bookingInfo,
      goodsInfo: goodsInfo,
      contactInfo: contactInfo,
    }
  },
  {
    key: '002',
    name:'海运整柜进口委托',
    labels: {
      portInfo:portInfo,
    }
  }
];

export default jobUnitsUIInfo;
