import {composeReducers, deepAssign} from '../../toolFunction';
import {toEditState} from '../../../common/supplierEditAdapter';

const initReducer = (state, {data, config}) => {
  return toEditState(data, config);
};

const changeReducer = (state, {key, value}) => {
  return deepAssign(state, {[key]: value, modify: true}, state.keys[0]);
};

const contentChangeReducer = (state, {key, rowIndex, keyName, value}) => {
  let [...items] = state[key];
  items[rowIndex] = deepAssign(items[rowIndex], {[keyName]: value, modify: true});
  return deepAssign(state, {[key]: items});
};

const checkReducer = (state, {key, rowIndex, keyName, checked}) => {
  const items = state[key].map((item, index) => {
    if ((rowIndex === -1) || (rowIndex === index)) {
      return deepAssign(item, {[keyName]: checked});
    } else {
      return item;
    }
  });
  return deepAssign(state, {[key]: items});
};

const addRowReducer = (state, {key}) => {
  return deepAssign(state, {[key]: state[key].concat({modify: true})});
};

const activeReducer = (state, {key}) => {
  const items = state[key].map(item => {
    return item.checked ? deepAssign(item, {active: 1, modify: true}) : item;
  });
  return deepAssign(state, {[key]: items});
};

const InactiveReducer = (state, {key}) => {
  const items = state[key].map(item => {
    return item.checked ? deepAssign(item, {active: 0, modify: true}) : item;
  });
  return deepAssign(state, {[key]: items});
};

const activePartReducer = (state, {activePart}) => {
  if (activePart === state.activePart) {
    return deepAssign(state, {activePart: ''});
  } else {
    return deepAssign(state, {activePart});
  }
};

const editReducer = composeReducers({
  basicSupplierEditInit: initReducer,
  basicSupplierChange: changeReducer,
  basicSupplierContentChange: contentChangeReducer,
  basicSupplierCheck: checkReducer,
  basicSupplierAddRow: addRowReducer,
  basicSupplierActive: activeReducer,
  basicSupplierInactive: InactiveReducer,
  basicSupplierActivePart: activePartReducer
});

export default editReducer;
