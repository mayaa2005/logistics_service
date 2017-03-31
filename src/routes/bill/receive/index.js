import React from 'react';
import ReceiveContainer from './ReceiveContainer';

export default {
  path: '/receive',

  action() {
    return {
      wrap: true,
      component: <ReceiveContainer />
    };
  }
}
