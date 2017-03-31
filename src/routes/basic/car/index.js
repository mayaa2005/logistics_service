import React from 'react';
import CarContainer from './CarContainer'

export default {
  path: '/car',

  action() {
    return {
      wrap: true,
      component: <CarContainer />
    };
  }
}

