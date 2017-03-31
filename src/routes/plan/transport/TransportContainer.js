import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Transport from './Transport';
import fetch from '../../../core/fetch';

const PLAN_CONFIG = '/api/plan/config';
const PLAN_DATA = '/api/plan/data';

const INIT_ACTION = 'planInit';
const KEY_CHANGE_ACTION = 'planKeyChange';

const CHANGE_ACTION = 'planChange';
const SEARCH_ACTION = 'planSearch';
const MORE_ACTION = 'planMore';
const LESS_ACTION = 'planLess';
const RESET_ACTION = 'planReset';

const CHECK_ACTION = 'planCheck';
const SORT_ACTION = 'planSort';
const SWAP_ACTION = 'planSwap';

const PAGE_NUMBER_ACTION = 'planPageNumber';
const PAGE_SIZE_ACTION = 'planPageSize';

const SPLIT_ACTION = 'planSplit';
const COLLAPSE_ACTION = 'planCollapse';
const OPTIMIZE_ACTION = 'planOptimize';
const APPEND_ACTION = 'planAppend';
const COMMIT_ACTION = 'planCommit';
const CONFIG_ACTION = 'planConfig';

const mergeAsState = (data, label) => {
  data['pagination']['config'] = label['pagination'];
  data['search']['config'] = label['search'];
  data['toolbar']['buttons'] = label['toolbar'];
  data['table']['cols'] = label['table'];
  return data;
};

const createActionCreator = (type) => () => {
  return {type};
};

const initActionCreator = (key1, key2, special) => async (dispatch, getState) => {
  let res, data, config, payload;

  res = await fetch(PLAN_DATA);
  if (!res.ok) {
    return;
  }

  data = await res.json();
  config = getState().plan.config;

  if (special || !config) {
    res = await fetch(PLAN_CONFIG);
    if (!res.ok) {
      return;
    } else {
      config = await res.json();
    }
  }

  payload = mergeAsState(data, config);

  dispatch({type: INIT_ACTION, config, payload, key1, key2, special});
};

const keyChangeActionCreator = (key1, key2) => (dispatch) => {
  setTimeout(() => {
    dispatch({type: KEY_CHANGE_ACTION, key1, key2});
  }, 0);
};

const changeActionCreator = (key, value) => {
  return {type: CHANGE_ACTION, key, value};
};

const checkActionCreator = (isAll, checked, rowIndex) => {
  return {type: CHECK_ACTION, isAll, checked, rowIndex};
};

const sortActionCreator = (key) => {
  return {type: SORT_ACTION, key};
};

const swapActionCreator = (key1, key2) => {
  return {type: SWAP_ACTION, key1, key2};
};

const pageNumberActionCreator = (pageNumber) => {
  return {type: PAGE_NUMBER_ACTION, pageNumber};
};

const pageSizeActionCreator = (pageSize, pageNumber) => {
  return {type: PAGE_SIZE_ACTION, pageSize, pageNumber};
};

const mapStateToProps = (state, {key1, key2}) => {
  if (state.plan[key1] && state.plan[key1][key2]) {
    const {current} = state.plan;
    if (current.key1 === key1 && current.key2 === key2) {
      return state.plan[key1][key2];
    } else {
      return {...state.plan[key1][key2], keyChange: true};
    }
  } else {
    return {init: true};
  }
};

const actionCreators = {
  onInit: initActionCreator,
  onKeyChange: keyChangeActionCreator,

  onChange: changeActionCreator,
  onSearch: createActionCreator(SEARCH_ACTION),
  onMore: createActionCreator(MORE_ACTION),
  onLess: createActionCreator(LESS_ACTION),
  onReset: createActionCreator(RESET_ACTION),

  onCheck: checkActionCreator,
  onSort: sortActionCreator,
  onSwapCol: swapActionCreator,

  onPageNumberChange: pageNumberActionCreator,
  onPageSizeChange: pageSizeActionCreator,

  onSplit: createActionCreator(SPLIT_ACTION),
  onCollapse: createActionCreator(COLLAPSE_ACTION),
  onOptimize: createActionCreator(OPTIMIZE_ACTION),
  onAppend: createActionCreator(APPEND_ACTION),
  onCommit: createActionCreator(COMMIT_ACTION),
  onConfig: createActionCreator(CONFIG_ACTION)
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const mergeProps = (stateProps, dispatchProps, {key1, key2, special}) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit(key1, key2, special);
    }
  } else if (stateProps.keyChange) {
    delete stateProps.keyChange;
    dispatchProps.onKeyChange(key1, key2);
  }
  return Object.assign({}, stateProps, dispatchProps);
};

const TransportContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Transport);

export default TransportContainer;
