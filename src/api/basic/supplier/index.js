import express from 'express';

let api = express.Router();
let supplierData = null;

// 供应商档案：新增
api.post('/', async (req, res) => {
  res.send({returnCode: 0});
});

// 供应商档案：编辑
api.put('/', async (req, res) => {
  res.send({returnCode: 0});
});

// 供应商档案：获取UI标签
api.get('/config', async (req, res) => {
  const module = await require('./config');
  res.send(module.default);
});

// 供应商档案：获取列表
api.post('/list', async (req, res) => {
  if (!supplierData) {
    const module = await require('./data');
    supplierData = module.default;
  }
  res.send(supplierData);
});

// 供应商档案：激活
api.put('/active/:guid', async (req, res) => {
  const guid = req.params.guid;
  let suppliers = supplierData.result.data;
  const index = suppliers.findIndex(supplier => supplier.supplierInfo.guid === guid);
  if (index >= 0) {
    suppliers[index].supplierInfo.active = 1;
    res.send({returnCode: 0, result: {active: 1}});
  } else {
    res.send({returnCode: 1});
  }
});

// 供应商档案：删除
api.delete('/:guid', async (req, res) => {
  let suppliers = supplierData.result.data;
  const guid = req.params.guid;
  const index = suppliers.findIndex(supplier => supplier.supplierInfo.guid === guid);
  if (index >= 0) {
    if (suppliers[index].supplierInfo.active === 0) {
      supplierData.result.data = suppliers.filter(supplier => supplier.supplierInfo.active !== 0);
      res.send({returnCode: 0});
    } else {
      suppliers[index].supplierInfo.active = 2;
      res.send({returnCode: 0, result: {active: 2}});
    }
  } else {
    res.send({returnCode: 0});
  }
});

export default api;
