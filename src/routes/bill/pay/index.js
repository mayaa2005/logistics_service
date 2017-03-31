import React from 'react';

export default {
  path: '/pay',

  action() {
    return {
      wrap: true,
      component: <h1>应付管理</h1>
    };
  }
}

