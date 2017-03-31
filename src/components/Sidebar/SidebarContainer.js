import {connect} from 'react-redux';
import Sidebar from './Sidebar';

const expandAction = {type: "expand"};

const mapStateToProps = (state, props) => {
  return {
    expanded: state.expanded,
    items: props.items,
    activeKey: props.nav
  };
};

const mapDispatchToProps = {
  onExpand: () => expandAction
};

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;
