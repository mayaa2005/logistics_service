import React from 'react';
import SettleContainer from './SettleContainer';

export default {
  path: '/settle',

  action() {
    return {
      wrap: true,
      component: <SettleContainer />
    };
  }
}
