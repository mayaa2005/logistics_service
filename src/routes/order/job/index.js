import React from 'react';
import JobContainer from './JobContainer';

export default {
  path: '/job',

  action() {
    return {
      wrap: true,
      component: <JobContainer />
    };
  }
}
