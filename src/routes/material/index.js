import React from 'react';
import Layout from '../../components/Layout';
import Material from './Material';

const title = '异常管理';
const items = [
  {key: '#1', href: '/material', title: '基础资料', icon: ''},
  {key: '#2', href: '/material', title: '客户资料', icon: ''},
  {key: '#3', href: '/material', title: '供应商资料', icon: ''}
];

export default {
  path: '/material',

  action() {
    return {
      title,
      component: <Layout items={items} nav1={this.path}><Material title={title} /></Layout>
    };
  }
};
