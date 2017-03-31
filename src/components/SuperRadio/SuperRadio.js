import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SuperRadio.less';

const SuperRadio = ({children, ...props}) => {
  return(
    <label className={s.root}>
      <input type='radio' {...props} />
      {children}
    </label>
  );
};

export default withStyles(s)(SuperRadio);
