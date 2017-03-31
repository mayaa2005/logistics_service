import express from 'express';

let api = express.Router();

// 额外费用：获取UI标签
api.get('/config', async (req, res) => {
  const module = await require('./config');
  res.send(module.default);
});

// 额外费用：获取列表
api.post('/list', async (req, res) => {
  const module = await require('./data');
  res.send(module.default);
});

// 额外费用：审计或撤销审计
api.put('/', async (req, res) => {
  if (req.body.checkStatus) {
    res.send({
      returnCode: 0,
      checkResult: {
        checkStatus: 1,
        checkMan: '张艳为',
        checkTime: '2017-03-17'
      }
    });
  } else {
    res.send({
      returnCode: 0,
      checkResult: {
        checkStatus: 0,
        checkMan: '',
        checkTime: ''
      }
    });
  }
});

// 额外费用：删除
api.delete('/:guid', async (req, res) => {
  res.send({returnCode: 0});
});

export default api;
