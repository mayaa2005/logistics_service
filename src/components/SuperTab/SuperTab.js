import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SuperTab.less';

/**
 * key: 唯一标识一个tab
 * title: 显示在tab上的标题
 */
const TabType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

/**
 * newClass: 类名
 * replace：默认为false, 为true表示用newClass替换默认类名，为false则增加newClass
 */
const OptionType = {
  newClass: PropTypes.string,
  replace: PropTypes.bool
};

/**
 * onTabChange: 切换选项卡时触发，原型为function(key)
 */
const CallbackType = {
  onTabChange: PropTypes.func
};

/**
 * activeKey: 处于活动状态tab的key值
 */
class SuperTab extends React.Component {
  static propTypes = {
    activeKey: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape(TabType)).isRequired,
    option: PropTypes.shape(OptionType),
    callback: PropTypes.shape(CallbackType)
  };

  genClassName = () => {
    const {newClass, replace} = this.props.option || {};
    if (newClass) {
      if (replace) {
        return `${s.root} ${newClass}`;
      } else {
        return `${s.root} ${s.default} ${newClass}`;
      }
    } else {
      return `${s.root} ${s.default}`;
    }
  };

  onTabChange = (key) => {
    const {onTabChange} = this.props.callback || {};
    if (onTabChange) {
      onTabChange(key);
    }
  };

  toTab = (tab, index, activeKey) => {
    const active = tab.key === activeKey ? true : null;
    const onClick = active ? null : this.onTabChange.bind(this, tab.key);
    return <span key={index} data-active={active} onClick={onClick}>{tab.title}</span>
  };

  render() {
    return (
      <nav className={this.genClassName()}>
        {this.props.tabs.map((tab, index) => this.toTab(tab, index, this.props.activeKey))}
      </nav>
    );
  }
}

export default withStyles(s)(SuperTab);
