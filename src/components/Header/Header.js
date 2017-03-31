import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import s from './Header.less';
import Link from '../Link';
import Logo from '../Logo';
import Navigation from '../Navigation';
import HeaderTail from '../HeaderTail';

class Header extends React.Component {
  render() {
    return (
      <header className={s.root} role="header">
        <Logo />
        <Navigation nav={this.props.nav}/>
        {' '} /* 加入空格用于使两端对齐生效*/
        <HeaderTail />
      </header>
    );
  }
}

export default withStyles(s)(Header);
