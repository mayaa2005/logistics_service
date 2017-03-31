import {deepAssign} from '../../../toolFunction';

const orderBaseInfoReducer = (state, action) => {
  let {serviceKey, key, value} = action;
  let newState = deepAssign(state, {[key]: value}, 'data', serviceKey);
  return newState;
};

export default orderBaseInfoReducer;
