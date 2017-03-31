import {deepAssign, composeReducers, mapReducer} from '../../../toolFunction';
import {optionsReducer, inputChangeReducer, serviceCheckReducer, addRowReducer, contentChangeReducer, deleteReducer} from '../../input/orderInfo/common';

const initReducer = (state, {label, data}) => {
  return {init:true, label, data};
};


const initDataReducer = (state, {options}) => {
  let newState = deepAssign(state, options, 'data', 'options');
  newState.init = false;
  return newState;
};


const reducers = {
  orderSplitOrderInfoInit: initReducer,
  orderSplitOrderInfoDataInit: initDataReducer,
  splitOrderInfoOptions: optionsReducer,
  splitOrderInfoInputChange: inputChangeReducer,
  splitOrderInfoServiceCheck: serviceCheckReducer,
  splitOrderInfoAddRow: addRowReducer,
  splitOrderInfoContentChange: contentChangeReducer,
  splitOrderInfoDelete: deleteReducer
};

const orderInfoReducer = composeReducers(reducers);
export default orderInfoReducer;
