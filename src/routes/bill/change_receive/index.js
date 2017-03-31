import React from 'react';
import ChangeReceiveContainer from './ChangeReceiveContainer'

export default {
  path: '/change_receive',

  action() {
    return {
      wrap: true,
      component: <ChangeReceiveContainer/>
    };
  }
}
