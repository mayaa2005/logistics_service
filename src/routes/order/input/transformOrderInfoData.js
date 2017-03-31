
const uiParam  = {
  label: {},
  data: {
    orderBaseInfo: {},
    goodsInfo: {},
    serviceType: {},

    nativeTransport: {},
    portTransportIn: {},
    portTransportOut: {},
    portLocalTransport: {},
    bookingTransport: {},
    bondedTransport: {},
    railwayTransport: {},
    seaTransport: {},
    airTransport: {},
    toDO: {},
    delegateOption: {},
    coastalTrade: {},
    portTransport: {},

    goodsDetailList: [],
    cabinetInfoTable: [],
    options:{
      customerGuid: [],
      contactGuid: [],
      specifyCustomerGuid: [],
      paymentCustomerGuid: []
    }
  }
};


const getOptions = (options) => {
  let { customerList=[], customerContactList=[], specifyCustomerList=[], paymentCustomers=[]} = options;
  let customerGuid = customerList.map((item) => {
    return {guidKey:'customerGuid', guidValue:item.customerGuid, nameKey:'customerName', nameValue:item.customerName};
  });
  customerGuid.unshift({guidKey:'customerGuid', guidValue:'init', nameKey:'customerName', nameValue:''});
  let contactGuid = customerContactList.map((item) => {
    return {guidKey:'contactGuid', guidValue:item.contactGuid, nameKey:'contactName', nameValue:item.contactName};
  });
  let specifyCustomerGuid = specifyCustomerList.map((item) => {
    return {guidKey:'specifyCustomerGuid', guidValue:item.specifyCustomerGuid, nameKey:'specifyCustomer', nameValue:item.specifyCustomer};
  });
  let paymentCustomerGuid = paymentCustomers.map((item) => {
    return {guidKey:'paymentCustomerGuid', guidValue:item.paymentCustomerGuid, nameKey:'paymentCustomerName', nameValue:item.paymentCustomerName};
  });
  let newOptions = {
    customerGuid: customerGuid,
    contactGuid: contactGuid,
    specifyCustomerGuid: specifyCustomerGuid,
    paymentCustomerGuid: paymentCustomerGuid
  };
  return newOptions;
};
const getServiceType = (newData, list=[]) => {
  let serviceType = {};
  list.map(item => {
    serviceType[item.serviceTypeGuid] = true;
    newData[item.serviceTypeGuid] = Object.assign({}, item.serviceContent)
  });
  newData.serviceType = serviceType;
};

const transformData = (data) => {
  // console.log('data==',data);
  let newData = Object.assign({}, data);
  newData.options = getOptions(data.options);
  getServiceType(newData, data.serviceTypeList);
  return newData;
};

const toUIParam = ({data, label}) => {
  let param = uiParam;
  param.label = label;
  param.data = transformData(data);
  return param;
};

export default toUIParam;
