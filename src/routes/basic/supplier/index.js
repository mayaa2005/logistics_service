import React from 'react';
import SupplierContainer from './SupplierContainer';

const path = '/supplier';

const action = () => {
  return {
    wrap: true,
    component: <SupplierContainer />
  }
};

export default {path, action};
