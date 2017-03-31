
const data = {
  returnCode: 0,
  returnMsg: '成功',
  result: {
    "keys": ["customerBaseInfo", "customerContact", "customerFactory", "customerAgent", "customerServiceDistribution", "customerTaxRate"],
    "returnTotalItems": 200, //"返回查询总条数",
    "data": [
      {
        "guid": "父GUID",
        "customerBaseInfo": {
          "guid": "客户GUID",
          "customerCode": "客户编码",
          "customerName": "客户名称",
          "customerShortName": "客户简称",
          "customerEnglishName": "英文名称",
          "customerHeaderInformation": "抬头信息",
          "customerTelephone": "电话",
          "customerFax": "传真",
          "customerAddress": "详细地址",
          "customerCreditCode": "公司信用代码",
          "customerCountry": "国家",//取字典值
          "customerProvince": "省份",//取字典值
          "customerCity": "城市",//取字典值
          "customerDistrict": "行政区",//取字典值
          "customerStreet": "街道",//取字典值
          "customerLongitude": "经度",
          "customerLatitude": "纬度",
          "description": "公司描述",
          "isContract": "1",//--int 1为合同客户  0为非合同客户
          "contractStartTime": "合同生效日期",
          "contractEndTime": "合同终止日期",
          "balanceWay": "结算方式", //取字典值
          "balanceCurrency": "结算币种",//取字典值
          "creditDays": "信用天数", //int
          "creditMoney": "信用金额",// float
          "advanceLimit": "垫付资金上限",
          "checkAccountDeadlineTime": "对账截止日期",
          "paymentTime": "付款日期",
          "invoiceDescription": "发票说明",
          "isNeedDebitNote": "DEBIT NOTE",// int 1为需要,0为不需要
          "salesPersonGuid": "销售人员GUID",
          "salesPersonName": "销售人员名称",
          "supplierGuid": "关联供应商标识",
          "isAgent": "代理", //int 1为代理,0为非代理
          "isInternalCompany": "内部公司",// int 1为内部公司,0为非
          "relationThreePartyCode": "内部系统客户标识",
          "isOrderingCustomer": "接单客户",
          "firstContractTime": "第一次合作时间",
          "lastContractTime": "最后一次合作时间",
          "active": "0",//0为非激活,1生效,2失效
          "institutionGuid": "归属法人代表GUID",
          "institutionName": "归属法人代表名称"
        },
        "customerContact": [
          {
            "guid": "联系人GUID",
            "contactName": "联系人姓名",
            "contactEnglishName": "英文名",
            "contactSex": "性别",
            "contactTelephone": "联系电话",
            "contactMobile": "手机",
            "contactFax": "传真",
            "contactEmail": "邮箱",
            "contactWeChatOpenId": "微信",
            "contactPost": "职务",
            "contactFortes": "特长",
            "contactOrigin": "籍贯",
            "contactBirthday": "生日",
            "contactRemark": "备注",
            "active": "0",//0为非激活,1生效,2失效
            "customerContactType": [
              "contactTypeTag", //联系人类别列表 //来源字典
            ]
          }
        ],
        "customerFactory": [
          {
            "guid": "工厂guid",
            "factoryName": "名称",
            "factoryShortName": "简称",
            "factoryEnglishName": "英文名称",
            "factoryCountry": "国家",//取字典值
            "factoryProvince": "省份",//取字典值
            "factoryCity": "城市",//取字典值
            "factoryDistrict": "行政区",//取字典值
            "factoryStreet": "街道",
            "factoryAddress": "地址",
            "factoryChargingPlaceId": "计费地点",
            "factoryLongitude": "经度",
            "factoryLatitude": "纬度",
            "isConsignee": "是否收货人",  //1是,0不是
            "isConsignor": "是否发货人", // 1是，0不是
            "isNotify": "是否通知人",// 1是,0不是
            "isCustoms": "是否报关行",// 1是,0不是
            "isWarehouseAddress": "是否交舱地址",// 1是,0不是
            "isTailPaperAddress": "是否尾址地址",// 1是,0不是
            "headerInformation": "公司抬头",
            "factoryContactName": "联系人",
            "factoryContactTelephone": "联系人电话",
            "factoryContactFax": "联系人传真",
            "factoryContactEmail": "联系人邮箱",
            "mapFile": "地图文件",
            "active": "激活状态",//0为非激活,1生效,2失效
          }
        ],
        "customerAgent": [
          {
            "guid": "海外代理GUID",
            "agentName": "海外代理名称",
            "agentUserGuid": "海代跟进人员GUID",
            "agentUserName": "海代跟进人员名称",
            "active": "激活状态",//0为非激活,1生效,2失效
          }
        ],
        "customerServiceDistribution": [
          {
            "guid": "客服人员GUID",
            "customerUserName": "客服人员名称",
            "formulaGuid": "物流分子式",
            "active": "激活状态",//0为非激活,1生效,2失效
          }
        ],
        "customerTaxRate": [
          {
            "guid": "税率guid",
            "taxRate": "税率",
            "taxWay": "计税方式",
            "startDate": "开始日期",
            "endDate": "结束日期",
            "active": "激活状态",//0为非激活,1生效,2失效
          }
        ]
      },
      {
        "guid": "父GUID",
        "customerBaseInfo": {
          "guid": "客户GUID2",
          "customerCode": "客户编码2"
        }
      },
      {
        "guid": "父GUID",
        "customerBaseInfo": {
          "guid": "客户GUID3",
          "customerCode": "客户编码3"
        }
      }
    ]
  }
};

export default data;
