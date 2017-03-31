import React from 'react';
import InputContainer from './InputContainer';

export default {
  path: '/input',

  action() {
    return {
      wrap: true,
      component: <InputContainer/>
    };
  }
}
