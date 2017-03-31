import React from 'react';
import Layout from '../../components/Layout';
import Partner from './Partner';

const title = '跟踪与评价';

const items = [
  {key: '#1', href: '/partner', title: '客户管理', icon: ''},
  {key: '#2', href: '/partner', title: '供应商管理', icon: ''}
];

export default {
  path: '/partner',

  action() {
    return {
      title,
      component: <Layout items={items} nav1={this.path}><Partner title={title} /></Layout>
    };
  }
};
