import {deepAssign, composeReducers} from '../../toolFunction';

const initReducer = (state, {label, data}) => {
  let newState = {};
  newState.label = label;
  newState.title = label.subTitle;
  newState.buttons = label.buttons;
  newState.tableCols = label.table;
  newState.tableItems = data ? data.chargeDetail : [];
  newState.forms = label.forms;
  newState.formValue = data || {};
  return newState;
};

const addReducer = (state) => {
  return deepAssign(state, {tableItems: state.tableItems.concat({})});
};

const copyReducer = (state) => {
  let [...tableItems] = state.tableItems;
  state.tableItems.every(item => {
    if (item.checked) {
      tableItems.push(Object.assign({}, item, {checked: false}));
    }
    return true;
  });
  return deepAssign(state, {tableItems});
};

const delReducer = (state) => {
  const tableItems = state.tableItems.filter(item => !item.checked);
  return deepAssign(state, {tableItems});
};

const checkReducer = (state, {rowIndex, keyName, checked}) => {
  let [...tableItems] = state.tableItems;
  if (rowIndex === -1) {
    tableItems.filter(item => item[keyName] = checked);
  } else {
    tableItems[rowIndex][keyName] = checked;
  }
  return deepAssign(state, {tableItems});
};

const tableChangeReducer = (state, {rowIndex, keyName, value}) => {
  let [...tableItems] = state.tableItems;
  tableItems[rowIndex][keyName] = value;
  return deepAssign(state, {tableItems});
};

const formChangeReducer = (state, {keyName, value}) => {
  return deepAssign(state, {[keyName]: value}, 'formValue');
};

const editReducer = composeReducers({
  billExtraEditInit: initReducer,
  billExtraEditAdd: addReducer,
  billExtraEditCopy: copyReducer,
  billExtraEditDel: delReducer,
  billExtraEditCheck: checkReducer,
  billExtraEditTableChange: tableChangeReducer,
  billExtraEditFormChange: formChangeReducer
});

export default editReducer;
