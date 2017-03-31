import React from 'react';
import Layout from '../../components/Layout';
import Dispatch from './Dispatch';

const title = '派单中心';
const items = [
  {key: '#1', href: "/dispatch", title: "待派单", icon: ""},
  {key: '#2', href: "/dispatch", title: "已派单", icon: ""}
];

export default {
  path: '/dispatch',

  action() {
    return {
      title,
      component: <Layout items={items} nav1={this.path}><Dispatch title={title} /></Layout>
    };
  }
};
