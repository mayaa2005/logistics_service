import {deepAssign, composeReducers, mapReducer} from '../../../toolFunction';
import {optionsReducer, inputChangeReducer, serviceCheckReducer, addRowReducer, contentChangeReducer, deleteReducer} from './common';

const initReducer = (state, {label, orderStatus, data}) => {
  return {init:true, label, orderStatus, data};
};

const initDataReducer = (state, {options}) => {
  let newState = deepAssign(state, options, 'data', 'options');
  newState.init = false;
  return newState;
};


const reducers = {
  orderInputOrderInfoInit: initReducer,
  orderInputOrderInfoDataInit: initDataReducer,
  inputOrderInfoOptions: optionsReducer,
  inputOrderInfoInputChange: inputChangeReducer,
  inputOrderInfoServiceCheck: serviceCheckReducer,
  inputOrderInfoAddRow: addRowReducer,
  inputOrderInfoContentChange: contentChangeReducer,
  inputOrderInfoDelete: deleteReducer
};

const orderInfoReducer = composeReducers(reducers);
export default orderInfoReducer;
