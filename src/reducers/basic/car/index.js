import {deepAssign, swapItems, getValue} from '../toolFunction';
import addCarReducer from './addCar';

const genReducers = () => {
  return {
    basicCarAdd: addCar
  };
};

const addCar = (state, action) => {
  //console.log('car index addcar', action);
  //const newState = addCarReducer(undefined, action);
  //return deepAssign(state, newState, 'addCar');
  return deepAssign(state, {addCar:{show: true}});
};

const dispatchSubReducer = (state, action) => {
  let newState = {};
  let preState;
  preState = state.addCar;
  //console.log('88822');
  if (preState) {
    //console.log('888');
    newState = addCarReducer(preState, action);
    if (preState !== newState) {
      return deepAssign(state, newState, 'addCar');
    }
  }
  return state;
};

const dispatchReducer = (state, action) => {
  const preState = getValue(state);
  let newState = {};
  if (preState) {
    if (reducers.hasOwnProperty(action.type)) {
      newState = reducers[action.type](preState, action);
    } else {
      newState = dispatchSubReducer(preState, action);
    }
    if (preState !== newState) {
      return deepAssign(state, newState);
    }
  }
  return state;
};

const carReducer = (state = {}, action) => {
  return dispatchReducer(state, action);
};

const reducers = genReducers();

export default carReducer;

