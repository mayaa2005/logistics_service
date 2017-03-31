import React from 'react';
import Layout from '../../components/Layout';
import Bi from './Bi';

const title = '事故管理';

export default {
  path: '/accident',

  action() {
    return {
      title,
      component: <Layout items={[]} nav1={this.path}><Bi title={title} /></Layout>
    };
  }
};
