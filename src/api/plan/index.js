import express from 'express';

let api = express.Router();

api.get('/sidebar', async (req, res) => {
  const module = await require('./sidebar');
  res.send(module.default);
});

api.get('/config', async (req, res) => {
  const module = await require('./config');
  res.send(module.default);
});

api.get('/data', async (req, res) => {
  const module = await require('./data');
  res.send(module.default);
});

export default api;
