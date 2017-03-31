import React from 'react';
import HomeContainer from './HomeContainer';
import Layout from '../../components/Layout';

const title = '首页';

export default {

  path: '/',

  async action() {
    return {
      title,
      component: <Layout nav1={this.path}><HomeContainer title={title} /></Layout>
    };
  }

};
