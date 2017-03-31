import RouterHelper from '../RouteHelper';
import React from 'react';

const title = '基础资料';
const prefix = '/basic';

let items = [
  {key: "/client", title: "客户资料", icon: '/default.png'},
  {key: "/supplier", title: "供应商资料", icon: '/default.png'},
  {key: "/car", title: "车辆档案", icon: '/default.png'},
  {key: "/job", title: "作业单元", icon: '/default.png'}
];

const route = {
  path: '/:arg',
  action: function() {
    return {wrap: true, component: <div />};
  }
};

let children = [
  require('./client').default,
  require('./supplier').default,
  route
];

export default RouterHelper(prefix, title, children, items);

