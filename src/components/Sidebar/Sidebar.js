import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.less';
import Link from '../Link';
import expandUrl from './expand.png';
import unexpandUrl from './unexpand.png';

String.prototype.startWith = function(str) {
  var reg = new RegExp("^" + str);
  return reg.test(this);
};

/** 侧边栏二级条目的类型
 * key: 唯一标识一个条目
 * title：条目的标题
 * href: 为跳转页面的url
 */
const ChildType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

/** 侧边栏一级条目的类型
 * key: 唯一标识一个条目
 * title：条目的标题
 * icon：条目左边图标url，大小为20*20px
 * isFolder：为true表明有下级菜单，此时href被忽略，children存放下级菜单的信息
 * href: isFolder为false时，为跳转页面的url，否则被忽略
 * children：isFolder为true时，存放下级菜单的信息，否则被忽略
 */
const ItemType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isFolder: PropTypes.bool,
  href: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.shape(ChildType))
};

/**
 * expanded: 为true表明侧边栏处于展开状态
 * activeKey：指定被选中的一级条目的key，不能是二级条目的key
 * items：存放所有侧边栏条目的信息
 * onExpand：点击展开或收缩按钮时触发，原型为func()
 */
class Sidebar extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    activeKey: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(ItemType)).isRequired,
    onExpand: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {menu: false, key: ""};
  }

  onMouseEnter = key => {
    if (key !== "") {
      this.setState({menu: true, key});
    } else {
      this.setState({menu: true, key: this.state.key});
    }
  };

  onMouseLeave = () => {
    this.setState({menu: false});
  };

  onMenuItemClick = () => {
    this.setState({menu: false});
  };

  toHead = min => {
    const src = min ? unexpandUrl : expandUrl;
    const alt = min ? "unexpanded" : "expanded";
    const onClick = this.props.onExpand;
    return <header><img {...{src, alt, onClick}} /></header>;
  };

  toLinkItem = (item, index, min) => {
    const active = item.key === this.props.activeKey ? true : null;
    return (
      <Link key={index} data-active={active} to={item.href} title={item.title}>
        <img src={item.icon} alt={item.title} />
        {min ? null : <span>{item.title}</span>}
      </Link>
    );
  };

  toFolderTitle = title => {
    return (
      <span>
        <span>{title}</span>
        <span>{'\>'}</span>
      </span>
    );
  };

  getFolderProps = item => {
    return {
      "data-folder": true,
      "data-active": this.props.activeKey.startWith(item.key) ? true : null,
      title: item.title,
      onMouseEnter: this.onMouseEnter.bind(this, item.key),
      onMouseLeave: this.onMouseLeave
    };
  };

  toFolderItem = (item, index, min) => {
    return (
      <span key={index} {...this.getFolderProps(item)}>
        <img src={item.icon} alt={item.title} />
        {min ? null : this.toFolderTitle(item.title)}
      </span>
    );
  };

  toSidebarItem = (item, index, min) => {
    if (item.isFolder) {
      return this.toFolderItem(item, index, min);
    } else {
      return this.toLinkItem(item, index, min);
    }
  };

  toBody = min => {
    const items = this.props.items.map((item, index) => this.toSidebarItem(item, index, min));
    return <nav>{items}</nav>;
  };

  toMenuItem = (item, index) => {
    return (
      <Link key={index} to={item.href} title={item.title} onClick={this.onMenuItemClick}>
        <span>{item.title}</span>
      </Link>
    );
  };

  toMenuItems = () => {
    const [{children}] = this.props.items.filter(item => item.key === this.state.key);
    return children.map((item, index) => this.toMenuItem(item, index));
  };

  getMenuProps = min => {
    return {
      className: s.menu,
      "data-min": min,
      onMouseEnter: this.onMouseEnter.bind(this, ""),
      onMouseLeave: this.onMouseLeave
    };
  };

  toMenu = min => {
    if (this.state.menu) {
      return <nav {...this.getMenuProps(min)}>{this.toMenuItems()}</nav>;
    } else {
      return null;
    }
  };

  render() {
    const min = this.props.expanded ? null : true;
    return (
      <aside className={s.root} data-min={min}>
        {this.toHead(min)}
        {this.toBody(min)}
        {this.toMenu(min)}
      </aside>
    );
  }
}

export default withStyles(s)(Sidebar);
