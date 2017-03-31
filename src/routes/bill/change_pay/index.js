import React from 'react';
import ChangePayContainer from './ChangePayContainer'

export default {
  path: '/change_pay',

  action() {
    return {
      wrap: true,
      component: <ChangePayContainer/>
    };
  }
}
