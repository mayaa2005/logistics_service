import { deepAssign, composeReducers } from '../toolFunction';

const children1 = [
  '物流单号20161229；作业单元：省际国内零担；起始地：深圳-宝安区；目的地：上海-浦东区；总重量：2吨；总体积：5立方',
  '物流单号20161230；作业单元：省际国内零担；起始地：深圳-南山区；目的地：上海-松江区；总重量：2吨；总体积：5立方'
];

const children2 = [
  '物流单号20161229;作业单元：城际国内零担；起始地：广州-天河区；目的地：上海-浦东区；总重量：4吨；总体积：10立方',
  '物流单号20161229；作业单元：城际国内零担；起始地：广州-黄埔区；目的地：上海-虹口；总重量：4吨；总体积：10立方'
];

const listItems = [
  {title: '装载一  起始地：深圳；目的地：上海；总重量：4吨；总体积：10立方', children: children1},
  {title: '装载二  起始地：广州；目的地：上海；总重量：8吨；总体积：20立方', children: children2}
];

const job = [
  '省际公路整车运输',
  '省际公路整车特种运输',
  '省际公路零担运输',
  '省际公路零担特种运输',
  '城际公路整车运输',
  '城际公路整车特种运输',
  '城际公路零担运输',
  '城际公路零担特种运输',
  '同城公路整车运输',
  '同城公路整车特种运输',
  '同城公路零担运输',
  '同城公路零担特种运输'
];

const tableCols = [
  {key: 'key1', title: '', type: 'readonly'},
  {key: 'key2', title: '起始地', type: 'readonly'},
  {key: 'key3', title: '目的地', type: 'readonly'},
  {key: 'key4', title: '重量', type: 'readonly'},
  {key: 'key5', title: '体积', type: 'readonly'},
  {key: 'key6', title: '车型', type: 'select', typeRelated: ['3T', '5T', '8T']},
  {key: 'key7', title: '作业单元', type: 'select', typeRelated: job}
];

const tableItems = [
  {key1: '装载一', key2: '深圳', key3: '上海', key4: '4吨', key5: '20立方', key6: '3T', key7: '省际公路整车运输'},
  {key1: '装载二', key2: '广州', key3: '上海', key4: '8吨', key5: '20立方', key6: '5T', key7: '同城公路零担特种运输'}
];

const defState = {
  show: true,
  listItems,
  hasTable: false,
  tableCols: [],
  tableItems: []
};

const initReducer = () => {
  return defState;
};

const hideReducer = (state) => {
  return deepAssign(state, {show: false});
};

const choiceCarReducer = (state) => {
  if (state.hasTable) {
    return deepAssign(state, {hasTable: false});
  } else {
    return deepAssign(state, {hasTable: true, tableCols, tableItems});
  }
};

const resetReducer = (state) => {
  console.log('reset');
  return state;
};

const redoReducer = (state) => {
  console.log('redo');
  return state;
};

const carTableChangeReducer = (state, {rowIndex, key, value}) => {
  let [...tableItems] = state.tableItems;
  tableItems[rowIndex] = deepAssign(tableItems[rowIndex], {[key]: value});
  return deepAssign(state, {tableItems});
};

const optimizeReducer = composeReducers({
  planOptimize: initReducer,
  planHideOptimize: hideReducer,
  planChoiceCar: choiceCarReducer,
  planResetList: resetReducer,
  planRedoList: redoReducer,
  planCarTableChange: carTableChangeReducer
});

export default optimizeReducer;
