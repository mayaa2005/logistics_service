import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.less';
import Link from '../Link';

const items = [
  {to: "/", label: "首页"},
  {to: "/order", label: "订单中心"},
  {to: "/plan", label: "物流计划"},
  {to: "/dispatch", label: "派单中心"},
  {to: "/bill", label: "计费与对账"},
  {to: "/partner", label: "跟踪与评价"},
  {to: "/material", label: "异常管理"},
  {to: "/accident", label: "事故管理"},
  {to: "/offer", label: "智能分析"}
];

class Navigation extends React.Component {
  toItems = items => items.map((value, index) => {
    let className = this.props.nav == value.to ? s.active : null;
    return <Link className={className} to={value.to} key={index} >{value.label}</Link>;
  });

  render() {
    return (
      <div className={s.root} role="navigation">
        {this.toItems(items)}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
