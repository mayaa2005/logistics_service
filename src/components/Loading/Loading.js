import React from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Loading.less';

function Loading() {
  return (
    <div className={s.root}>
      <div>Loading...</div>
    </div>
  );
}

export default withStyles(s)(Loading);
