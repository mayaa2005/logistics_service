/**
 * Created by xiaojing on 17/3/4.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Title.less';


class Title extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    inline: PropTypes.bool
  };

  render() {
    let {title, inline=false} = this.props;
    let className = inline ? `${s.root} ${s.inline}` : s.root;
    return (
      <div className={className}>
        <span>&nbsp;</span>
        {title}
      </div>
    );
  }
}

export default withStyles(s)(Title);
