import { combineReducers } from 'redux';
import clientReducer from './client';
import supplierReducer from './supplier';
import carReducer from './car';

const basicReducer = combineReducers({
  client: clientReducer,
  supplier: supplierReducer,
  car: carReducer
});

export default basicReducer;

