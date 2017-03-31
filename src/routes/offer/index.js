import React from 'react';
import Layout from '../../components/Layout';
import Offer from './Offer';

const title = '智能分析';

export default {
  path: '/offer',

  action() {
    return {
      title,
      component: <Layout items={[]} nav1={this.path}><Offer title={title} /></Layout>
    };
  }
};
