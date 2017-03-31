import {deepAssign, composeReducers} from '../../toolFunction';

const initReducer = (state, {label, data, keys}) => {
  let newState = {};
  newState.subTitle = label.subTitle;
  newState.panels = label.panels;
  newState.toolbar = label.toolbar;
  newState.buttons = label.buttons;
  newState.baseInfo = label.baseInfo;
  newState[keys[0]] = data? data : {};
  keys.map( (key, index) => {
    if (index > 0) {
      newState[key] = {
        cols: label[key],
        items: data ? data[key] : []
      };
      delete newState[keys[0]][key];
    }
  });
  console.log('edit init state = ', newState);
  return newState;
};

const formChangeReducer = (state, action) => {
  console.log('basic client formChange action=',action);
  let {groupKey, key, value} = action;
  return deepAssign(state, {[key]: value}, groupKey);
};

const tableContentChangeReducer = (state, action) => {
  console.log('basic client tableContentChange action=',action);
  let {key, rowIndex, keyName, value} = action;
  let [...items] = state[key].items;
  items[rowIndex][keyName] = value;
  return deepAssign(state, {items}, key);
};

const tableCheckReducer = (state, action) => {
  let {key, rowIndex, keyName, checked} = action;
  let [...items] = state[key].items;
  if (rowIndex === -1) {
    items.map(item => item[keyName] = checked);
  } else {
    items[rowIndex][keyName] = checked;
  }
  return deepAssign(state, {items}, key);
};

const tableAddReducer = (state, {key}) => {
  let [...items] = state[key].items;
  items.push({});
  return deepAssign(state, {items}, key);
};

const editReducer = composeReducers({
  basicClientEditInit: initReducer,
  basicClientEditFormChange: formChangeReducer,
  basicClientEditTableContentChange: tableContentChangeReducer,
  basicClientEditTableCheck: tableCheckReducer,
  basicClientEditTableAdd: tableAddReducer
});

export default editReducer;
