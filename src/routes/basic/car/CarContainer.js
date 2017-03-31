import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Car from './Car';
import fetch from '../../../core/fetch';
import config from '../../../api/basic/car/carConfig';
import data from '../../../api/basic/car/carData';

const ADD_ACTION = 'carAddCar';

/*const createActionCreator = (type) => () => {
  return {type};
};*/

/*const addActionCreator = () => {
  return {type: 'basicCarAdd'};
};*/

const clickActionCreator = (key) => {
  if (key === 'add') {
    return {type: 'basicCarAdd'};
  } else {
    return {type: 'unknown'};
  }
};

const mergeAsState = (data, config) => {
  data['pagination']['config'] = config['pagination'];
  data['search']['config'] = config['search'];
  data['toolbar']['buttons'] = config['toolbar'];
  data['table']['cols'] = config['table']['cols'];
  return data;
};

const mapStateToProps = (state, props) => {
  //let newState = mergeAsState(data, config);
  //newState.show = state.basic.car.show;
  //  console.log('mapStateToProps');
  //console.log(newState);
  //console.log('ttt state.basic.car=',state.basic.car);
  return Object.assign({}, mergeAsState(data, config), state.basic.car);
};

/*const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};*/

const actionCreators = {
  //onAddCar: createActionCreator(ADD_ACTION)
  onClick: clickActionCreator
};

const CarContainer = connect(mapStateToProps, actionCreators)(Car);

export default CarContainer;


