import express from 'express';
import fetch from '../../../core/fetch';
import {host, basic_client_service} from '../../serverAPIConfig';
import {postOption} from '../../../common/common';

const URL = {
  customer: `${host}/${basic_client_service}/customer`
};

let basicClientAPI = express.Router();

const localTest = true;

basicClientAPI.get('/config', async (req, res) => {
  let json;
  if (localTest) {
    const module = await require('./config');
    json = module.default;
  }else {
  }
  res.send(json);
});

basicClientAPI.get('/data', async (req, res) => {
  let json;
  if (localTest) {
    const module = await require('./data');
    json = module.default;
  }else {
  }
  res.send(json);
});

basicClientAPI.post('/list', async (req, res) => {
  let json;
  if (localTest) {
    const module = await require('./data');
    json = module.default;
  }else {
  }
  res.send(json);
});

basicClientAPI.delete('/delete/:guid', async (req, res) => {
  let json;
  if (localTest) {
    //json = { returnCode: 0, returnMsg: '成功', result: {active: "2"}}; //失效
    json = { returnCode: 0, returnMsg: '成功'}; //物理删除
  }else {
    const guid = req.params.guid;
    console.log('delete guid==', guid);
    let response = await fetch(`${URL.customer}/${guid}`, {method: 'delete'});
    if (!response.ok) {
      console.log('delete failed  guid==', guid);
      return;
    }
    json = await response.json();
  }
  res.send(json);
});

basicClientAPI.put('/active/:guid', async (req, res) => {
  let json;
  if (localTest) {
    json = { returnCode: 0, returnMsg: '成功', result: {active: "1"}}; //激活
  }else {
    const guid = req.params.guid;
    console.log('put active guid==', guid);
    let response = await fetch(`${URL.customer}/${guid}/active`, {method: 'put'});
    if (!response.ok) {
      console.log('put active failed  guid==', guid);
      return;
    }
    json = await response.json();
  }
  res.send(json);
});

export default basicClientAPI;
