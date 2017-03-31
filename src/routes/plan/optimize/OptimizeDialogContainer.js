import { connect } from 'react-redux';
import OptimizeDialog from './OptimizeDialog';

const HIDE_ACTION = 'planHideOptimize';
const CHOICE_CAR_ACTION = 'planChoiceCar';
const RESET_ACTION = 'planResetList';
const REDO_ACTION = 'planRedoList';
const CAR_TABLE_CHANGE_ACTION = 'planCarTableChange';

const createActionCreator = (type) => () => {
  return {type};
};

const carTableChangeCreator = (rowIndex, key, value) => {
  return {type: CAR_TABLE_CHANGE_ACTION, rowIndex, key, value};
};

const mapDispatchToProps = {
  onHide: createActionCreator(HIDE_ACTION),
  onChoiceCar: createActionCreator(CHOICE_CAR_ACTION),
  onReset: createActionCreator(RESET_ACTION),
  onRedo: createActionCreator(REDO_ACTION),
  onCarTableChange: carTableChangeCreator
};

const OptimizeDialogContainer = connect(null, mapDispatchToProps)(OptimizeDialog);

export default OptimizeDialogContainer;
