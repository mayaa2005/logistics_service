
const data = {
  returnCode: 0,
  returnMsg: '成功',
  returnTotalItem: 200,
  extraChargeList: [{
    extraChargeBaseInfo: {
      checkStatus: 0,
      extraChargeGuid: '额外费用GUID',
      extraChargeNumber: '2017-03-17',
      receivableMoney: '应收总金额',
      payableMoney: '应付总金额',
      operatorMan: '操作人名称',
      operatorTime: '操作时间',
      checkMan: '审批人',
      checkTime: '审批时间',
      remark: '备注',
      taskOrderGuid: '任务单号GUID',
      taskOrderNumber: '任务单号',
      logisticsOrderGuid: '物流订单号GUID',
      logisticsOrderNumber: '物流订单号',
      eventType: '发生类别',
      responsibilityDefine: '责任定义',
      paymentWill: '客户支付意向',
      changeResponsibility: '变更责任'
    },
    chargeDetail: [{
      chargeType: '费用类别',
      jobOrderGuid: '作业单号GUID',
      jobOrderNumber: '作业单号',
      businessTypeGuid: '业务属性GUID',
      businessType: '业务属性',
      chargeGenerateDirection: '费用方向',
      balanceUnit: '结算单位',
      chargeName: '费用名称',
      unitPrice: '单价',
      totalQuantity: '数量',
      measureUnit: '计量单位',
      rate: '税率',
      rateMoney: '税额',
      netPrice: '净价',
      totalMoney: '费用金额',
      rateWay: '计税方式',
      remark: '备注'
    }]}, {
      extraChargeBaseInfo: {checkStatus: 0, extraChargeNumber: '2017-03-16', extraChargeGuid: '1'},
      chargeDetail: []
    }, {
      extraChargeBaseInfo: {checkStatus: 0, extraChargeNumber: '2017-03-15', extraChargeGuid: '2'},
      chargeDetail: []
    }
    , {
      extraChargeBaseInfo: {checkStatus: 0, extraChargeNumber: '2017-03-14', extraChargeGuid: '3'},
      chargeDetail: []
    }
  ]
};

export default data;
