import { connect } from 'react-redux';
import Split from './Split';


const splitTabAction = 'splitTabSelect';
const onTabChange = (tabKey) => {
  return {
    type: splitTabAction,
    tabKey
  };
};

const mapStateToProps = (state, props) => {
  return state.order.splitRoot;
};

const mapDispatchToProps = {
  onTabChange: (tabKey) => onTabChange(tabKey)
};

const SplitContainer = connect(mapStateToProps, mapDispatchToProps)(Split);

export default SplitContainer;
