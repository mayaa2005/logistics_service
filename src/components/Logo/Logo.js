import React from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Logo.less';
import Link from '../Link';

class Logo extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Link to="/">
          <span>LOMS</span>
        </Link>
      </div>
      );
  }
}

export default withStyles(s)(Logo);
