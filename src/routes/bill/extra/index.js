import React from 'react';
import ExtraContainer from './ExtraContainer';

export default {
  path: '/extra',

  action() {
    return {
      wrap: true,
      component: <ExtraContainer />
    };
  }
}
