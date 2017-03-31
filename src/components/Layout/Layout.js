import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.less';
import Header from '../Header';
import SidebarContainer from '../Sidebar/SidebarContainer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  toSidebar = sidebarProps => {
    const {nav2 = "", items} = sidebarProps;
    if (!items) {
      return null;
    } else {
      return <SidebarContainer nav={nav2} items={items} />;
    }
  };

  render() {
    const {nav1, children, ...sidebarProps} = this.props;
    return (
      <div className={s.root}>
        <Header nav={nav1}/>
        <div>
          <aside>{this.toSidebar(sidebarProps)}</aside>
          <section>{children}</section>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
