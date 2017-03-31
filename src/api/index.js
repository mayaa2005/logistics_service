import express from 'express';
import fetch from '../core/fetch';
import requestUrl from './requestURL';
import {postOption} from '../common/common';
import apiPlan from './plan';
import apiBill from './bill';
import apiBasic from './basic';

let api = express.Router();

api.get('/order_list_cols', async (req, res) => {
  const module = await require('./orderListCols');
  res.send(module.default);
});

api.get('/settle_list_cols', async (req, res) => {
  const module = await require('./settleListCols');
  res.send(module.default);
});

api.get('/order_list', async (req, res) => {
  const module = await require('./orderList');
  res.send(module.default);
});

api.get('/settle_list', async (req, res) => {
  const module = await require('./settleList');
  res.send(module.default);
});

api.get('/order_info', async (req, res) => {
  const module = await require('./jobModifyOrder');
  res.send(module.default);
});

api.get('/job_unit_list', async (req, res) => {
  const module = await require('./jobUnitList');
  res.send(module.default);
});

api.get('/job_code_list', async (req, res) => {
  const module = await require('./jobCodeList');
  res.send(module.default);
});

api.get('/job_units_ui', async (req, res) => {
  const module = await require('./jobUnitsUIInfo');
  res.send(module.default);
});

api.get('/goods_split_ui', async (req, res) => {
  const module = await require('./goodsWeightSplitUIInfo');
  res.send(module.default);
});

api.get('/job_split_ui', async (req, res) => {
  const module = await require('./jobSplitUIInfo');
  res.send(module.default);
});

api.get('/order_info_ui', async (req, res) => {
  const module = await require('./orderInfoUIInfo');
  res.send(module.default);
});

api.get('/order_list_ui', async (req, res) => {
  const module = await require('./orderListUIInfo');
  res.send(module.default);
});

api.get('/settle_edit_ui', async (req, res) => {
  const module = await require('./settleEditUIInfo');
  res.send(module.default);
});

api.get('/settle_info', async (req, res) => {
  const module = await require('./settleInfo');
  res.send(module.default);
});

api.post('/login', async (req, res) => {
  let response = await fetch( requestUrl.loginUser, postOption(req.body) );
  let json = await response.json();
  console.log('server login result ==', json);
  res.send(json);
});
//应收改单
api.get('/changeReceive_list_cols', async (req, res, next) => {
  const module = await require('./changeReceiveListCols');
  res.send(module.default);
});

api.get('/changeReceive_list', async (req, res) => {
  const module = await require('./changeReceiveList');
  res.send(module.default);
});

api.get('/changeReceive_edit_ui', async (req, res, next) => {
  const module = await require('./changeReceiveEditUIInfo');
  res.send(module.default);
});

api.get('/changeReceive_info', async (req, res, next) => {
  const module = await require('./changeReceiveInfo');
  res.send(module.default);
});

//应付改单
api.get('/changePay_list_cols', async (req, res, next) => {
  const module = await require('./changePayListCols');
  res.send(module.default);
});

api.get('/changePay_list', async (req, res) => {
  const module = await require('./changePayList');
  res.send(module.default);
});

api.get('/changePay_edit_ui', async (req, res, next) => {
  const module = await require('./changePayEditUIInfo');
  res.send(module.default);
});

api.get('/changePay_info', async (req, res, next) => {
  const module = await require('./changePayInfo');
  res.send(module.default);
});

api.use('/plan', apiPlan);
api.use('/basic', apiBasic);
api.use('/bill', apiBill);

api.get('/order_input_label', async (req, res) => {
  const module = await require('./order/input/label');
  res.send(module.default);
});

api.get('/order_input_index_data', async (req, res) => {
  let response, json, data;
  const module = await require('./order/input/indexInitData');
  data = module.default;

  // response = await fetch(requestUrl.logisticsOrderList);
  // if (!response.ok) {
  //   console.log('get logisticsOrderList failed!!!');
  //   return;
  // }
  // json = await res.json();
  // data.table.items = json.logisticsOrderList;

  res.send(data);
});

api.get('/order_input_order_info_data', async (req, res) => {
  let response, json, data;
  const module = await require('./order/input/orderInfoInitData');
  data = module.default;

  res.send(data);
});

api.get('/order_split_label', async (req, res) => {
  const module = await require('./order/split/label');
  res.send(module.default);
});

api.get('/order_split_index_data', async (req, res) => {
  let response, json, data;
  const module = await require('./order/split/indexInitData');
  data = module.default;

  res.send(data);
});

api.get('/order_split_order_info_data', async (req, res) => {
  let response, json, data;
  const module = await require('./order/split/orderInfoInitData');
  data = module.default;

  res.send(data);
});

api.post('/customer_contacts', async (req, res) => {
  console.log('get customer_contacts of', req.body.customerGuid);
  let response, json, data;
  const module = await require('./common/customerContacts');
  data = module.default;

  res.send({customerContacts:data});
});

api.post('/order_save', async (req, res) => {
  //console.log('save order of', req.body);
  //let response = await fetch( requestUrl.createLogistics, getParam('PUT', req.body));
  //let json = await response.json();
  //console.log('server put order result ==', json);
  //res.send(json);
  res.send('ok');
});

api.get('/bill_receive_config', async (req, res) => {
  const module = await require('./billReceiveConfig');
  res.send(module.default);
});

api.get('/bill_receive_data', async (req, res) => {
  const module = await require('./billReceiveData');
  res.send(module.default);
});


export default api;
