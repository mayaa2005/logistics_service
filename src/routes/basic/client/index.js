import React from 'react';
import ClientContainer from './ClientContainer';

export default {
  path: '/client',

  action() {
    return {
      wrap: true,
      component: <ClientContainer />
    };
  }
}

