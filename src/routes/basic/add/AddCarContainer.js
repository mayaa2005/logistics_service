import { connect } from 'react-redux';
import AddCar from './AddCar';
import UIInfo from '../../../api/basic/addCar/carUIInfo';

const HIDE_ACTION = 'carHideAddCar';

const createActionCreator = (type) => () => {
  return {type};
};

const mapStateToProps = (state, props) => {
  let newProps = {
    ...UIInfo,
    props
  } ;
  //console.log('tttnewProps=',newProps);
  return newProps;
};

const actionCreators = {
  onHide: createActionCreator(HIDE_ACTION)
};

const AddCarContainer = connect( mapStateToProps,actionCreators)(AddCar);

export default AddCarContainer;
