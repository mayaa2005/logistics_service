import { connect } from 'react-redux';
import SplitDialog from './SplitDialog';

const HIDE_ACTION = 'planHideSplit';
const SEG_NUMBER_CHANGE_ACTION = 'planSegNumberChange';
const STATION_CHANGE_ACTION = 'planStationChange';
const STATION_DELETE_ACTION = 'planDeleteStation';

const createActionCreator = (type) => () => {
  return {type};
};

const segNumberChangeActionCreator = (value) => {
  return {type: SEG_NUMBER_CHANGE_ACTION, value};
};

const stationChangeActionCreator = (index, value) => {
  return {type: STATION_CHANGE_ACTION, index, value};
};

const stationDeleteActionCreator = (index) => {
  return {type: STATION_DELETE_ACTION, index};
};

const mapDispatchToProps = {
  onHide: createActionCreator(HIDE_ACTION),
  onSegNumberChange: segNumberChangeActionCreator,
  onStationChange: stationChangeActionCreator,
  onStationDelete: stationDeleteActionCreator
};

const SplitDialogContainer = connect(null, mapDispatchToProps)(SplitDialog);

export default SplitDialogContainer;
