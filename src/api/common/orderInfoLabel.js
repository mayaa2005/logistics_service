
const baseInfo= {
  titleName: '基本信息',
  children: {
    customerGuid: '委托客户',
    contactGuid: '客户联系人',
    contactTelephone: '客户联系电话',
    contactEmail: '联系人邮箱',
    customerDelegateCode: '客户委托号',
    referenceNumber: '委托参考号码',
    specifyCustomerGuid: '指定委托方',
    paymentCustomerGuid: '付款客户',
    contractNumber: '合约号',
    salesPersonName: '业务员'
  }
};
const goodsInfo= {
  titleName: '货物信息',
  children: {
    chineseName: '中文品名',
    englishName:'英文品名',
    number: '数量',
    packingUnit: '包装单位',
    size: '体积',
    allWeight: '毛重',
    goodsPrice: '货物价值',
    cardBoardSize: '卡板尺寸',
    mark: '唛头',
    description: '附加说明',
    goodsType: '货物类别',
    coldRequirement: '打冷要求',
    placeRequirement: '货物固定要求',
    dangerLevel: '危险品级别',
    dangerInfo: '危标信息',
    specifications: '规格要求'
  }
};
const serviceType= {
  titleName: '服务类型',
  children: {
    domesticTransport: '国内运输',
    portTransportIn: '中港运输进口',
    portTransportOut: '中港运输出口',
    portLocalTransport: '中港本地运输',
    bookingTransport: '代订舱',
    bondedTransport: '保税运输',
    railwayTransport: '铁路运输',
    seaTransport: '海运运输',
    airTransport: '空运运输',
    toDO: '转DO',
    delegateOption: '代办操作',
    coastalTrade: '沿海内贸',
    portTransport: '港口运输'
  }
};

const domesticTransport= {
  titleName: '国内运输',
  children: {
    bookingNumber: '交货或入仓号码',
    signDocuments: '签收单证要求',
    additionalDescription: '签收单证其他要求',
    goodsPrice: '货物价值',
    cargoRemark: '摆货要求',
    transportationMode: '运输模式',
    multiAddress: '多点提送货',
    requireGoodsInfo: '需要货物明细'
  }
};
const portTransportIn = {
  titleName: '中港运输进口',
  children: {
    loadGoodsDate: '装货日期',
    openStoreDate: '开仓日期',
    loadGoodsCompany: '装货公司名称',
    loadContactPerson: '联系人',
    loadPhone: '电话',
    loadAttention: '装货注意事项',
    unloadGoodsCompany: '卸货公司名称',
    unloadGoodsAddress: '地址',
    unloadContactPerson: '联系人',
    unloadPhone: '电话',
    unloadAttention: '卸货注意事项',
    goodsBLNO: 'BLNO',
    placeTailRequire: '摆尾要求',
    isSpeedOrder: '是否急单',
    originCountry: '原产国',
    declareWay: '报关方式',
    clientLandDeclare: '客户大陆自报关',
    landDeclare: '大陆报关行',
    landContactPerson: '大陆报关行联系人',
    landPhone: '大陆报关行联系电话',
    clientHKDeclare: '客户香港自报关',
    hkDeclare: '香港报关行',
    hkContactPerson: '香港报关行联系人',
    hkPhone: '香港报关行联系电话',
    entryPort: '进境地口岸',
    quarantineWay: '检疫方式',
    seamless: '无缝清关',
    roadCabin: '公路舱单',
    otherAttention: '其他注意事项'
  }
};
const portTransportOut = {
  titleName: '中港运输出口',
  children: {
    loadGoodsDate: '装货日期',
    closePassesDate: '截关日期',
    loadGoodsCompany: '装货公司名称',
    loadGoodsAddress: '地址',
    loadContactPerson: '联系人',
    loadPhone: '电话',
    loadAttention: '装货注意事项',
    unloadGoodsCompany: '卸货公司名称',
    unloadContactPerson: '联系人',
    unloadPhone: '电话',
    unloadAttention: '卸货注意事项',
    goodsSONO: 'SONO',
    placeTailRequire: '摆尾要求',
    isOwnCabinet: '是否自备柜',
    isSpeedOrder: '是否急单',
    isTransportCompanyUnload: '是否运输公司卸货',
    declareWay: '报关方式',
    clientLandDeclare: '客户大陆自报关',
    landDeclare: '大陆报关行',
    landContactPerson: '大陆报关行联系人',
    landPhone: '大陆报关行联系电话',
    clientHKDeclare: '客户香港自报关',
    hkDeclare: '香港报关行',
    hkContactPerson: '香港报关行联系人',
    hkPhone: '香港报关行联系电话',
    entryPort: '进境地口岸',
    seamless: '无缝清关',
    roadCabin: '公路舱单',
    otherAttention: '其他注意事项'
  }
};
const portLocalTransport = {
  titleName: '中港本地运输',
  children: {
    getOrSend: '提货/派送',
    loadGoodsDate: '装货日期',
    closePassesDate: '截关/仓日期',
    companyName: '装/卸货公司名称',
    address: '地址',
    phone: '电话',
    goodsAttention: '装/卸货注意事项',
    storeHouse: '装/卸货仓库',
    storeContactPerson: '联系人',
    storePhone: '仓库电话',
    storeAttention: '注意事项',
    goodsSONO: 'SONO',
    getOrderNumber: '提单号码',
    placeTailRequire: '摆尾要求',
    isSpeedOrder: '是否急单',
    isChangeDO: '是否换DO',
    orderSend: '签收单送交',
    isDelegatePay: '是否代垫',
    otherAttention: '其他注意事项'
  }
};
const bookingTransport = {
  titleName: '代订舱',
  children: {
    delegate: '订舱代理',
    shipCompany: '船公司',
    closePassesDate: '截关/仓日期',
    preOutGoodsDate: '预计出货日期',
    boatName: '船名',
    voyage: '航次',
    startPort: '起运港',
    destinationPort: '目的港',
    seaTransportRule: '海运运输条款',
    getOrderType: '提单类型',
    consignor:'发货人',
    consignorHead: '发货人抬头',
    consignee: '收货人',
    consigneeHead: '收货人抬头',
    notifier: '通知人',
    notifierHead: '通知人抬头'
  }
};
const bondedTransport = {
  titleName: '保税运输',
  children: {
    originAddress:  '起运地',
    destination:  '目的地'
  }
};
const railwayTransport = {
  titleName: '铁路运输',
  children: {
    preStartTime: '预计装运时间',
    preArriveTime: '预计到达时间',
    startStation: '起运站',
    startStationDescription: '起运站描述',
    endStation: '目的站',
    endStationDescription: '目的站描述',
    destination:  '目的地',
    destinationDescription: '目的地描述',
    consignor:'发货人',
    consignorHead: '发货人抬头',
    consignee: '收货人',
    consigneeHead: '收货人抬头',
    payWay: '付款方式',
    otherDescription: '附加说明'
  }
};
const seaTransport = {
  titleName: '海运运输',
  children: {
    startPort: '起运港',
    startPortDescription: '起运港描述',
    endPort: '目的港',
    endPortDescription: '目的港描述',
    destination:  '目的地',
    destinationDescription: '目的地描述',
    transportDirection: '运输方向',
    isBackGoods: '是否退运货物',
    shipCompany: '船公司',
    closePassesDate: '截关/仓日期',
    boatName: '船名',
    voyage: '航次',
    preGoTime: '预计开船时间',
    preArriveTime: '预计到港时间',
    consignor:'发货人',
    consignorHead: '发货人抬头',
    consignee: '收货人',
    consigneeHead: '收货人抬头',
    notifier: '通知人',
    notifierHead: '通知人抬头',
    isTradeCompany: '收货人是否贸易公司',
    seaTransportRule: '运输条款',
    getOrderType: '提单类型',
    payWay: '付款方式',
    transportWay: '运输模式'
  }
};
const airTransport = {
  titleName: '空运运输',
  children: {
    startStation: '起运机场',
    startStationDescription: '起运机场描述',
    endStation: '目的机场',
    endStationDescription: '目的机场描述',
    destination:  '目的地',
    destinationDescription: '目的地描述',
    transportDirection: '运输方向',
    airCompany: '航空公司',
    preGoTime: '预计起飞时间',
    preArriveTime: '预计到达时间',
    payWay: '付款方式',
    flightNumber: '航班号',
    consignor:'发货人',
    consignorHead: '发货人抬头',
    consignee: '收货人',
    consigneeHead: '收货人抬头',
    notifier: '通知人',
    notifierHead: '通知人抬头',
    file: '航空随机文件',
    airTransportRule: '空运运输条款',
    goodsSize: '货物尺寸'
  }
};
const toDO = {
  titleName: '转DO',
  children: {
    shipCompany: '船公司',
    boatName: '船名',
    voyage: '航次',
    startPort: '起运港',
    destinationPort: '目的港',
    preGoTime: '预计开船时间',
    preArriveTime: '预计到港时间',
    orderNumber: '提单号',
    supplier: '放正本D/O供应商',
    cabinetNumber: '柜号',
    changeDONumber: '换DO单数',
    isDelegatePay: '是否需要代垫款',
    otherDescription: '附加说明'
  }
};
const delegateOption = {
  titleName: '代办操作',
  children: {
    serviceType: '代办服务类型'
  }
};
const coastalTrade = {
  titleName: '沿海内贸',
  children: {
    startPort: '起运港',
    destinationPort: '目的港',
    destination:  '目的地',
    loadGoodsDate: '装货日期',
    boatName: '船名',
    voyage: '航次',
    loadFactory: '装货工厂',
    loadAddress: '装货地址',
    loadContactPerson: '装货联系人',
    loadPhone: '装货联系电话',
    receiver: '收货人',
    receiveAddress: '收货地址',
    receiveContactPerson: '收货联系人',
    receivePhone: '收货联系电话',
    otherDescription: '附加说明'
  }
};
const portTransport = {
  titleName: '港口运输',
  children: {
    transportType: '运输类型',
    outInType: '进出口类型',
    bookingNumber: '订舱号码',
    port: '港口',
    shipCompany: '船公司',
    closePassesDate: '截关/仓时间',
    closeFeedingDate: '截补料时间',
    openStoreDate: '开仓时间',
    isNeedCross: '是否需要渡柜',
    crossDate: '渡柜日期',
    declareWay: '报关方式',
    closeDeclareAddress: '封关地点',
    clientDeclareSelf: '客户自报关',
    declarePlace: '报关行',
    declareContactPerson: '报关行联系人',
    declarePhone: '报关行联系电话',
    multiPlace: '多点装卸货'
  }
};

const goodsInfoTable= {
  titleName: '货物明细',
  addRowBtn: '新增行',
  goodsSplitBtn: '货量拆分',
  jobSplitBtn: '作业单拆分',
  tableCols: {
    index: '序号',
    poNumber: 'PO号码',
    supplier: '供货商',
    meterialCode: '物料编码',
    hsCode: '商品/HS编码',
    itemName: '商品名称',
    barcode: '商品条码',
    batchNumber : '批次号',
    manufactureDate : '生产日期',
    itemNumber: '货号',
    boxNumber: '箱数',
    packageNumber: '件数',
    itemVolume: '体积',
    itemweight: '重量',
    option: '操作',
    deleteBtn: '删除'
  }
};
const cabinetInfoTable= {
  titleName: '车/柜型柜量',
  addRowBtn: '新增行',
  tableCols: {
    index: '序号',
    cabinetCategoryGuid: '车/柜量',
    cabinetCount: '数量',
    cabinetWeight: '重量',
    cabinetVolume: '体积',
    option: '操作',
    deleteBtn: '删除'
  }
};

const loadSendAddressTable= {
  titleName: '装送货地址',
  addRowBtn: '新增行',
  tableCols: {
    index: '序号',
    pickupDate: '要求装货时间',
    consigneeGuid: '装货地址',
    consigneeContact: '装货联系人',
    consigneeContactTel: '装货联系人电话',
    deliveryDate: '要求送货时间',
    consignorGuid: '送货地址',
    consignorContact: '送货联系人',
    consignorContactTel: '送货联系人电话',
    option: '操作',
    deleteBtn: '删除'
  }
};

const loadSendAddressTable2= {
  titleName: '装/卸送货地址',
  addRowBtn: '新增行',
  tableCols: {
    index: '序号',
    requireTime: '要求装/卸货时间',
    factory: '装/卸货工厂',
    firstAddress: '装/卸货地址',
    firstContactPerson: '装/卸货联系人',
    firstPersonPhone: '装/卸货联系人电话',
    secondAddress: '卸/装货地址',
    secondContactPerson: '卸/装货联系人',
    secondPersonPhone: '卸/装货联系人电话',
    option: '操作',
    deleteBtn: '删除'
  }
};
const orderInfo = {
  title: '新增',
  saveBtn: '保存',
  cancelBtn: '取消',
  submitBtn: '提交',
  baseInfo: baseInfo,
  goodsInfo: goodsInfo,
  serviceType: serviceType,
  domesticTransport: domesticTransport,
  portTransportIn: portTransportIn,
  portTransportOut: portTransportOut,
  portLocalTransport: portLocalTransport,
  bookingTransport: bookingTransport,
  bondedTransport: bondedTransport,
  railwayTransport: railwayTransport,
  seaTransport: seaTransport,
  airTransport: airTransport,
  toDO: toDO,
  delegateOption: delegateOption,
  coastalTrade: coastalTrade,
  portTransport: portTransport,
  goodsInfoTable: goodsInfoTable,
  cabinetInfoTable: cabinetInfoTable,
  loadSendAddressTable: loadSendAddressTable,
  loadSendAddressTable2: loadSendAddressTable2
};

export default orderInfo;
