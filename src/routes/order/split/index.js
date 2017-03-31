import React from 'react';
import SplitContainer from './SplitContainer';

export default {
  path: '/split',

  action() {
    return {
      wrap: true,
      component: <SplitContainer/>
    };
  }
}
