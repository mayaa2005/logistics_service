

//const host = 'http://10.0.20.83:8090';
const host = 'http://10.0.20.60:8081';
const customer_service = 'customer_service';
const order_service = 'order_service';

const requestURL = {
  loginUser: `${host}/login/user`,
  orderCustomers : `${host}/${customer_service}/customer/ordercustomers`,
  contractCustomers: `${host}/${customer_service}/customer/contractcustomers`,
  logisticsOrderList: `${host}/`,
  createLogistics: `${host}/${order_service}/order/logistics`
};

export default requestURL;
