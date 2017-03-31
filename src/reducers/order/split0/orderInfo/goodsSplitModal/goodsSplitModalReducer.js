/**
 * Created by pengxiaojing on 2017/2/14.
 */
import {deepAssign} from '../../../../toolFunction';

const init = (state, {tabKey, orderInfo}) => {
  if (orderInfo) {
    let newState = Object.assign({}, state);
    newState[tabKey] = {
      isShow: false
    };
    return newState;
  }
  return state;
};
const unInit = (state, {tabKey}) => {
  let newState = Object.assign({}, state);
  delete newState[tabKey];
  return newState;
};

const initData = (state, {orderInfo}) => {
  if (orderInfo) {
    let {goodsInfoTable, cabinetInfoTable} = orderInfo;
    let newState = {
      isShow: true,
      goodsTable: goodsInfoTable || [],
      cabinetTable: cabinetInfoTable || [],
      relation: [],
      relationSelectIndex: [-1, 0]
    };
    return newState;
  }
  return state;
};

const modalChange = (state, {isShow}) => {
  return Object.assign({}, state, {isShow: isShow});
};

const tableCheck = (state, {tableName, rowIndex, keyName, checked}) => {
  let newTable = state[tableName].map((item, index) => {
    let newItem = Object.assign({}, item);
    if (rowIndex === -1) {
      newItem[keyName] = checked;
    } else if (index == rowIndex) {
      newItem[keyName] = checked;
    }
    return newItem;
  });
  return Object.assign({}, state, {[tableName]: newTable});
};

const tableMerge = (state, {tableName, keyName}) => {
  let newNumber = 0;
  let newWeight = 0;
  let newSize = 0;
  let newItem = null;
  state[tableName].map((item) => {
    if (item[keyName] == true) {
      newNumber += Number(item.number);
      newWeight += Number(item.weight);
      newSize += Number(item.size);
      if (!newItem) {
        newItem = Object.assign({}, item);
      }
    }
  });
  if (newItem) {
    let newTable = state[tableName].filter((item) => item[keyName] !== true );
    newItem.number = String(newNumber);
    newItem.weight = String(newWeight);
    newItem.size = String(newSize);
    newTable.push(newItem);
    return Object.assign({}, state, {[tableName]: newTable});
  }
  return state;
};

const tableRadio = (state, {tableName, rowIndex, keyName}) => {
  let newTable = state[tableName].map((item, index) => {
    let newItem = Object.assign({}, item);
    newItem[keyName] = (index === rowIndex);
    return newItem;
  });
  return Object.assign({}, state, {[tableName]: newTable});
};

const makeSure = (state, {tableName, rowIndex, tableData}) => {
  let newTable = state[tableName].filter((item, index) => index != rowIndex);
  newTable.push.apply(newTable, tableData);
  return Object.assign({}, state, {[tableName]: newTable});
};

const makeRelation = (state, {cabinetKeyName, goodsKeyName}) => {
  let newItem = {};
  for (let item of state.cabinetTable) {
    if (item[cabinetKeyName] == true) {
      newItem.cabinet = item;
      break;
    }
  }
  newItem.goodsList = state.goodsTable.filter(item => item[goodsKeyName] == true);
  if (newItem.goodsList.length > 0) {
    let [...newRelation] = state.relation;
    newRelation.push(newItem);
    let newGoodsTable = state.goodsTable.filter(item => item[goodsKeyName] != true);
    return Object.assign({}, state, {relation: newRelation}, {goodsTable: newGoodsTable});
  }
  return state;
};

const deleteRelation = (state, action) => {
  let firstIndex = state.relationSelectIndex[0];
  let secondIndex = state.relationSelectIndex[1];
  let newGoodsTable = [];
  let newRelation = [];
  if (firstIndex < 0) {
    return state;
  }else if (secondIndex == -1){
    newGoodsTable = state.goodsTable.concat(state.relation[firstIndex].goodsList);
    newRelation = state.relation.filter((item, index) => index !== firstIndex);
    return Object.assign({}, state, {goodsTable: newGoodsTable}, {relation: newRelation}, {relationSelectIndex:[-1,0]});
  }else {
    [...newGoodsTable] = state.goodsTable;
    let newItem = Object.assign({}, state.relation[firstIndex].goodsList[secondIndex]);
    newGoodsTable.push(newItem);
    newRelation = state.relation.map((item, index) => {
      if (index == firstIndex){
        let newGoodsList = item.goodsList.filter((item2, index2) => index2 !== secondIndex);
        newItem = Object.assign({}, item, {goodsList: newGoodsList});
        return newItem;
      }
      return item;
    });
    if (newRelation[firstIndex].goodsList.length < 1) {
      delete newRelation[firstIndex];
    }
    return Object.assign({}, state, {goodsTable: newGoodsTable}, {relation: newRelation}, {relationSelectIndex:[-1,0]});
  }
};

const listSelect = (state, {index, childIndex}) => {
  return Object.assign({}, state, {relationSelectIndex: [index, childIndex]});
};

const reducers = {
  splitInitGoodsSplitModalData: initData,
  splitGoodsSplitModalChange: modalChange,
  splitModalTableCheck: tableCheck,
  splitModalTableMerge: tableMerge,
  splitModalTableRadio: tableRadio,
  splitCountModalMakeSure: makeSure,
  splitModalMakeRelation: makeRelation,
  splitModalDeleteRelation: deleteRelation,
  splitModalListSelect: listSelect
};

const mainReducer = (state, action) => {
  const {tabKey} = action;
  const newState = reducers[action.type](state[tabKey], action);
  return deepAssign(state, newState, tabKey);
};

const goodsSplitModalReducer = (state = {}, action) => {
  if (action.type === 'splitAddTab') {
    return init(state, action);
  }else if (action.type === 'splitCancelTab'){
    return unInit(state, action);
  }
  const exist = Object.keys(reducers).some(type => action.type === type);
  return exist ? mainReducer(state, action) : state;
};

export default goodsSplitModalReducer;
