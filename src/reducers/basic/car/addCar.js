import { deepAssign, composeReducers } from '../../toolFunction';

//const defState = {
//  show: true
//};
//
//const initReducer = () => {
//  //console.log('add car');
//  return defState;
//};

const hideReducer = (state) => {
  //console.log('newState5555555555');
  return deepAssign(state, {show: false});
};

const addCarReducer = composeReducers({
  //carAddCar: initReducer,
  carHideAddCar: hideReducer
});

export default addCarReducer;
