
const orderInfo = {
  orderBaseInfo:
  {
    logisticsOrderNumber:"物流订单号",
    customerGuid:"委托客户GUID",
    contactGuid:"客户联系人GUID",
    contactName:"联系人名称",
    contactTelephone:"联系人电话",
    contactEmail:"联系人Email",
    customerDelegateCode: "客户委托号",
    referenceNumber: "委托参考号码",
    specifyCustomerGuid:"指定委托方GUID",
    paymentCustomerGuid:"付款客户GUID",
    canvassionMode:"揽货方式",
    contractNumber: "合约号",
    agentGuid:"代理GUID",
    goodsName: "中文品名",
    goodsEnName: "英文品名",
    goodsCount: "数量",
    packUnit: "包装单位",
    goodsVolume: "体积",
    roughWeight: "重量",
    goodsValue: "货物价值",
    orderStatus:  "草稿"
  },
  serviceTypeList: [
    {
      serviceTypeGuid: "nativeTransport",
      serviceContent:
      {
        bookingNumber: "交货或入仓号码",
        destination: "目的地",
        signDocuments: "签收单证要求",
        additionalDescription: "签收单证其他要求",
        cargoRemark: "摆货要求",
        transportationMode: "运输模式（整车/整柜/散货）",
        addressInfoList: [
          {
            pickupDate:"装货时间",
            consigneeGuid:"装货地址(客户联系人GUID)",
            consigneeContactAddr:"装货地址",
            consigneeContact:"装货联系人",
            consigneeContactTel:"装货联系人电话",
            deliveryDate:"要求送货时间",
            consignorGuid:"收货地址(客户联系人GUID)",
            consignorContactAddr:"装货地址",
            consignorContact:"装货联系人",
            consignorContactTel:"装货联系人电话"
          }
        ]
      }
    }
  ],
  goodsDetailList:
    [
      {
        poNumber: "PO号码",
        supplier: "供货商",
        meterialCode: "物料编码",
        hsCode: "商品/HS编码",
        itemName: "商品名称",
        barcode: "商品条码",
        batchNumber: "批次号",
        manufactureDate: "生产日期",
        itemNumber: "货号",
        boxNumber: "箱数",
        packageNumber: "件数",
        itemVolume: "体积",
        itemweight: "重量"
      }
    ],
  cabinetTypeList:
    [
      {
        cabinetCategoryGuid: "车/柜型GUID",
        cabinetCount: "数量",
        cabinetWeight: "重量",
        cabinetVolume: "体积"
      }
    ]
}

export default orderInfo;
