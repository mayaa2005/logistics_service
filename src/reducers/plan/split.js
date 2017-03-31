import { deepAssign, composeReducers } from '../toolFunction';

const defState = {
  show: true,
  jobId: '20161202',
  path: ['深圳经营部', '广州', '嘉兴', '上海DC'],
  segment: []
};

const initReducer = () => {
  return defState;
};

const hideReducer = (state) => {
  return deepAssign(state, {show: false});
};

const segNumberChangeReducer = (state, {value}) => {
  const segNumber = Number(value);
  let segment = [];
  for (let index = 1; index < segNumber; index++) {
    segment.push(state.path[index]);
  }
  return deepAssign(state, {segment});
};

const stationChangeReducer = (state, {index, value}) => {
  let [...segment] = state.segment;
  segment[index] = value;
  return deepAssign(state, {segment});
};

const stationDeleteReducer = (state, {index}) => {
  let segment = state.segment.slice(0, index);
  return deepAssign(state, {segment});
};

const splitReducer = composeReducers({
    planSplit: initReducer,
    planHideSplit: hideReducer,
    planSegNumberChange: segNumberChangeReducer,
    planStationChange: stationChangeReducer,
    planDeleteStation: stationDeleteReducer
});

export default splitReducer;
